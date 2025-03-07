import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    graduationDetails: {
        batch: {
            startYear: Number,
            endYear: Number
        },
        degree: String,
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        },
        rollNumber: String
    },
    professional: {
        currentCompany: String,
        designation: String,
        industry: String,
        experience: Number,
        linkedIn: String,
        portfolio: String
    },
    verification: {
        status: {
            type: String,
            enum: ['pending', 'verified', 'rejected'],
            default: 'pending'
        },
        documents: [{
            type: {
                type: String,
                required: true
            },
            url: String,
            verifiedAt: Date,
            verifiedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
        remarks: String
    },
    mentorship: {
        isAvailable: { type: Boolean, default: false },
        expertise: [String],
        maxMentees: { type: Number, default: 3 },
        currentMentees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    contributions: {
        events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        jobReferrals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPosting'
        }],
        testimonials: [{
            content: String,
            date: Date
        }]
    }
}, {
    timestamps: true
});

export const AlumniProfile = mongoose.model('AlumniProfile', alumniProfileSchema); 