import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    credits: {
        theory: Number,
        practical: Number,
        total: Number
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    syllabus: String,
    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Subject = mongoose.model('Subject', subjectSchema); 