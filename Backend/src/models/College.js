import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    basicInfo: {
        location: String,
        type: {
            type: String,
            enum: ['Government', 'Private', 'Deemed', 'Autonomous'],
            default: 'Private'
        },
        campusSize: String,
        studentCount: String,
        facultyCount: String
    },
    emailDomain: {
        type: String,
        required: true,
        unique: true  // e.g., "iiitu.ac.in"
    },
    alumniEmailDomains: [{
        type: String  // Additional domains for alumni emails
    }],
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    },
    contact: {
        email: String,
        phone: String,
        website: String
    },
    media: {
        logo: String,
        coverImage: String,
        galleryImages: [String],
        videos: [String]
    },
    socialMedia: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        youtube: String
    },
    about: {
        description: String,
        mission: String,
        vision: String,
        achievements: [String],
        facilities: [String],
        highlights: [String]
    },
    academics: {
        courses: [{
            name: String,
            type: String,
            duration: String,
            description: String
        }],
        researchCenters: [{
            name: String,
            description: String,
            head: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
    },
    verificationSettings: {
        autoVerifyCollegeEmail: {
            type: Boolean,
            default: true
        },
        allowAlumniRegistration: {
            type: Boolean,
            default: true
        },
        alumniVerificationProcess: {
            type: String,
            enum: ['automatic', 'manual', 'document'],
            default: 'manual'
        }
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    branches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    }],
    establishedYear: Number,
    accreditations: [String],
    administrators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }],
    documents: [{
        name: String,
        type: String,
        url: String,
        thumbnail: String,
        size: Number,
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    rankings: [{
        agency: String,
        rank: String,
        year: Number
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'pending'],
        default: 'pending'
    },
    statusReason: String,
    statusChangedAt: Date,
    statusChangedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subscription: {
        plan: String,
        startDate: Date,
        endDate: Date,
        status: {
            type: String,
            enum: ['active', 'expired', 'trial', 'none'],
            default: 'none'
        },
        paymentStatus: {
            type: String,
            enum: ['paid', 'pending', 'overdue', 'none'],
            default: 'none'
        },
        lastPaymentDate: Date,
        nextPaymentDue: Date
    },
    metadata: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
}, {
    timestamps: true
});

// Add middleware to update metadata.updatedAt on save
collegeSchema.pre('save', function(next) {
    this.metadata.updatedAt = new Date();
    next();
});

// Add index for efficient querying
collegeSchema.index({ status: 1 });
collegeSchema.index({ code: 1 }, { unique: true });
collegeSchema.index({ 'subscription.status': 1 });
collegeSchema.index({ 'subscription.paymentStatus': 1 });

// Add indexes for better query performance
collegeSchema.index({ name: 'text', code: 'text' });
collegeSchema.index({ 'address.city': 1, 'address.state': 1 });

export const College = mongoose.model('College', collegeSchema); 