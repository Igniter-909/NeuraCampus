import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    weeklySchedule: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            required: true
        },
        periods: [{
            startTime: String,
            endTime: String,
            subject: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject'
            },
            teacher: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            room: String,
            type: {
                type: String,
                enum: ['lecture', 'lab', 'tutorial']
            }
        }]
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

export const Schedule = mongoose.model('Schedule', scheduleSchema); 