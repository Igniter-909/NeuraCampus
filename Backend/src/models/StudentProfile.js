import mongoose from 'mongoose';

const socialLinksSchema = new mongoose.Schema({
    linkedin: String,
    github: String,
    portfolio: String,
    twitter: String,
    instagram: String
}, { _id: false });

const educationSchema = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    startYear: {
        type: Number,
        required: true
    },
    endYear: {
        type: Number
    },
    currentSemester: {
        type: Number,
        min: 1,
        max: 8
    }
}, { _id: false });

const experienceSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: String,
    startDate: Date,
    endDate: Date,
    current: {
        type: Boolean,
        default: false
    },
    description: String,
    skills: [String]
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    technologies: [String],
    link: String,
    images: [String],
    startDate: Date,
    endDate: Date,
    teamSize: Number,
    role: String
});

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    proficiency: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        required: true
    },
    endorsements: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, { _id: false });

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: Date,
    issuer: String,
    certificate: String
});

const submissionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    files: [{
        name: String,
        url: String,
        type: String,
        size: Number
    }],
    description: String,
    submittedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['submitted', 'graded', 'returned'],
        default: 'submitted'
    },
    grade: {
        score: Number,
        feedback: String,
        gradedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        gradedAt: Date
    },
    isLate: {
        type: Boolean,
        default: false
    }
});

const connectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    media: [{
        type: String
    }],
    visibility: {
        type: String,
        enum: ['public', 'connections', 'private'],
        default: 'public'
    },
    likes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const studentProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    education: educationSchema,
    about: String,
    skills: [skillSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    achievements: [achievementSchema],
    certifications: [{
        name: String,
        issuer: String,
        issueDate: Date,
        expiryDate: Date,
        credentialId: String,
        url: String
    }],
    socialLinks: socialLinksSchema,
    languages: [{
        name: String,
        proficiency: {
            type: String,
            enum: ['basic', 'intermediate', 'fluent', 'native']
        }
    }],
    interests: [String],
    profilePicture: String,
    resume: String,
    connections: [connectionSchema],
    connectionRequests: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    submissions: [submissionSchema],
    posts: [postSchema]
}, {
    timestamps: true
});

// Indexes
studentProfileSchema.index({ userId: 1 });
studentProfileSchema.index({ 'skills.name': 1 });
studentProfileSchema.index({ 'education.college': 1 });
studentProfileSchema.index({ 'education.branch': 1 });

// Virtual for connection count
studentProfileSchema.virtual('connectionCount').get(function() {
    return this.connections.filter(c => c.status === 'accepted').length;
});

// Methods
studentProfileSchema.methods.isConnectedTo = function(userId) {
    return this.connections.some(c => 
        c.userId.toString() === userId.toString() && 
        c.status === 'accepted'
    );
};

studentProfileSchema.methods.hasPendingRequestFrom = function(userId) {
    return this.connectionRequests.some(r => 
        r.userId.toString() === userId.toString()
    );
};

studentProfileSchema.methods.getSubmissionForAssignment = function(assignmentId) {
    return this.submissions.find(s => 
        s.assignmentId.toString() === assignmentId.toString()
    );
};

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema); 