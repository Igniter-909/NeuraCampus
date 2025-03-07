import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'college_admin', 'super_admin', 'alumni'],
        required: true
    },
    media: {
        avatar: {
            url: {
                type: String,
                default: '' // Default avatar URL will be set during creation
            },
            publicId: String, // For cloud storage reference (like Cloudinary)
            uploadedAt: Date
        }
    },
    profile: {
        bio: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        dateOfBirth: Date,
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer_not_to_say'],
            default: 'prefer_not_to_say'
        },
        address: {
            street: {
                type: String,
                default: ''
            },
            city: {
                type: String,
                default: ''
            },
            state: {
                type: String,
                default: ''
            },
            country: {
                type: String,
                default: ''
            },
            pincode: {
                type: String,
                default: ''
            }
        },
        socialLinks: {
            facebook: String,
            twitter: String,
            linkedin: String,
            instagram: String,
            github: String
        }
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: function() {
            return ['student', 'teacher', 'college_admin', 'alumni'].includes(this.role);
        }
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'blocked'],
        default: 'pending'
    },
    lastLogin: {
        type: Date,
        default: null
    },
    verificationStatus: {
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        isPhoneVerified: {
            type: Boolean,
            default: false
        },
        verifiedAt: Date
    },
    preferences: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        pushNotifications: {
            type: Boolean,
            default: true
        },
        theme: {
            type: String,
            enum: ['light', 'dark', 'system'],
            default: 'system'
        },
        language: {
            type: String,
            default: 'en'
        }
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
        },
        lastPasswordChange: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    }
}, {
    timestamps: true
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'profile.phone': 1 });
userSchema.index({ college: 1, role: 1 });
userSchema.index({ status: 1 });

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.metadata.passwordResetToken;
    delete userObject.metadata.passwordResetExpires;
    delete userObject.__v;
    return userObject;
};

// Update timestamps before saving
userSchema.pre('save', function(next) {
    this.metadata.updatedAt = new Date();
    if (this.isModified('password')) {
        this.metadata.lastPasswordChange = new Date();
    }
    next();
});

export const User = mongoose.model('User', userSchema);