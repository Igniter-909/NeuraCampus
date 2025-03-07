import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['previous_paper', 'lab_manual', 'study_material', 'syllabus'],
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
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
    fileUrl: {
        type: String,
        required: true
    },
    description: String,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    year: Number,
    tags: [String],
    downloads: {
        type: Number,
        default: 0
    },
    visibility: {
        type: String,
        enum: ['public', 'branch_only', 'batch_only'],
        default: 'branch_only'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource; 