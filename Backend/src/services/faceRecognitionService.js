import * as tf from '@tensorflow/tfjs-node';
import * as faceapi from '@vladmandic/face-api';
import { User } from '../models/User.js';
import logger from '../utils/logger.js';

class FaceRecognitionService {
    constructor() {
        this.initialized = false;
        this.initializeModels();
    }

    async initializeModels() {
        try {
            // Load face-api models
            await faceapi.nets.ssdMobilenetv1.loadFromDisk('Backend\src\modules\ssd_mobilenetv1');
            await faceapi.nets.faceLandmark68Net.loadFromDisk('Backend\src\modules\face_landmark_68');
            await faceapi.nets.faceRecognitionNet.loadFromDisk('Backend\src\modules\face_recognition');
            this.initialized = true;
            logger.info('Face recognition models loaded successfully');
        } catch (error) {
            logger.error('Error loading face recognition models:', error);
            throw error;
        }
    }

    async extractFaceEmbeddings(imageBuffer) {
        if (!this.initialized) {
            throw new Error('Face recognition models not initialized');
        }

        try {
            // Convert buffer to tensor
            const img = await faceapi.bufferToImage(imageBuffer);
            
            // Detect face and get embeddings
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detections) {
                throw new Error('No face detected in image');
            }

            return {
                embeddings: Array.from(detections.descriptor),
                confidence: detections.detection.score,
                landmarks: detections.landmarks.positions
            };
        } catch (error) {
            logger.error('Error extracting face embeddings:', error);
            throw error;
        }
    }

    async verifyFace(userId, imageBuffer, threshold = 0.6) {
        try {
            // Get user's stored embeddings
            const user = await User.findById(userId);
            if (!user.faceData?.embeddings?.length) {
                throw new Error('No face data registered for user');
            }

            // Get embeddings from new image
            const { embeddings: newEmbeddings } = await this.extractFaceEmbeddings(imageBuffer);

            // Compare with stored embeddings
            const matches = user.faceData.embeddings.map(storedEmbedding => {
                const distance = faceapi.euclideanDistance(newEmbeddings, storedEmbedding);
                return {
                    distance,
                    matched: distance < threshold
                };
            });

            const bestMatch = matches.reduce((best, current) => 
                current.distance < best.distance ? current : best
            );

            return {
                verified: bestMatch.matched,
                confidence: 1 - bestMatch.distance,
                threshold
            };
        } catch (error) {
            logger.error('Error verifying face:', error);
            throw error;
        }
    }

    async registerFace(userId, imageBuffer) {
        try {
            const { embeddings, confidence, landmarks } = await this.extractFaceEmbeddings(imageBuffer);

            // Update user's face data
            await User.findByIdAndUpdate(userId, {
                $push: {
                    'faceData.embeddings': embeddings,
                    'faceData.faceImages': {
                        capturedAt: new Date(),
                        metadata: {
                            confidence,
                            quality: confidence,
                            lighting: 'good' // You can implement lighting detection
                        }
                    }
                },
                $set: {
                    'faceData.lastUpdated': new Date(),
                    'faceData.verificationStatus': 'verified'
                }
            });

            return {
                success: true,
                confidence,
                embeddings
            };
        } catch (error) {
            logger.error('Error registering face:', error);
            throw error;
        }
    }
}

export const faceRecognitionService = new FaceRecognitionService();