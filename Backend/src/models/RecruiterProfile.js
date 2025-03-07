import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    phoneNumber: String,
    location: {
        city: String,
        state: String,
        country: String
    },
    socialLinks: {
        linkedin: String,
        twitter: String,
        website: String
    },
    preferences: {
        notificationSettings: {
            email: {
                type: Boolean,
                default: true
            },
            inApp: {
                type: Boolean,
                default: true
            }
        },
        searchPreferences: {
            skills: [String],
            experience: String,
            locations: [String]
        }
    },
    activeJobPostings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting'
    }],
    lastActive: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update the lastActive timestamp before saving
recruiterProfileSchema.pre('save', function(next) {
    this.lastActive = new Date();
    next();
});

export const RecruiterProfile = mongoose.model('RecruiterProfile', recruiterProfileSchema); 