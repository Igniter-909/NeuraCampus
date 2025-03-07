import { StudentProfile } from '../models/StudentProfile.js';
import { User } from '../models/User.js';
import { uploadFile } from '../utils/fileUpload.js';
// import { Student } from '../models/Student.js';
import { Schedule } from '../models/Schedule.js';
import  Attendance  from '../models/Attendance.js';
import { Batch } from '../models/Batch.js';
import logger from '../utils/logger.js';
import { Assignment } from '../models/Assignment.js';
import  Announcement  from '../models/Announcement.js';
import { Event } from '../models/Event.js';
import { EventRegistration } from '../models/EventRegistration.js';




const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { $pull: { projects: { _id: projectId } } },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Project not found' });
        }

        logger.info(`Project deleted by student: ${req.user._id}`);
        res.status(200).json({
            message: 'Project deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting project:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



const updateProfile = async (req, res) => {
    try {
        const {
            education,
            skills,
            experience,
            achievements,
            certifications,
            socialLinks,
            about,
            interests,
            languages
        } = req.body;

        // Fields that are allowed to be updated
        const updates = {};

        // Basic profile information
        if (about) updates.about = about;
        if (interests) updates.interests = interests;

        // Education details
        if (education) {
            // Validate education data
            if (education.some(edu => !edu.degree || !edu.institution)) {
                return res.status(400).json({
                    message: 'Degree and institution are required for education entries'
                });
            }
            updates.education = education;
        }

        // Skills with proficiency levels
        if (skills) {
            // Validate skill proficiency
            if (skills.some(skill => !skill.name || !skill.proficiency)) {
                return res.status(400).json({
                    message: 'Skill name and proficiency level are required'
                });
            }
            updates.skills = skills.map(skill => ({
                name: skill.name,
                proficiency: skill.proficiency,
                endorsements: skill.endorsements || []
            }));
        }

        // Work experience
        if (experience) {
            // Validate experience data
            if (experience.some(exp => !exp.role || !exp.company)) {
                return res.status(400).json({
                    message: 'Role and company are required for experience entries'
                });
            }
            updates.experience = experience;
        }

        // Achievements and awards
        if (achievements) {
            updates.achievements = achievements.map(achievement => ({
                title: achievement.title,
                description: achievement.description,
                date: achievement.date,
                issuer: achievement.issuer
            }));
        }

        // Certifications
        if (certifications) {
            // Validate certification data
            if (certifications.some(cert => !cert.name || !cert.issuer)) {
                return res.status(400).json({
                    message: 'Certification name and issuer are required'
                });
            }
            updates.certifications = certifications;
        }

        // Social media links
        if (socialLinks) {
            // Validate URLs
            const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            if (Object.values(socialLinks).some(url => url && !urlRegex.test(url))) {
                return res.status(400).json({
                    message: 'Invalid URL format in social links'
                });
            }
            updates.socialLinks = socialLinks;
        }

        // Languages
        if (languages) {
            // Validate language proficiency
            if (languages.some(lang => !lang.name || !lang.proficiency)) {
                return res.status(400).json({
                    message: 'Language name and proficiency level are required'
                });
            }
            updates.languages = languages;
        }

        // Update profile picture if provided
        if (req.file) {
            const profilePicture = await uploadFile(req.file);
            updates.profilePicture = profilePicture;
        }

        // Update the profile
        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { $set: updates },
            { 
                new: true,
                runValidators: true
            }
        ).populate('education.college', 'name')
         .populate('education.branch', 'name code');

        if (!profile) {
            return res.status(404).json({
                message: 'Student profile not found'
            });
        }

        // Calculate profile completion percentage
        const completionPercentage = calculateProfileCompletion(profile);

        logger.info(`Profile updated for student: ${req.user._id}`);
        res.status(200).json({
            message: 'Profile updated successfully',
            profile,
            completionPercentage
        });

    } catch (error) {
        logger.error('Error updating profile:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Helper function to calculate profile completion percentage
const calculateProfileCompletion = (profile) => {
    const fields = [
        { name: 'about', weight: 10 },
        { name: 'education', weight: 20 },
        { name: 'skills', weight: 15 },
        { name: 'experience', weight: 15 },
        { name: 'achievements', weight: 10 },
        { name: 'certifications', weight: 10 },
        { name: 'socialLinks', weight: 5 },
        { name: 'languages', weight: 5 },
        { name: 'profilePicture', weight: 5 },
        { name: 'interests', weight: 5 }
    ];

    let completionScore = 0;

    fields.forEach(field => {
        const value = profile[field.name];
        if (value) {
            if (Array.isArray(value)) {
                if (value.length > 0) completionScore += field.weight;
            } else if (typeof value === 'object') {
                if (Object.keys(value).length > 0) completionScore += field.weight;
            } else if (value) {
                completionScore += field.weight;
            }
        }
    });

    return Math.min(100, completionScore);
};

const getAttendance = async (req, res) => {
    try {
        const { subjectId, startDate, endDate } = req.query;
        const studentId = req.user._id;

        const query = {
            studentId,
            date: {}
        };

        if (startDate) {
            query.date.$gte = new Date(startDate);
        }
        if (endDate) {
            query.date.$lte = new Date(endDate);
        }
        if (subjectId) {
            query.subject = subjectId;
        }

        const attendance = await Attendance.find(query)
            .populate('subject', 'name code')
            .sort({ date: -1 });

        // Calculate attendance percentage
        const totalClasses = attendance.length;
        const presentClasses = attendance.filter(a => a.status === 'present').length;
        const percentage = totalClasses ? (presentClasses / totalClasses) * 100 : 0;

        res.status(200).json({
            attendance,
            summary: {
                total: totalClasses,
                present: presentClasses,
                percentage: percentage.toFixed(2)
            }
        });
    } catch (error) {
        logger.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getSchedule = async (req, res) => {
    try {
        // First get student's batch
        const student = await Student.findOne({ userId: req.user._id })
            .populate('batch');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Get current schedule for the batch
        const schedule = await Schedule.findOne({
            batchId: student.batch._id,
            semester: student.currentSemester
        }).populate('weeklySchedule.periods.subject')
          .populate('weeklySchedule.periods.teacher', 'name email');

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        logger.error('Error fetching schedule:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ userId: req.user._id })
            .populate('education.college', 'name')
            .populate('education.branch', 'name code');

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        logger.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getSubjects = async (req, res) => {
    try {
        const student = await Student.findOne({ userId: req.user._id })
            .populate({
                path: 'batch',
                populate: {
                    path: 'subjects',
                    select: 'name code credits syllabus'
                }
            });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student.batch.subjects);
    } catch (error) {
        logger.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getResources = async (req, res) => {
    try {
        const { subjectId } = req.query;
        const student = await Student.findOne({ userId: req.user._id });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const query = {
            batch: student.batch,
            semester: student.currentSemester
        };

        if (subjectId) {
            query.subject = subjectId;
        }

        const resources = await Resource.find(query)
            .populate('subject', 'name code')
            .populate('uploadedBy', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(resources);
    } catch (error) {
        logger.error('Error fetching resources:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const addProject = async (req, res) => {
    try {
        const { title, description, technologies, link, startDate, endDate } = req.body;
        const files = req.files;

        // Upload project images if any
        let images = [];
        if (files && files.length > 0) {
            images = await Promise.all(
                files.map(file => uploadFile(file))
            );
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            {
                $push: {
                    projects: {
                        title,
                        description,
                        technologies: technologies.split(',').map(tech => tech.trim()),
                        link,
                        startDate,
                        endDate,
                        images
                    }
                }
            },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        logger.info(`Project added by student: ${req.user._id}`);
        res.status(201).json({
            message: 'Project added successfully',
            project: profile.projects[profile.projects.length - 1]
        });
    } catch (error) {
        logger.error('Error adding project:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const updates = req.body;
        const files = req.files;

        // Upload new images if any
        if (files && files.length > 0) {
            updates.images = await Promise.all(
                files.map(file => uploadFile(file))
            );
        }

        if (updates.technologies) {
            updates.technologies = updates.technologies.split(',').map(tech => tech.trim());
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { 
                userId: req.user._id,
                'projects._id': projectId 
            },
            {
                $set: {
                    'projects.$': {
                        ...updates,
                        _id: projectId // Preserve the original project ID
                    }
                }
            },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const updatedProject = profile.projects.find(p => p._id.toString() === projectId);
        
        logger.info(`Project updated by student: ${req.user._id}`);
        res.status(200).json({
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        logger.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const addConnection = async (req, res) => {
    try {
        const { targetUserId } = req.body;

        // Check if connection already exists
        const existingConnection = await StudentProfile.findOne({
            userId: req.user._id,
            'connections.userId': targetUserId
        });

        if (existingConnection) {
            return res.status(400).json({
                message: 'Connection already exists'
            });
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            {
                $push: {
                    connections: {
                        userId: targetUserId,
                        status: 'pending',
                        date: new Date()
                    }
                }
            },
            { new: true }
        ).populate('connections.userId', 'name email');

        // Add connection request to target user's profile
        await StudentProfile.findOneAndUpdate(
            { userId: targetUserId },
            {
                $push: {
                    connectionRequests: {
                        userId: req.user._id,
                        date: new Date()
                    }
                }
            }
        );

        logger.info(`Connection request sent: ${req.user._id} to ${targetUserId}`);
        res.status(200).json({
            message: 'Connection request sent successfully',
            connection: profile.connections[profile.connections.length - 1]
        });
    } catch (error) {
        logger.error('Error adding connection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateConnection = async (req, res) => {
    try {
        const { connectionId } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid status'
            });
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { 
                userId: req.user._id,
                'connections._id': connectionId 
            },
            {
                $set: {
                    'connections.$.status': status,
                    'connections.$.updatedAt': new Date()
                }
            },
            { new: true }
        ).populate('connections.userId', 'name email');

        if (!profile) {
            return res.status(404).json({
                message: 'Connection not found'
            });
        }

        // Update the connection status for the other user
        const connection = profile.connections.find(c => c._id.toString() === connectionId);
        await StudentProfile.findOneAndUpdate(
            { userId: connection.userId },
            {
                $set: {
                    'connections.$[elem].status': status,
                    'connections.$[elem].updatedAt': new Date()
                }
            },
            {
                arrayFilters: [{ 'elem.userId': req.user._id }]
            }
        );

        logger.info(`Connection status updated: ${connectionId} - ${status}`);
        res.status(200).json({
            message: 'Connection status updated successfully',
            connection: profile.connections.find(c => c._id.toString() === connectionId)
        });
    } catch (error) {
        logger.error('Error updating connection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getConnections = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ userId: req.user._id })
            .populate('connections.userId', 'name email')
            .select('connections');

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile.connections);
    } catch (error) {
        logger.error('Error fetching connections:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getConnectionRequests = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ userId: req.user._id })
            .populate('connectionRequests.userId', 'name email')
            .select('connectionRequests');

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile.connectionRequests);
    } catch (error) {
        logger.error('Error fetching connection requests:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const { content, visibility } = req.body;
        const files = req.files;

        // Upload post media if any
        let media = [];
        if (files && files.length > 0) {
            media = await Promise.all(
                files.map(async file => ({
                    name: file.originalname,
                    url: await uploadFile(file),
                    type: file.mimetype,
                    size: file.size
                }))
            );
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            {
                $push: {
                    posts: {
                        content,
                        visibility,
                        media,
                        author: req.user._id,
                        createdAt: new Date()
                    }
                }
            },
            { new: true }
        ).populate('posts.author', 'name profilePicture');

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        logger.info(`New post created by student: ${req.user._id}`);
        res.status(201).json({
            message: 'Post created successfully',
            post: profile.posts[profile.posts.length - 1]
        });
    } catch (error) {
        logger.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, visibility } = req.body;
        const files = req.files;

        // Verify post ownership
        const existingProfile = await StudentProfile.findOne({
            userId: req.user._id,
            'posts._id': postId
        });

        if (!existingProfile) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        // Prepare media update if new files are provided
        let mediaUpdate = {};
        if (files && files.length > 0) {
            const media = await Promise.all(
                files.map(async file => ({
                    name: file.originalname,
                    url: await uploadFile(file),
                    type: file.mimetype,
                    size: file.size
                }))
            );
            mediaUpdate = { 'posts.$.media': media };
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { 
                userId: req.user._id,
                'posts._id': postId 
            },
            {
                $set: {
                    'posts.$.content': content,
                    'posts.$.visibility': visibility,
                    'posts.$.updatedAt': new Date(),
                    ...mediaUpdate
                }
            },
            { new: true }
        ).populate('posts.author', 'name profilePicture');

        const updatedPost = profile.posts.find(p => p._id.toString() === postId);

        logger.info(`Post updated by student: ${req.user._id}, postId: ${postId}`);
        res.status(200).json({
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (error) {
        logger.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Verify post ownership and delete
        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { $pull: { posts: { _id: postId } } },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        logger.info(`Post deleted by student: ${req.user._id}, postId: ${postId}`);
        res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, visibility } = req.query;
        const skip = (page - 1) * limit;

        // Build query based on visibility filter
        const query = { userId: req.user._id };
        if (visibility) {
            query['posts.visibility'] = visibility;
        }

        const profile = await StudentProfile.findOne(query)
            .populate('posts.author', 'name profilePicture')
            .select('posts')
            .slice('posts', [skip, parseInt(limit)]);

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        // Get total posts count for pagination
        const totalPosts = profile.posts.length;

        const posts = profile.posts.map(post => ({
            ...post.toObject(),
            isAuthor: post.author._id.toString() === req.user._id.toString()
        }));

        res.status(200).json({
            posts,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
                hasMore: skip + posts.length < totalPosts
            }
        });
    } catch (error) {
        logger.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        const profile = await StudentProfile.findOne({
            userId: req.user._id,
            'posts._id': postId
        }).populate('posts.author', 'name profilePicture');

        if (!profile) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = profile.posts.find(p => p._id.toString() === postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            post: {
                ...post.toObject(),
                isAuthor: post.author._id.toString() === req.user._id.toString()
            }
        });
    } catch (error) {
        logger.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const submitAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const { description } = req.body;
        const files = req.files;

        // Validate if assignment exists and is still accepting submissions
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Check submission deadline
        if (new Date() > new Date(assignment.deadline)) {
            return res.status(400).json({ message: 'Assignment deadline has passed' });
        }

        // Upload submission files
        let submissionFiles = [];
        if (files && files.length > 0) {
            submissionFiles = await Promise.all(
                files.map(async file => {
                    const uploadedFile = await uploadFile(file);
                    return {
                        name: file.originalname,
                        url: uploadedFile,
                        type: file.mimetype,
                        size: file.size
                    };
                })
            );
        }

        // Check if student has already submitted
        const existingSubmission = await StudentProfile.findOne({
            userId: req.user._id,
            'submissions.assignmentId': assignmentId
        });

        let profile;
        if (existingSubmission) {
            // Update existing submission
            profile = await StudentProfile.findOneAndUpdate(
                { 
                    userId: req.user._id,
                    'submissions.assignmentId': assignmentId 
                },
                {
                    $set: {
                        'submissions.$': {
                            assignmentId,
                            description,
                            files: submissionFiles,
                            submittedAt: new Date(),
                            status: 'submitted',
                            isLate: new Date() > new Date(assignment.deadline)
                        }
                    }
                },
                { new: true }
            );

            logger.info(`Assignment resubmitted by student: ${req.user._id} for assignment: ${assignmentId}`);
        } else {
            // Create new submission
            profile = await StudentProfile.findOneAndUpdate(
                { userId: req.user._id },
                {
                    $push: {
                        submissions: {
                            assignmentId,
                            description,
                            files: submissionFiles,
                            submittedAt: new Date(),
                            status: 'submitted',
                            isLate: new Date() > new Date(assignment.deadline)
                        }
                    }
                },
                { new: true }
            );

            logger.info(`New assignment submitted by student: ${req.user._id} for assignment: ${assignmentId}`);
        }

        // Get the submission details
        const submission = profile.submissions.find(
            s => s.assignmentId.toString() === assignmentId
        );

        res.status(200).json({
            message: existingSubmission ? 'Assignment resubmitted successfully' : 'Assignment submitted successfully',
            submission
        });

    } catch (error) {
        logger.error('Error submitting assignment:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAssignmentSubmission = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        const profile = await StudentProfile.findOne(
            { userId: req.user._id }
        ).populate({
            path: 'submissions.assignmentId',
            select: 'title description deadline'
        });

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        const submission = profile.submissions.find(
            s => s.assignmentId._id.toString() === assignmentId
        );

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(submission);

    } catch (error) {
        logger.error('Error fetching assignment submission:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllAssignmentSubmissions = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne(
            { userId: req.user._id }
        ).populate({
            path: 'submissions.assignmentId',
            select: 'title description deadline subject',
            populate: {
                path: 'subject',
                select: 'name code'
            }
        });

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        // Group submissions by subject
        const submissionsBySubject = profile.submissions.reduce((acc, submission) => {
            const subject = submission.assignmentId.subject;
            if (!acc[subject.code]) {
                acc[subject.code] = {
                    subjectName: subject.name,
                    subjectCode: subject.code,
                    submissions: []
                };
            }
            acc[subject.code].submissions.push(submission);
            return acc;
        }, {});

        res.status(200).json({
            submissions: Object.values(submissionsBySubject)
        });

    } catch (error) {
        logger.error('Error fetching all assignment submissions:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteAssignmentSubmission = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Check if assignment still allows deletion
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        if (new Date() > new Date(assignment.deadline)) {
            return res.status(400).json({ message: 'Cannot delete submission after deadline' });
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { $pull: { submissions: { assignmentId } } },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        logger.info(`Assignment submission deleted by student: ${req.user._id} for assignment: ${assignmentId}`);
        res.status(200).json({
            message: 'Assignment submission deleted successfully'
        });

    } catch (error) {
        logger.error('Error deleting assignment submission:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAnnouncements = async (req, res) => {
    try {
        // Get student profile to access batch and college info
        const studentProfile = await StudentProfile.findOne({ userId: req.user._id })
            .populate('education.college')
            .populate('education.branch');

        if (!studentProfile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        // Get current date for filtering active announcements
        const currentDate = new Date();

        // Fetch announcements based on various criteria
        const announcements = await Announcement.find({
            $and: [
                // Check announcement validity period
                {
                    startDate: { $lte: currentDate },
                    $or: [
                        { endDate: { $gte: currentDate } },
                        { endDate: null } // For announcements with no end date
                    ]
                },
                // Match target audience
                {
                    $or: [
                        { targetAudience: 'all' }, // General announcements
                        { targetAudience: 'students' }, // Student-specific announcements
                        {
                            targetAudience: 'batch',
                            targetBatch: studentProfile.education.batch
                        },
                        {
                            targetAudience: 'branch',
                            targetBranch: studentProfile.education.branch._id
                        },
                        {
                            targetAudience: 'college',
                            targetCollege: studentProfile.education.college._id
                        }
                    ]
                }
            ]
        })
        .populate('createdBy', 'name role')
        .populate('targetBatch', 'year section')
        .populate('targetBranch', 'name code')
        .populate('targetCollege', 'name')
        .sort({ priority: -1, createdAt: -1 }); // Sort by priority and date

        // Add read status for each announcement
        const announcementsWithReadStatus = announcements.map(announcement => ({
            ...announcement.toObject(),
            isRead: studentProfile.readAnnouncements?.includes(announcement._id) || false
        }));

        // Update statistics
        const stats = {
            total: announcements.length,
            unread: announcementsWithReadStatus.filter(a => !a.isRead).length,
            priority: announcementsWithReadStatus.filter(a => a.priority === 'high').length
        };

        // Mark announcements as fetched
        await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { 
                $addToSet: { 
                    fetchedAnnouncements: { 
                        $each: announcements.map(a => a._id) 
                    } 
                }
            }
        );

        logger.info(`Announcements fetched for student: ${req.user._id}`);
        res.status(200).json({
            announcements: announcementsWithReadStatus,
            stats
        });

    } catch (error) {
        logger.error('Error fetching announcements:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const markAnnouncementAsRead = async (req, res) => {
    try {
        const { announcementId } = req.params;

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { 
                $addToSet: { 
                    readAnnouncements: announcementId 
                } 
            },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        logger.info(`Announcement marked as read - Student: ${req.user._id}, Announcement: ${announcementId}`);
        res.status(200).json({
            message: 'Announcement marked as read successfully'
        });

    } catch (error) {
        logger.error('Error marking announcement as read:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAnnouncementById = async (req, res) => {
    try {
        const { announcementId } = req.params;

        const announcement = await Announcement.findById(announcementId)
            .populate('createdBy', 'name role')
            .populate('targetBatch', 'year section')
            .populate('targetBranch', 'name code')
            .populate('targetCollege', 'name');

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Check if student has access to this announcement
        const studentProfile = await StudentProfile.findOne({ userId: req.user._id });
        const hasAccess = announcement.targetAudience === 'all' ||
                         announcement.targetAudience === 'students' ||
                         (announcement.targetAudience === 'batch' && 
                          announcement.targetBatch.equals(studentProfile.education.batch)) ||
                         (announcement.targetAudience === 'branch' && 
                          announcement.targetBranch.equals(studentProfile.education.branch)) ||
                         (announcement.targetAudience === 'college' && 
                          announcement.targetCollege.equals(studentProfile.education.college));

        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied to this announcement' });
        }

        // Mark as read when viewed
        await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { 
                $addToSet: { 
                    readAnnouncements: announcementId 
                } 
            }
        );

        res.status(200).json({
            announcement: {
                ...announcement.toObject(),
                isRead: true
            }
        });

    } catch (error) {
        logger.error('Error fetching announcement:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const { 
            startDate, 
            endDate, 
            type, 
            category,
            page = 1,
            limit = 10
        } = req.query;

        // Get student profile for filtering relevant events
        const studentProfile = await StudentProfile.findOne({ userId: req.user._id })
            .populate('education.college')
            .populate('education.branch')
            .populate('education.batch');

        if (!studentProfile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        // Build query filters
        const query = {
            $and: [
                // Event visibility filters
                {
                    $or: [
                        { visibility: 'public' },
                        { visibility: 'students' },
                        {
                            visibility: 'batch',
                            targetBatch: studentProfile.education.batch._id
                        },
                        {
                            visibility: 'branch',
                            targetBranch: studentProfile.education.branch._id
                        },
                        {
                            visibility: 'college',
                            targetCollege: studentProfile.education.college._id
                        }
                    ]
                }
            ]
        };

        // Date range filter
        if (startDate || endDate) {
            query.$and.push({
                $or: [
                    {
                        startDate: {
                            $gte: startDate ? new Date(startDate) : new Date(),
                            ...(endDate && { $lte: new Date(endDate) })
                        }
                    },
                    {
                        endDate: {
                            $gte: startDate ? new Date(startDate) : new Date(),
                            ...(endDate && { $lte: new Date(endDate) })
                        }
                    }
                ]
            });
        }

        // Type filter
        if (type) {
            query.type = type;
        }

        // Category filter
        if (category) {
            query.category = category;
        }

        // Fetch events with pagination
        const events = await Event.find(query)
            .populate('organizer', 'name role')
            .populate('targetBatch', 'year section')
            .populate('targetBranch', 'name code')
            .populate('targetCollege', 'name')
            .sort({ startDate: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Get total count for pagination
        const totalEvents = await Event.countDocuments(query);

        // Add registration status and other user-specific data
        const eventsWithUserData = await Promise.all(events.map(async event => {
            const isRegistered = await EventRegistration.exists({
                eventId: event._id,
                userId: req.user._id
            });

            return {
                ...event.toObject(),
                isRegistered: !!isRegistered,
                canRegister: new Date() < event.registrationDeadline,
                isUpcoming: new Date() < event.startDate,
                isOngoing: new Date() >= event.startDate && new Date() <= event.endDate,
                isPast: new Date() > event.endDate
            };
        }));

        // Group events by category and status
        const groupedEvents = {
            upcoming: eventsWithUserData.filter(e => e.isUpcoming),
            ongoing: eventsWithUserData.filter(e => e.isOngoing),
            past: eventsWithUserData.filter(e => e.isPast)
        };

        // Get event statistics
        const stats = {
            total: totalEvents,
            registered: eventsWithUserData.filter(e => e.isRegistered).length,
            upcoming: groupedEvents.upcoming.length,
            ongoing: groupedEvents.ongoing.length
        };

        logger.info(`Events fetched for student: ${req.user._id}`);
        res.status(200).json({
            events: groupedEvents,
            stats,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalEvents / limit),
                totalEvents,
                hasMore: (page * limit) < totalEvents
            }
        });

    } catch (error) {
        logger.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId)
            .populate('organizer', 'name role')
            .populate('targetBatch', 'year section')
            .populate('targetBranch', 'name code')
            .populate('targetCollege', 'name')
            .populate('venue')
            .populate('speakers', 'name bio profilePicture');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check registration status
        const registration = await EventRegistration.findOne({
            eventId: event._id,
            userId: req.user._id
        });

        // Get registration statistics
        const registrationStats = await EventRegistration.aggregate([
            { $match: { eventId: event._id } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const eventData = {
            ...event.toObject(),
            isRegistered: !!registration,
            registrationStatus: registration?.status,
            canRegister: new Date() < event.registrationDeadline,
            isUpcoming: new Date() < event.startDate,
            isOngoing: new Date() >= event.startDate && new Date() <= event.endDate,
            isPast: new Date() > event.endDate,
            registrationStats: registrationStats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {})
        };

        res.status(200).json({ event: eventData });

    } catch (error) {
        logger.error('Error fetching event details:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { registrationType } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check registration deadline
        if (new Date() > event.registrationDeadline) {
            return res.status(400).json({ message: 'Registration deadline has passed' });
        }

        // Check if already registered
        const existingRegistration = await EventRegistration.findOne({
            eventId,
            userId: req.user._id
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Create registration
        const registration = await EventRegistration.create({
            eventId,
            userId: req.user._id,
            registrationType,
            registrationDate: new Date(),
            status: 'pending'
        });

        logger.info(`Event registration created - Student: ${req.user._id}, Event: ${eventId}`);
        res.status(201).json({
            message: 'Successfully registered for the event',
            registration
        });

    } catch (error) {
        logger.error('Error registering for event:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getEventSuggestions = async (req, res) => {
    try {
        // Get student profile for preferences and history
        const studentProfile = await StudentProfile.findOne({ userId: req.user._id })
            .populate('education.college')
            .populate('education.branch')
            .populate('education.batch')
            .populate('interests')
            .populate('skills.name');

        if (!studentProfile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        // Get student's interests and skills
        const interests = studentProfile.interests || [];
        const skills = studentProfile.skills.map(skill => skill.name) || [];

        // Get current date
        const currentDate = new Date();

        // Build suggestion query
        const suggestionQuery = {
            startDate: { $gt: currentDate }, // Only future events
            $and: [
                // Event visibility filters
                {
                    $or: [
                        { visibility: 'public' },
                        { visibility: 'students' },
                        {
                            visibility: 'batch',
                            targetBatch: studentProfile.education.batch._id
                        },
                        {
                            visibility: 'branch',
                            targetBranch: studentProfile.education.branch._id
                        },
                        {
                            visibility: 'college',
                            targetCollege: studentProfile.education.college._id
                        }
                    ]
                }
            ]
        };

        // Get all relevant events
        const allEvents = await Event.find(suggestionQuery)
            .populate('organizer', 'name role')
            .populate('targetBatch', 'year section')
            .populate('targetBranch', 'name code')
            .populate('targetCollege', 'name')
            .populate('tags')
            .populate('category');

        // Get student's past event registrations
        const pastRegistrations = await EventRegistration.find({
            userId: req.user._id
        }).populate('eventId');

        // Calculate event scores based on various factors
        const scoredEvents = allEvents.map(event => {
            let score = 0;

            // 1. Interest matching
            const interestMatch = event.tags.some(tag => 
                interests.includes(tag) || 
                skills.includes(tag)
            );
            if (interestMatch) score += 30;

            // 2. Category preference based on past attendance
            const categoryPreference = pastRegistrations.filter(reg => 
                reg.eventId?.category === event.category
            ).length;
            score += categoryPreference * 10;

            // 3. Proximity to student's branch/batch
            if (event.targetBranch?.equals(studentProfile.education.branch._id)) score += 20;
            if (event.targetBatch?.equals(studentProfile.education.batch._id)) score += 15;

            // 4. Time relevance (closer events get higher score)
            const daysUntilEvent = Math.ceil(
                (event.startDate - currentDate) / (1000 * 60 * 60 * 24)
            );
            score += Math.max(0, 30 - daysUntilEvent); // Higher score for events within 30 days

            // 5. Registration trend
            const registrationCount = event.registrations?.length || 0;
            score += Math.min(20, registrationCount / 2); // Up to 20 points based on popularity

            return {
                ...event.toObject(),
                matchScore: score,
                relevanceFactors: {
                    interestMatch,
                    categoryPreference: categoryPreference > 0,
                    branchRelevant: event.targetBranch?.equals(studentProfile.education.branch._id),
                    batchRelevant: event.targetBatch?.equals(studentProfile.education.batch._id),
                    daysUntilEvent,
                    popularity: registrationCount
                }
            };
        });

        // Sort events by score and group them
        const sortedEvents = scoredEvents.sort((a, b) => b.matchScore - a.matchScore);

        // Group suggestions by category
        const suggestions = {
            highlyRecommended: sortedEvents.filter(e => e.matchScore >= 70).slice(0, 5),
            branchSpecific: sortedEvents.filter(e => e.relevanceFactors.branchRelevant).slice(0, 3),
            basedOnInterests: sortedEvents.filter(e => e.relevanceFactors.interestMatch).slice(0, 3),
            upcoming: sortedEvents.filter(e => e.relevanceFactors.daysUntilEvent <= 7).slice(0, 3),
            popular: sortedEvents.filter(e => e.relevanceFactors.popularity >= 10).slice(0, 3)
        };

        // Add registration status to each event
        for (const category in suggestions) {
            suggestions[category] = await Promise.all(
                suggestions[category].map(async event => {
                    const isRegistered = await EventRegistration.exists({
                        eventId: event._id,
                        userId: req.user._id
                    });
                    return {
                        ...event,
                        isRegistered: !!isRegistered,
                        canRegister: new Date() < event.registrationDeadline
                    };
                })
            );
        }

        logger.info(`Event suggestions generated for student: ${req.user._id}`);
        res.status(200).json({
            suggestions,
            metadata: {
                totalSuggestions: Object.values(suggestions)
                    .reduce((acc, curr) => acc + curr.length, 0),
                basedOn: {
                    interests: interests.length,
                    skills: skills.length,
                    pastEvents: pastRegistrations.length
                }
            }
        });

    } catch (error) {
        logger.error('Error generating event suggestions:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            status, 
            technology, 
            sortBy = 'createdAt', 
            order = 'desc' 
        } = req.query;

        // Get student profile
        const profile = await StudentProfile.findOne({ userId: req.user._id })
            .populate({
                path: 'projects',
                options: {
                    sort: { [sortBy]: order === 'desc' ? -1 : 1 }
                }
            });

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        // Filter projects based on query parameters
        let filteredProjects = profile.projects;

        // Filter by status if provided
        if (status) {
            filteredProjects = filteredProjects.filter(project => 
                project.status === status
            );
        }

        // Filter by technology if provided
        if (technology) {
            filteredProjects = filteredProjects.filter(project =>
                project.technologies.some(tech => 
                    tech.toLowerCase().includes(technology.toLowerCase())
                )
            );
        }

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalProjects = filteredProjects.length;
        const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

        // Group projects by status
        const groupedProjects = {
            ongoing: filteredProjects.filter(p => p.status === 'ongoing'),
            completed: filteredProjects.filter(p => p.status === 'completed'),
            planned: filteredProjects.filter(p => p.status === 'planned')
        };

        // Calculate project statistics
        const projectStats = {
            total: totalProjects,
            ongoing: groupedProjects.ongoing.length,
            completed: groupedProjects.completed.length,
            planned: groupedProjects.planned.length,
            technologies: [...new Set(
                filteredProjects.flatMap(p => p.technologies)
            )],
            completionRate: totalProjects ? 
                Math.round((groupedProjects.completed.length / totalProjects) * 100) : 0
        };

        // Process projects to include additional information
        const processedProjects = paginatedProjects.map(project => ({
            ...project.toObject(),
            duration: project.endDate ? 
                Math.ceil((new Date(project.endDate) - new Date(project.startDate)) / (1000 * 60 * 60 * 24)) : 
                null,
            isOverdue: project.endDate && new Date() > new Date(project.endDate) && project.status !== 'completed',
            progressPercentage: calculateProjectProgress(project),
            collaborators: project.teamMembers?.length || 0,
            lastUpdated: project.updatedAt,
            mediaCount: project.images?.length || 0
        }));

        logger.info(`Projects fetched for student: ${req.user._id}`);
        res.status(200).json({
            projects: processedProjects,
            groupedProjects,
            stats: projectStats,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalProjects / limit),
                totalProjects,
                hasMore: endIndex < totalProjects,
                hasPrevious: startIndex > 0
            }
        });

    } catch (error) {
        logger.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Helper function to calculate project progress
const calculateProjectProgress = (project) => {
    if (project.status === 'completed') return 100;
    if (project.status === 'planned') return 0;

    // Calculate based on tasks if available
    if (project.tasks && project.tasks.length > 0) {
        const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
        return Math.round((completedTasks / project.tasks.length) * 100);
    }

    // Calculate based on timeline if no tasks
    if (project.startDate && project.endDate) {
        const total = new Date(project.endDate) - new Date(project.startDate);
        const elapsed = new Date() - new Date(project.startDate);
        return Math.min(100, Math.round((elapsed / total) * 100));
    }

    return 0;
};

// Helper function to get project insights
const getProjectInsights = (projects) => {
    return {
        averageProjectDuration: projects.reduce((acc, curr) => 
            acc + (curr.duration || 0), 0) / projects.length || 0,
        mostUsedTechnologies: [...new Set(
            projects.flatMap(p => p.technologies)
        )].slice(0, 5),
        completionTrend: projects
            .filter(p => p.status === 'completed')
            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
            .slice(0, 5)
            .map(p => ({
                title: p.title,
                duration: p.duration,
                endDate: p.endDate
            }))
    };
};

export {
    // Profile Management
    getProfile,
    updateProfile,
    
    // Project Management
    addProject,
    updateProject,
    deleteProject,
    getProjects,
    
    // Post Management
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostById,
    
    // Connection Management
    addConnection,
    updateConnection,
    getConnections,
    getConnectionRequests,
    
    // Assignment Management
    submitAssignment,
    getAssignmentSubmission,
    getAllAssignmentSubmissions,
    deleteAssignmentSubmission,
    
    // Announcement Management
    getAnnouncements,
    markAnnouncementAsRead,
    getAnnouncementById,
    
    // Event Management
    getEvents,
    getEventById,
    registerForEvent,
    getEventSuggestions,
    
    // Academic Management
    getSchedule,
    getAttendance,
    getSubjects,
    getResources
};