import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['internship', 'full-time', 'part-time'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        skills: [String],
        education: {
            degree: String,
            branch: [String],
            minCGPA: Number
        },
        experience: {
            min: Number,
            preferred: Number
        }
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        min: Number,
        max: Number,
        currency: String
    },
    applicationDeadline: Date,
    positions: Number,
    status: {
        type: String,
        enum: ['draft', 'active', 'closed', 'archived'],
        default: 'draft'
    },
    applications: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'shortlisted', 'rejected', 'selected'],
            default: 'pending'
        },
        appliedAt: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const JobPosting = mongoose.model('JobPosting', jobPostingSchema); 