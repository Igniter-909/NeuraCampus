import { AlumniProfile } from '../models/AlumniProfile.js';
import { CollegeSettings } from '../models/CollegeSettings.js';
import { uploadFile } from '../utils/fileUpload.js';

export const registerAlumni = async (req, res) => {
    try {
        const {
            graduationDetails,
            professional,
            mentorship
        } = req.body;
        const documents = req.files;

        // Get college settings for alumni registration
        const collegeSettings = await CollegeSettings.findOne({
            collegeId: req.user.college
        });

        if (!collegeSettings.alumni.registration.enabled) {
            return res.status(403).json({
                message: 'Alumni registration is currently disabled'
            });
        }

        // Validate graduation year range
        const { start, end } = collegeSettings.alumni.registration.batchYearRange;
        if (graduationDetails.batch.endYear < start || graduationDetails.batch.endYear > end) {
            return res.status(400).json({
                message: 'Graduation year is outside the acceptable range'
            });
        }

        // Upload and process verification documents
        const verificationDocs = await Promise.all(
            documents.map(async doc => {
                const url = await uploadFile(doc);
                return {
                    type: doc.fieldname,
                    url,
                    verifiedAt: null,
                    verifiedBy: null
                };
            })
        );

        const alumniProfile = new AlumniProfile({
            userId: req.user._id,
            graduationDetails,
            professional,
            mentorship,
            verification: {
                status: 'pending',
                documents: verificationDocs
            }
        });

        await alumniProfile.save();

        res.status(201).json({
            message: 'Alumni profile created successfully',
            profile: alumniProfile
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateMentorshipStatus = async (req, res) => {
    try {
        const { isAvailable, expertise, maxMentees } = req.body;

        const profile = await AlumniProfile.findOneAndUpdate(
            { userId: req.user._id },
            {
                'mentorship.isAvailable': isAvailable,
                'mentorship.expertise': expertise,
                'mentorship.maxMentees': maxMentees
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Mentorship status updated successfully',
            mentorship: profile.mentorship
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAlumniNetwork = async (req, res) => {
    try {
        const { batch, branch, industry } = req.query;
        const query = { 'verification.status': 'verified' };

        if (batch) query['graduationDetails.batch.endYear'] = batch;
        if (branch) query['graduationDetails.branch'] = branch;
        if (industry) query['professional.industry'] = industry;

        const alumni = await AlumniProfile.find(query)
            .populate('userId', 'name email')
            .populate('graduationDetails.branch', 'name')
            .select('-verification.documents');

        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 