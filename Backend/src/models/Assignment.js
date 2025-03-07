import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,  // in bytes
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    files: [fileSchema],
    description: {
        type: String,
        trim: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['submitted', 'graded', 'returned', 'late'],
        default: 'submitted'
    },
    grade: {
        score: {
            type: Number,
            min: 0,
            max: 100
        },
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

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true,
        min: 0
    },
    assignmentType: {
        type: String,
        enum: ['individual', 'group'],
        default: 'individual'
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'closed'],
        default: 'draft'
    },
    submissionSettings: {
        allowLateSubmission: {
            type: Boolean,
            default: false
        },
        latePenalty: {
            type: Number,  // percentage deduction
            default: 0
        },
        maxAttempts: {
            type: Number,
            default: 1
        },
        fileTypes: [{
            type: String,
            enum: ['pdf', 'doc', 'docx', 'txt', 'zip', 'rar', 'jpg', 'jpeg', 'png', 'ppt', 'pptx'],
            default: ['pdf', 'doc', 'docx']
        }],
        maxFileSize: {
            type: Number,  // in bytes
            default: 5 * 1024 * 1024  // 5MB
        }
    },
    resources: [{
        name: String,
        description: String,
        file: fileSchema
    }],
    submissions: [submissionSchema],
    rubric: [{
        criterion: String,
        description: String,
        maxScore: Number,
        weight: Number
    }],
    tags: [{
        type: String,
        trim: true
    }],
    visibility: {
        type: String,
        enum: ['visible', 'hidden'],
        default: 'visible'
    },
    plagiarismThreshold: {
        type: Number,
        min: 0,
        max: 100,
        default: 30  // percentage
    }
}, {
    timestamps: true
});

// Indexes
assignmentSchema.index({ subject: 1, batch: 1 });
assignmentSchema.index({ deadline: 1 });
assignmentSchema.index({ status: 1 });

// Virtual for submission count
assignmentSchema.virtual('submissionCount').get(function() {
    return this.submissions.length;
});

// Virtual for average grade
assignmentSchema.virtual('averageGrade').get(function() {
    const gradedSubmissions = this.submissions.filter(s => s.grade && s.grade.score);
    if (gradedSubmissions.length === 0) return null;
    
    const total = gradedSubmissions.reduce((sum, sub) => sum + sub.grade.score, 0);
    return total / gradedSubmissions.length;
});

// Methods
assignmentSchema.methods.isOverdue = function() {
    return new Date() > this.deadline;
};

assignmentSchema.methods.canSubmit = function(userId) {
    const userSubmissions = this.submissions.filter(s => 
        s.student.toString() === userId.toString()
    );
    return userSubmissions.length < this.submissionSettings.maxAttempts;
};

assignmentSchema.methods.getSubmission = function(userId) {
    return this.submissions.find(s => 
        s.student.toString() === userId.toString()
    );
};

// Middleware
assignmentSchema.pre('save', function(next) {
    if (this.isModified('deadline') && this.deadline < new Date()) {
        this.status = 'closed';
    }
    next();
});

export const Assignment = mongoose.model('Assignment', assignmentSchema); 