import { Recruiter } from '../models/Recruiter.js';
import { JobPosting } from '../models/JobPosting.js';
import { processPayment } from '../utils/Payment.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { Subscription } from '../models/Subscription.js';
import { RecruiterProfile } from '../models/RecruiterProfile.js';
import logger from '../utils/logger.js';

const register = async (req, res) => {
    try {
        const {
            userId,
            company,
            plan,
            paymentDetails,
            verificationDocuments
        } = req.body;

        // Process payment
        const payment = await processPayment({
            amount: getPlanAmount(plan),
            ...paymentDetails
        });

        if (!payment.success) {
            return res.status(400).json({
                message: 'Payment failed',
                error: payment.error
            });
        }

        const recruiter = new Recruiter({
            userId,
            company,
            subscription: {
                status: 'active',
                plan,
                startDate: new Date(),
                endDate: calculateEndDate(plan),
                paymentHistory: [{
                    amount: payment.amount,
                    transactionId: payment.transactionId,
                    date: new Date(),
                    status: 'completed'
                }]
            },
            verificationDocuments
        });

        await recruiter.save();

        res.status(201).json({
            message: 'Recruiter registered successfully',
            recruiter
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const createJobPosting = async (req, res) => {
    try {
        const jobData = req.body;
        jobData.recruiterId = req.user.recruiterId;

        const jobPosting = new JobPosting(jobData);
        await jobPosting.save();

        res.status(201).json({
            message: 'Job posting created successfully',
            jobPosting
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { jobId, studentId, status } = req.body;

        const jobPosting = await JobPosting.findOneAndUpdate(
            {
                _id: jobId,
                recruiterId: req.user.recruiterId,
                'applications.studentId': studentId
            },
            {
                $set: {
                    'applications.$.status': status,
                }
            },
            { new: true }
        );

        // Notify student about status update
        await notifyStudent(studentId, jobPosting, status);

        res.status(200).json({
            message: 'Application status updated successfully',
            jobPosting
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getPlanAmount = (plan) => {
    const planPrices = {
        basic: 999,
        premium: 2999,
        enterprise: 9999
    };
    return planPrices[plan] || planPrices.basic;
};

const calculateEndDate = (plan) => {
    const now = new Date();
    return new Date(now.setMonth(now.getMonth() + 1));
};

const searchStudents = async (req, res) => {
    try {
        const {
            skills,
            branch,
            minCGPA,
            college,
            graduationYear
        } = req.query;

        // Verify recruiter subscription status
        const recruiter = await Recruiter.findById(req.user.recruiterId);
        if (recruiter.subscription.status !== 'active') {
            return res.status(403).json({
                message: 'Active subscription required to search students'
            });
        }

        const query = {};
        if (skills) query['skills.name'] = { $in: skills.split(',') };
        if (branch) query['education.branch'] = branch;
        if (minCGPA) query['education.cgpa'] = { $gte: parseFloat(minCGPA) };
        if (college) query['education.college'] = college;
        if (graduationYear) query['education.graduationYear'] = graduationYear;

        const students = await StudentProfile.find(query)
            .populate('userId', 'name email')
            .select('-connections');

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const notifyEligibleStudents = async (jobPosting) => {
    // Implementation for notifying eligible students
    // This could use WebSocket or push notifications
};

const notifyStudent = async (studentId, jobPosting, status) => {
    // Implementation for notifying student about application status
    // This could use WebSocket or push notifications
};

const getJobPostings = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            status, 
            sortBy = 'createdAt', 
            order = 'desc' 
        } = req.query;

        // Build query
        const query = { recruiterId: req.user._id };
        if (status) query.status = status;

        // Fetch job postings with pagination
        const jobPostings = await JobPosting.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('applications.studentId', 'name email profilePicture')
            .populate('selectedCandidates.studentId', 'name email profilePicture');

        // Get total count
        const totalPostings = await JobPosting.countDocuments(query);

        // Group postings by status
        const groupedPostings = {
            active: jobPostings.filter(job => job.status === 'active'),
            closed: jobPostings.filter(job => job.status === 'closed'),
            draft: jobPostings.filter(job => job.status === 'draft')
        };

        // Calculate statistics
        const stats = {
            total: totalPostings,
            active: groupedPostings.active.length,
            closed: groupedPostings.closed.length,
            draft: groupedPostings.draft.length,
            totalApplications: jobPostings.reduce((sum, job) => 
                sum + job.applications.length, 0
            ),
            selectedCandidates: jobPostings.reduce((sum, job) => 
                sum + job.selectedCandidates.length, 0
            )
        };

        logger.info(`Job postings fetched for recruiter: ${req.user._id}`);
        res.status(200).json({
            jobPostings,
            groupedPostings,
            stats,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalPostings / limit),
                totalPostings,
                hasMore: page * limit < totalPostings
            }
        });

    } catch (error) {
        logger.error('Error fetching job postings:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateJobPosting = async (req, res) => {
    try {
        const { jobId } = req.params;
        const updates = req.body;

        // Check if job posting exists and belongs to recruiter
        const jobPosting = await JobPosting.findOne({
            _id: jobId,
            recruiterId: req.user._id
        });

        if (!jobPosting) {
            return res.status(404).json({ message: 'Job posting not found' });
        }

        // Validate subscription status for updating active jobs
        if (updates.status === 'active') {
            const subscription = await Subscription.findOne({
                recruiterId: req.user._id,
                status: 'active'
            });

            if (!subscription || subscription.jobPostsRemaining <= 0) {
                return res.status(403).json({
                    message: 'Active subscription required to publish job postings'
                });
            }
        }

        // Update allowed fields
        const allowedUpdates = [
            'title', 'description', 'requirements', 'responsibilities',
            'location', 'salary', 'type', 'experience', 'skills',
            'deadline', 'status', 'benefits'
        ];

        const filteredUpdates = Object.keys(updates)
            .filter(key => allowedUpdates.includes(key))
            .reduce((obj, key) => {
                obj[key] = updates[key];
                return obj;
            }, {});

        // Update job posting
        const updatedJob = await JobPosting.findByIdAndUpdate(
            jobId,
            { 
                $set: {
                    ...filteredUpdates,
                    updatedAt: new Date()
                }
            },
            { new: true }
        ).populate('applications.studentId')
         .populate('selectedCandidates.studentId');

        logger.info(`Job posting updated - ID: ${jobId}, Recruiter: ${req.user._id}`);
        res.status(200).json({
            message: 'Job posting updated successfully',
            jobPosting: updatedJob
        });

    } catch (error) {
        logger.error('Error updating job posting:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getSubscriptionDetails = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            recruiterId: req.user._id,
            status: 'active'
        });

        if (!subscription) {
            return res.status(404).json({
                message: 'No active subscription found',
                subscriptionRequired: true
            });
        }

        // Calculate remaining days
        const remainingDays = Math.ceil(
            (new Date(subscription.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
        );

        // Get usage statistics
        const usageStats = {
            jobPostsUsed: subscription.jobPostsLimit - subscription.jobPostsRemaining,
            jobPostsRemaining: subscription.jobPostsRemaining,
            featuredPostsUsed: subscription.featuredPostsLimit - subscription.featuredPostsRemaining,
            featuredPostsRemaining: subscription.featuredPostsRemaining,
            daysRemaining: remainingDays
        };

        // Calculate utilization percentages
        const utilization = {
            jobPosts: Math.round((usageStats.jobPostsUsed / subscription.jobPostsLimit) * 100),
            featuredPosts: Math.round((usageStats.featuredPostsUsed / subscription.featuredPostsLimit) * 100),
            timeUsed: Math.round(((subscription.duration - remainingDays) / subscription.duration) * 100)
        };

        logger.info(`Subscription details fetched for recruiter: ${req.user._id}`);
        res.status(200).json({
            subscription: {
                ...subscription.toObject(),
                usageStats,
                utilization
            }
        });

    } catch (error) {
        logger.error('Error fetching subscription details:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const renewSubscription = async (req, res) => {
    try {
        const { planId, paymentDetails } = req.body;

        // Validate payment details
        if (!paymentDetails || !paymentDetails.transactionId) {
            return res.status(400).json({
                message: 'Payment details are required'
            });
        }

        // Get subscription plan details
        const plan = await SubscriptionPlan.findById(planId);
        if (!plan) {
            return res.status(404).json({
                message: 'Subscription plan not found'
            });
        }

        // Create new subscription
        const newSubscription = await Subscription.create({
            recruiterId: req.user._id,
            planId: plan._id,
            status: 'active',
            startDate: new Date(),
            expiryDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
            jobPostsLimit: plan.jobPostsLimit,
            jobPostsRemaining: plan.jobPostsLimit,
            featuredPostsLimit: plan.featuredPostsLimit,
            featuredPostsRemaining: plan.featuredPostsLimit,
            payment: {
                amount: plan.price,
                transactionId: paymentDetails.transactionId,
                status: 'completed',
                paidAt: new Date()
            }
        });

        // Update recruiter profile
        await RecruiterProfile.findOneAndUpdate(
            { userId: req.user._id },
            { 
                $set: { 
                    subscriptionStatus: 'active',
                    currentSubscription: newSubscription._id
                }
            }
        );

        logger.info(`Subscription renewed for recruiter: ${req.user._id}`);
        res.status(200).json({
            message: 'Subscription renewed successfully',
            subscription: newSubscription
        });

    } catch (error) {
        logger.error('Error renewing subscription:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export {
    register,
    createJobPosting,
    updateApplicationStatus,
    searchStudents,
    renewSubscription,
    getSubscriptionDetails,
    updateJobPosting,
    getJobPostings
}; 