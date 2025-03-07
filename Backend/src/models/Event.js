import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    venue: {
        building: String,
        room: String,
        capacity: Number
    }
}, { _id: false });

const speakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: String,
    organization: String,
    bio: String,
    profilePicture: String,
    expertise: [String],
    socialLinks: {
        linkedin: String,
        twitter: String,
        website: String
    }
}, { _id: false });

const scheduleItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    speakers: [speakerSchema],
    location: locationSchema,
    type: {
        type: String,
        enum: ['session', 'workshop', 'break', 'activity', 'other']
    }
}, { _id: false });

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['document', 'image', 'video', 'link', 'other'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: String,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        maxlength: 200
    },
    type: {
        type: String,
        enum: ['workshop', 'seminar', 'conference', 'competition', 'cultural', 'technical', 'sports', 'other'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ['online', 'offline', 'hybrid'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    registrationStartDate: {
        type: Date,
        required: true
    },
    registrationEndDate: {
        type: Date,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coOrganizers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    visibility: {
        type: String,
        enum: ['public', 'private', 'college', 'branch', 'batch'],
        default: 'public'
    },
    targetAudience: {
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        },
        batch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Batch'
        },
        year: [Number],
        semester: [Number]
    },
    capacity: {
        min: {
            type: Number,
            default: 1
        },
        max: Number
    },
    location: locationSchema,
    schedule: [scheduleItemSchema],
    speakers: [speakerSchema],
    resources: [resourceSchema],
    registrationFee: {
        amount: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'INR'
        }
    },
    prerequisites: [{
        type: String
    }],
    tags: [{
        type: String,
        trim: true
    }],
    images: [{
        url: String,
        caption: String,
        isPrimary: Boolean
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'cancelled', 'completed'],
        default: 'draft'
    },
    certificates: {
        isEnabled: {
            type: Boolean,
            default: false
        },
        template: String,
        criteria: {
            minAttendance: {
                type: Number,
                min: 0,
                max: 100
            },
            otherRequirements: [String]
        }
    },
    feedback: {
        isEnabled: {
            type: Boolean,
            default: true
        },
        form: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Form'
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
        publishedAt: Date,
        lastRegistrationAt: Date,
        registrationCount: {
            type: Number,
            default: 0
        },
        viewCount: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Indexes
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventSchema.index({ startDate: 1, endDate: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ 'targetAudience.college': 1 });
eventSchema.index({ 'targetAudience.branch': 1 });
eventSchema.index({ 'targetAudience.batch': 1 });

// Virtual for registration status
eventSchema.virtual('registrationStatus').get(function() {
    const now = new Date();
    if (now < this.registrationStartDate) return 'upcoming';
    if (now > this.registrationEndDate) return 'closed';
    return 'open';
});

// Virtual for event status
eventSchema.virtual('eventStatus').get(function() {
    const now = new Date();
    if (now < this.startDate) return 'upcoming';
    if (now > this.endDate) return 'completed';
    return 'ongoing';
});

// Methods
eventSchema.methods.isRegistrationOpen = function() {
    const now = new Date();
    return now >= this.registrationStartDate && now <= this.registrationEndDate;
};

eventSchema.methods.hasCapacity = function() {
    return !this.capacity.max || this.metadata.registrationCount < this.capacity.max;
};

eventSchema.methods.canRegister = function() {
    return this.isRegistrationOpen() && this.hasCapacity() && this.status === 'published';
};

// Middleware
eventSchema.pre('save', function(next) {
    this.metadata.updatedAt = new Date();
    if (this.isModified('status') && this.status === 'published') {
        this.metadata.publishedAt = new Date();
    }
    next();
});

export const Event = mongoose.model('Event', eventSchema); 