import vision from '@google-cloud/vision';
import mongoose from 'mongoose';

// Initialize the vision client correctly
const client = new vision.ImageAnnotatorClient();

const attendanceSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    },
    markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    verificationMethod: {
        soundFrequency: {
            code: String,
            verified: Boolean,
            timestamp: Date
        },
        faceRecognition: {
            verified: Boolean,
            confidence: Number,
            timestamp: Date,
            imageUrl: String,
            livenessScore: Number,
            livenessVerified: Boolean,
            facialLandmarks: {
                type: Map,
                of: {
                    x: Number,
                    y: Number,
                    z: Number
                }
            },
            depthMap: String,
            faceGeometry: {
                vertices: [[Number]],
                landmarks3D: [[Number]]
            }
        }
    },
    location: {
        latitude: Number,
        longitude: Number,
        accuracy: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance; 