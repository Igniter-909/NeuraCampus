import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file', 'link'],
        default: 'text'
    },
    media: {
        url: String,
        type: String,
        name: String,
        size: Number
    },
    readBy: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        readAt: {
            type: Date,
            default: Date.now
        }
    }],
    metadata: {
        delivered: {
            type: Boolean,
            default: false
        },
        deliveredAt: Date,
        isEdited: {
            type: Boolean,
            default: false
        },
        editedAt: Date
    }
}, {
    timestamps: true
});

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    chatType: {
        type: String,
        enum: ['individual', 'group'],
        default: 'individual'
    },
    messages: [messageSchema],
    lastMessage: {
        content: String,
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        timestamp: Date
    },
    metadata: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});

// Indexes
chatSchema.index({ participants: 1 });
chatSchema.index({ 'messages.senderId': 1 });
chatSchema.index({ 'messages.createdAt': 1 });

export const Chat = mongoose.model('Chat', chatSchema); 