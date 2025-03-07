import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    hodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    batches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    }],
    totalSemesters: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Branch = mongoose.model('Branch', branchSchema); 