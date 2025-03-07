import mongoose from 'mongoose';

const collegeDocumentSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    documentUrl: {
        type: String,
        required: true
    },
    documentType: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('CollegeDocument', collegeDocumentSchema); 