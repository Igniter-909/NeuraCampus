import mongoose from 'mongoose';

const collegeSettingsSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    permissions: {
        students: {
            canCreateGroups: { type: Boolean, default: false },
            canContactRecruiters: { type: Boolean, default: true },
            canViewAlumniNetwork: { type: Boolean, default: true },
            maxProjectsAllowed: { type: Number, default: 10 }
        },
        teachers: {
            canCreateAnnouncements: { type: Boolean, default: true },
            canModifyAttendance: { type: Boolean, default: true },
            canUploadResources: { type: Boolean, default: true },
            resourceSizeLimit: { type: Number, default: 50 } // in MB
        },
        hod: {
            canModifyTeacherAssignments: { type: Boolean, default: true },
            canAccessAnalytics: { type: Boolean, default: true },
            canModifySubjects: { type: Boolean, default: true }
        }
    },
    features: {
        attendance: {
            enabled: { type: Boolean, default: true },
            requiredPercentage: { type: Number, default: 75 },
            verificationMethods: {
                gps: { type: Boolean, default: true },
                faceRecognition: { type: Boolean, default: true },
                qrCode: { type: Boolean, default: false }
            }
        },
        recruitment: {
            enabled: { type: Boolean, default: true },
            autoApproveCompanies: { type: Boolean, default: false },
            allowExternalRecruiters: { type: Boolean, default: true },
            minCGPARequired: { type: Number, default: 6.0 }
        },
        communication: {
            allowGroupChats: { type: Boolean, default: true },
            maxGroupSize: { type: Number, default: 200 },
            allowFileSharing: { type: Boolean, default: true },
            maxFileSize: { type: Number, default: 10 } // in MB
        }
    },
    notifications: {
        email: {
            announcements: { type: Boolean, default: true },
            attendance: { type: Boolean, default: true },
            results: { type: Boolean, default: true },
            placements: { type: Boolean, default: true }
        },
        push: {
            enabled: { type: Boolean, default: true },
            types: {
                announcements: { type: Boolean, default: true },
                attendance: { type: Boolean, default: true },
                messages: { type: Boolean, default: true }
            }
        }
    },
    security: {
        passwordPolicy: {
            minLength: { type: Number, default: 8 },
            requireSpecialChars: { type: Boolean, default: true },
            requireNumbers: { type: Boolean, default: true },
            expiryDays: { type: Number, default: 90 }
        },
        sessionTimeout: { type: Number, default: 30 }, // in minutes
        maxLoginAttempts: { type: Number, default: 5 }
    },
    customization: {
        logo: String,
        theme: {
            primaryColor: { type: String, default: '#1a73e8' },
            secondaryColor: { type: String, default: '#4285f4' }
        },
        dashboard: {
            widgets: [{
                type: String,
                enabled: Boolean,
                position: Number
            }]
        }
    },
    alumni: {
        registration: {
            enabled: { type: Boolean, default: true },
            verificationMethod: {
                type: String,
                enum: ['automatic', 'manual', 'document'],
                default: 'manual'
            },
            requiredDocuments: [{
                name: String,
                required: Boolean,
                description: String
            }],
            batchYearRange: {
                start: Number,
                end: Number
            }
        },
        networking: {
            canAccessJobBoard: { type: Boolean, default: true },
            canPostJobs: { type: Boolean, default: true },
            canMentorStudents: { type: Boolean, default: true },
            canCreateEvents: { type: Boolean, default: true }
        },
        visibility: {
            profile: {
                type: String,
                enum: ['public', 'college', 'alumni', 'none'],
                default: 'college'
            },
            contactInfo: {
                type: String,
                enum: ['public', 'college', 'alumni', 'none'],
                default: 'alumni'
            }
        },
        engagement: {
            allowNewsletterSubscription: { type: Boolean, default: true },
            allowEventCreation: { type: Boolean, default: true },
            maxEventsPerMonth: { type: Number, default: 2 },
            requireEventApproval: { type: Boolean, default: true }
        }
    }
}, {
    timestamps: true
});

export const CollegeSettings = mongoose.model('CollegeSettings', collegeSettingsSchema); 