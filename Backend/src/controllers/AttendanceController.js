import  Attendance  from '../models/Attendance.js';
import { generateUniqueFrequency, verifyFrequency } from '../utils/SoundGenerator.js';
import { performLivenessCheck, saveFaceData } from '../services/faceRecognitionService.js';
import mongoose from 'mongoose';

const generateAttendanceCode = async (req, res) => {
    try {
        const { classId } = req.body;
        
        // Generate unique frequency code
        const frequencyCode = await generateUniqueFrequency();
        
        // Create pending attendance records for all students
        const attendance = await Attendance.create({
            classId,
            soundFrequency: {
                code: frequencyCode,
                verified: false
            }
        });

        res.status(200).json({
            frequencyCode,
            validityPeriod: '5 minutes'
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const verifyAttendance = async (req, res) => {
    try {
        const { classId, frequencyCode, faceImage, location } = req.body;
        const studentId = req.user._id;

        // Verify sound frequency
        const isFrequencyValid = await verifyFrequency(frequencyCode);
        if (!isFrequencyValid) {
            return res.status(400).json({ message: 'Invalid frequency code' });
        }

        // Perform new 3D liveness face verification
        const faceData = await performLivenessCheck(faceImage);
        if (!faceData.livenessVerified) {
            return res.status(400).json({ 
                message: 'Face verification failed: Liveness check failed',
                details: {
                    livenessScore: faceData.livenessScore
                }
            });
        }

        // Update attendance record with new face verification data
        const attendance = await Attendance.findOneAndUpdate(
            { classId, studentId },
            {
                status: 'present',
                verificationMethod: {
                    soundFrequency: {
                        code: frequencyCode,
                        verified: true,
                        timestamp: new Date()
                    },
                    faceRecognition: {
                        verified: faceData.livenessVerified,
                        confidence: faceData.livenessScore * 100, // Convert to percentage
                        timestamp: new Date(),
                        imageUrl: req.body.imageUrl,
                        livenessScore: faceData.livenessScore,
                        livenessVerified: faceData.livenessVerified,
                        facialLandmarks: faceData.facialLandmarks,
                        faceGeometry: faceData.faceGeometry
                    }
                },
                location
            },
            { new: true }
        );

        // Save additional face data separately (for future reference)
        await saveFaceData(studentId, {
            ...faceData,
            imageUrl: req.body.imageUrl
        });

        res.status(200).json({
            message: 'Attendance marked successfully',
            attendance,
            faceVerification: {
                livenessScore: faceData.livenessScore,
                verified: faceData.livenessVerified
            }
        });
    } catch (error) {
        console.error('Face verification error:', error);
        res.status(500).json({ 
            message: 'Face verification failed',
            error: error.message 
        });
    }
};

const getAttendanceStats = async (req, res) => {
    try {
        const studentId = req.params.studentId || req.user._id;
        
        const stats = await Attendance.aggregate([
            { $match: { studentId: mongoose.Types.ObjectId(studentId) } },
            { $group: {
                _id: '$status',
                count: { $sum: 1 }
            }}
        ]);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export {generateAttendanceCode,getAttendanceStats,verifyAttendance}