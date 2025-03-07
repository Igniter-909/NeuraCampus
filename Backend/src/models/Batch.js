import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    currentSemester: {
        type: Number,
        required: true,
        min: 1
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Batch = mongoose.model('Batch', batchSchema); 