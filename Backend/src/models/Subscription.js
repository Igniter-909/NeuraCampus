import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    transactionId: {
        type: String,
        unique: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paidAt: Date,
    refundedAt: Date,
    receipt: String,
    metadata: {
        gateway: String,
        gatewayTransactionId: String,
        paymentResponse: Object
    }
}, { _id: false });

const usageSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    action: {
        type: String,
        enum: ['job_post', 'featured_post', 'candidate_contact', 'resume_download']
    },
    jobPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting'
    },
    description: String
}, { _id: false });

const subscriptionSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionPlan',
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled', 'suspended'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // in days
        required: true
    },
    autoRenew: {
        type: Boolean,
        default: false
    },
    features: {
        jobPostsLimit: {
            type: Number,
            required: true
        },
        jobPostsRemaining: {
            type: Number,
            required: true
        },
        featuredPostsLimit: {
            type: Number,
            required: true
        },
        featuredPostsRemaining: {
            type: Number,
            required: true
        },
        candidateContactsLimit: {
            type: Number,
            required: true
        },
        candidateContactsRemaining: {
            type: Number,
            required: true
        },
        resumeDownloadsLimit: {
            type: Number,
            required: true
        },
        resumeDownloadsRemaining: {
            type: Number,
            required: true
        },
        canPostInternships: {
            type: Boolean,
            default: true
        },
        canPostJobs: {
            type: Boolean,
            default: true
        },
        advancedAnalytics: {
            type: Boolean,
            default: false
        },
        prioritySupport: {
            type: Boolean,
            default: false
        }
    },
    payment: paymentSchema,
    usageHistory: [usageSchema],
    renewalHistory: [{
        renewedAt: {
            type: Date,
            required: true
        },
        previousPlanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubscriptionPlan'
        },
        payment: paymentSchema
    }],
    metadata: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        lastUsageAt: Date,
        cancellationReason: String,
        suspensionReason: String
    }
}, {
    timestamps: true
});

// Indexes
subscriptionSchema.index({ recruiterId: 1, status: 1 });
subscriptionSchema.index({ expiryDate: 1 });
subscriptionSchema.index({ 'payment.transactionId': 1 }, { unique: true, sparse: true });

// Virtual for remaining days
subscriptionSchema.virtual('daysRemaining').get(function() {
    return Math.ceil((this.expiryDate - new Date()) / (1000 * 60 * 60 * 24));
});

// Virtual for usage percentage
subscriptionSchema.virtual('usagePercentage').get(function() {
    const { jobPostsLimit, jobPostsRemaining } = this.features;
    return Math.round(((jobPostsLimit - jobPostsRemaining) / jobPostsLimit) * 100);
});

// Methods
subscriptionSchema.methods.canPostJob = function() {
    return this.status === 'active' && 
           this.features.jobPostsRemaining > 0 && 
           this.features.canPostJobs;
};

subscriptionSchema.methods.canPostFeatured = function() {
    return this.status === 'active' && 
           this.features.featuredPostsRemaining > 0;
};

subscriptionSchema.methods.deductJobPost = async function() {
    if (this.features.jobPostsRemaining > 0) {
        this.features.jobPostsRemaining--;
        this.usageHistory.push({
            action: 'job_post',
            date: new Date()
        });
        this.metadata.lastUsageAt = new Date();
        return await this.save();
    }
    return false;
};

// Middleware
subscriptionSchema.pre('save', function(next) {
    this.metadata.lastUpdated = new Date();
    next();
});

// Check expiry status before saving
subscriptionSchema.pre('save', function(next) {
    if (this.status === 'active' && new Date() > this.expiryDate) {
        this.status = 'expired';
    }
    next();
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema); 