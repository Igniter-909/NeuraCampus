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
        enum: ['online', 'offline', 'free'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paidAt: Date,
    refundedAt: Date,
    receipt: String
}, { _id: false });

const attendanceSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late'],
        required: true
    },
    checkInTime: Date,
    checkOutTime: Date,
    duration: Number, // in minutes
    location: {
        latitude: Number,
        longitude: Number
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { _id: false });

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    feedback: String,
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const eventRegistrationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    registrationType: {
        type: String,
        enum: ['individual', 'team', 'group'],
        default: 'individual'
    },
    teamDetails: {
        teamName: String,
        members: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            role: String,
            status: {
                type: String,
                enum: ['pending', 'accepted', 'rejected'],
                default: 'pending'
            }
        }]
    },
    registrationNumber: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'waitlisted', 'rejected'],
        default: 'pending'
    },
    payment: paymentSchema,
    attendance: [attendanceSchema],
    feedback: feedbackSchema,
    certificate: {
        issued: {
            type: Boolean,
            default: false
        },
        issuedAt: Date,
        certificateId: String,
        url: String
    },
    preferences: {
        dietaryRestrictions: [String],
        tShirtSize: String,
        accommodationRequired: Boolean,
        specialRequirements: String
    },
    documents: [{
        name: String,
        type: String,
        url: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        },
        verificationStatus: {
            type: String,
            enum: ['pending', 'verified', 'rejected'],
            default: 'pending'
        }
    }],
    metadata: {
        registeredAt: {
            type: Date,
            default: Date.now
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        registeredFrom: {
            ip: String,
            device: String,
            browser: String
        },
        source: {
            type: String,
            enum: ['website', 'mobile', 'admin', 'other'],
            default: 'website'
        }
    }
}, {
    timestamps: true
});

// Indexes
eventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });
eventRegistrationSchema.index({ registrationNumber: 1 }, { unique: true });
eventRegistrationSchema.index({ status: 1 });
eventRegistrationSchema.index({ 'payment.status': 1 });

// Generate unique registration number
eventRegistrationSchema.pre('save', async function(next) {
    if (!this.registrationNumber) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.registrationNumber = `EVT${year}${month}${random}`;
    }
    this.metadata.lastUpdated = new Date();
    next();
});

// Virtual for attendance percentage
eventRegistrationSchema.virtual('attendancePercentage').get(function() {
    if (!this.attendance.length) return 0;
    const present = this.attendance.filter(a => a.status === 'present').length;
    return (present / this.attendance.length) * 100;
});

// Methods
eventRegistrationSchema.methods.isEligibleForCertificate = function(minAttendance) {
    return this.status === 'confirmed' && 
           this.attendancePercentage >= minAttendance &&
           this.payment?.status === 'completed';
};

eventRegistrationSchema.methods.canCancel = function() {
    return ['pending', 'confirmed', 'waitlisted'].includes(this.status);
};

eventRegistrationSchema.methods.updateAttendance = async function(sessionId, status, location) {
    const session = this.attendance.find(a => a.sessionId === sessionId);
    if (session) {
        session.status = status;
        if (status === 'present') {
            if (!session.checkInTime) session.checkInTime = new Date();
            session.location = location;
        }
        if (status === 'absent') {
            session.checkOutTime = new Date();
            if (session.checkInTime) {
                session.duration = Math.floor(
                    (session.checkOutTime - session.checkInTime) / (1000 * 60)
                );
            }
        }
    } else {
        this.attendance.push({
            sessionId,
            status,
            checkInTime: status === 'present' ? new Date() : null,
            location
        });
    }
    await this.save();
};

export const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema); 