import mongoose from 'mongoose';

const recruiterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        name: String,
        website: String,
        industry: String,
        size: String,
        description: String,
        logo: String
    },
    subscription: {
        status: {
            type: String,
            enum: ['active', 'inactive', 'pending'],
            default: 'pending'
        },
        plan: {
            type: String,
            enum: ['basic', 'premium', 'enterprise'],
            required: true
        },
        startDate: Date,
        endDate: Date,
        paymentHistory: [{
            amount: Number,
            transactionId: String,
            date: Date,
            status: String
        }]
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    verificationDocuments: [{
        type: String,
        url: String,
        verified: Boolean
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Recruiter = mongoose.model('Recruiter', recruiterSchema); 