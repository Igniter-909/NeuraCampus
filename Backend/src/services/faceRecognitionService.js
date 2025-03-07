import vision from '@google-cloud/vision';
const client = new vision.ImageAnnotatorClient();

const performLivenessCheck = async (imageBuffer) => {
    try {
        const [result] = await client.detectFaces(imageBuffer, {
            enableLivenessDetection: true,
            model: '3d'
        });
        
        return {
            livenessScore: result.liveness.score,
            livenessVerified: result.liveness.score > 0.8,
            facialLandmarks: result.landmarks3D,
            faceGeometry: {
                vertices: result.mesh.vertices,
                landmarks3D: result.mesh.landmarks
            }
        };
    } catch (error) {
        throw new Error('Face verification failed: ' + error.message);
    }
};

const saveFaceData = async (userId, faceData) => {
    // Save depth map and other 3D data to your storage solution
    const depthMapUrl = await uploadToStorage(faceData.depthMap);
    
    // Update user's attendance record
    await Attendance.findOneAndUpdate(
        { userId },
        {
            'verificationMethod.faceRecognition': {
                verified: faceData.livenessVerified,
                confidence: faceData.confidence,
                timestamp: new Date(),
                imageUrl: faceData.imageUrl,
                livenessScore: faceData.livenessScore,
                livenessVerified: faceData.livenessVerified,
                facialLandmarks: faceData.facialLandmarks,
                depthMap: depthMapUrl,
                faceGeometry: faceData.faceGeometry
            }
        }
    );
};

export { performLivenessCheck, saveFaceData };