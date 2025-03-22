from flask import Flask, request, jsonify, render_template
import os
from src.CMS.face_recognition.capture import FaceImageCapture
from src.CMS.face_recognition.train import FaceModelTrainer
from src.CMS.face_recognition.recognize import FaceRecognizer
from src.models.user_face import UserFace
import base64
import cv2
import numpy as np
from datetime import datetime
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from bson import ObjectId
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Initialize MongoDB connection
user_face_db = UserFace(os.getenv('MONGODB_URI'))

# Initialize face recognition classes
face_capture = FaceImageCapture()
face_trainer = FaceModelTrainer()
face_recognizer = FaceRecognizer(tolerance=0.6)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/capture', methods=['POST'])
def capture_face():
    try:
        data = request.json
        if not data or 'image' not in data or 'userId' not in data:
            return jsonify({'error': 'Missing image data or userId'}), 400

        try:
            user_id = ObjectId(data['userId'])
        except:
            return jsonify({'error': 'Invalid user ID format'}), 400

        # Verify user exists
        if not user_face_db.verify_user_exists(user_id):
            return jsonify({'error': 'User not found'}), 404

        # Decode base64 image
        image_data = base64.b64decode(data['image'].split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Create a temporary file to upload to Cloudinary
        temp_path = f'temp_{datetime.now().strftime("%Y%m%d_%H%M%S")}.jpg'
        cv2.imwrite(temp_path, image)

        try:
            # Upload to Cloudinary with folder structure
            upload_result = cloudinary.uploader.upload(
                temp_path,
                folder=f"face_recognition/{str(user_id)}",
                public_id=f"face_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            )

            # Update user's face data in existing User collection
            user_face_db.add_face_image(
                user_id,
                upload_result['secure_url'],
                upload_result['public_id']
            )

            return jsonify({
                'success': True,
                'message': 'Face image captured and stored successfully',
                'imageUrl': upload_result['secure_url']
            })

        finally:
            # Ensure temporary file is removed even if upload fails
            if os.path.exists(temp_path):
                os.remove(temp_path)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<userId>/images', methods=['GET'])
def get_user_images(userId):
    try:
        try:
            user_id = ObjectId(userId)
        except:
            return jsonify({'error': 'Invalid user ID format'}), 400

        images = user_face_db.get_user_images(user_id)
        
        if not images:
            return jsonify({'error': 'No face images found for this user'}), 404

        return jsonify({
            'success': True,
            'userId': userId,
            'images': images
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/train', methods=['POST'])
def train_model():
    try:
        # Get all users and their face images from MongoDB
        users = user_face_db.get_all_users()
        
        # Create temporary directory for training
        temp_dir = 'temp_training'
        os.makedirs(temp_dir, exist_ok=True)

        try:
            # Download images for training
            for user in users:
                user_dir = os.path.join(temp_dir, str(user['_id']))
                os.makedirs(user_dir, exist_ok=True)
                
                for image in user['faceData']['faceImages']:
                    # Download image from Cloudinary URL
                    response = requests.get(image['url'])
                    if response.status_code == 200:
                        image_path = os.path.join(
                            user_dir, 
                            f"face_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
                        )
                        with open(image_path, 'wb') as f:
                            f.write(response.content)

            # Train model
            face_trainer.train_model(temp_dir)
            face_trainer.save_model()
            
            # Load the model after training
            face_recognizer.load_model()

            return jsonify({
                'success': True,
                'message': 'Model trained and loaded successfully'
            })

        finally:
            # Clean up temporary directory
            import shutil
            shutil.rmtree(temp_dir, ignore_errors=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/model/status', methods=['GET'])
def get_model_status():
    try:
        # Get count of users from MongoDB
        users = user_face_db.get_all_users()
        total_users = len(users)
        total_images = sum(len(user['faceData']['faceImages']) for user in users)

        return jsonify({
            'success': True,
            'modelTrained': face_recognizer.is_model_loaded(),
            'totalUsers': total_users,
            'totalImages': total_images,
            'lastTrained': os.path.getmtime(face_recognizer.model_path) if os.path.exists(face_recognizer.model_path) else None
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recognize', methods=['POST'])
def recognize_face():
    try:
        data = request.json
        if not data or 'image' not in data:
            return jsonify({
                'success': False,
                'message': 'Missing image data'
            }), 400

        # Check if model is loaded
        if not face_recognizer.is_model_loaded():
            return jsonify({
                'success': False,
                'message': 'Face recognition model not loaded. Please train the model first.'
            }), 400

        # Decode base64 image
        image_data = base64.b64decode(data['image'].split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Perform recognition
        result = face_recognizer.recognize_single_face(image)
        return jsonify(result)

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)