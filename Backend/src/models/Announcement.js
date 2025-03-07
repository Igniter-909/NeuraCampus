import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['general', 'academic', 'event', 'emergency'],
        required: true
    },
    target: {
        type: {
            type: String,
            enum: ['college', 'branch', 'batch', 'specific_users'],
            required: true
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        },
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        },
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Batch'
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    attachments: [{
        name: String,
        url: String
    }],
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    validUntil: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement; 