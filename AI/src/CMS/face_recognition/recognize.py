import cv2
import face_recognition
import pickle
from pathlib import Path
import numpy as np
from src.CMS.logging import logger
from src.CMS.face_recognition.utils.preprocessor import FacePreprocessor
import os
import dlib
from scipy.spatial import distance as dist

class FaceRecognizer:
    """Class for real-time face recognition using trained model."""
    
    def __init__(self, tolerance=0.6):
        """
        Initialize the face recognizer.
        
        Args:
            tolerance (float): Face recognition tolerance (lower is more strict)
        """
        self.project_root = Path(__file__).parent.parent.parent.parent
        self.model_path = self.project_root / 'data' / 'face_data' / 'models' / 'face_recognition_model.pkl'
        self.tolerance = tolerance
        self.known_face_encodings = []
        self.known_face_names = []
        self.preprocessor = FacePreprocessor()
        self.liveness_confirmed = False
        self.recognition_confirmed = False
        self.model_loaded = False
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor("data/shape_predictor/shape_predictor_68_face_landmarks.dat")
        self.EYE_AR_THRESH = 0.3
        self.MIN_BLINKS = 1
        self.blink_counter = 0
        self.blink_started = False
        self.last_ear = 1.0
        
    def load_model(self):
        """Load the trained model from disk."""
        if not self.model_path.exists():
            logger.error(f"Model file not found: {self.model_path}")
            return False
            
        try:
            with open(self.model_path, 'rb') as f:
                data = pickle.load(f)
                self.known_face_encodings = data['encodings']
                self.known_face_names = data['names']
            self.model_loaded = True
            logger.info(f"Model loaded with {len(self.known_face_encodings)} encodings")
            return True
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            return False
    
    def is_model_loaded(self):
        return self.model_loaded
    
    def recognize_faces(self):
        """Run real-time face recognition using webcam."""
        if not self.known_face_encodings:
            logger.error("No face encodings loaded. Please load model first.")
            return
        
        cap = cv2.VideoCapture(0)
        process_this_frame = True
        
        while True:
            ret, frame = cap.read()
            if not ret:
                logger.error("Failed to grab frame from camera")
                break
            
            if process_this_frame:
                # Process frame with liveness detection
                face_locations, face_encodings, liveness_detected, blink_count = self.preprocessor.process_frame(frame)
                
                face_names = []
                for face_encoding in face_encodings:
                    name = self.identify_face(face_encoding)
                    face_names.append(name)
                    if name != "Unknown":
                        logger.info(f"Person recognized: {name}")
                        if liveness_detected:
                            logger.info(f"Liveness confirmed for {name} (Blinks: {blink_count})")
                            self.liveness_confirmed = True
                            self.recognition_confirmed = True
            
            process_this_frame = not process_this_frame
            
            # Draw results with liveness information
            self.draw_results(frame, face_locations, face_names, liveness_detected, blink_count)
            
            if self.handle_keys():
                break
        
        cap.release()
        cv2.destroyAllWindows()
    
    def identify_face(self, face_encoding):
        """Identify a face encoding against known faces."""
        matches = face_recognition.compare_faces(
            self.known_face_encodings, face_encoding, tolerance=self.tolerance
        )
        name = "Unknown"
        
        if True in matches:
            first_match_index = matches.index(True)
            name = self.known_face_names[first_match_index]
        
        return name
    
    def draw_results(self, frame, face_locations, face_names, liveness_detected, blink_count):
        """Draw recognition results on frame."""
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Draw box and label
            color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
            cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
            
            # Draw name and liveness status
            label = f"{name}"
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), color, cv2.FILLED)
            cv2.putText(frame, label, (left + 6, bottom - 6), 
                       cv2.FONT_HERSHEY_DUPLEX, 0.6, (255, 255, 255), 1)
            
        # Draw liveness information
        liveness_color = (0, 255, 0) if liveness_detected else (0, 0, 255)
        cv2.putText(frame, f"Liveness: {'Confirmed' if liveness_detected else 'Not Confirmed'}", 
                   (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, liveness_color, 2)
        cv2.putText(frame, f"Blinks: {blink_count}", 
                   (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.putText(frame, f"Tolerance: {self.tolerance:.2f}", 
                   (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow('Face Recognition', frame)
    
    def handle_keys(self):
        """Handle keyboard input."""
        key = cv2.waitKey(1)
        if key == ord('q'):
            return True
        elif key == ord('+') or key == ord('='):
            self.tolerance = min(1.0, self.tolerance + 0.05)
            logger.info(f"Tolerance increased to {self.tolerance:.2f}")
        elif key == ord('-') or key == ord('_'):
            self.tolerance = max(0.1, self.tolerance - 0.05)
            logger.info(f"Tolerance decreased to {self.tolerance:.2f}")
        return False

    def eye_aspect_ratio(self, eye):
        A = dist.euclidean(eye[1], eye[5])
        B = dist.euclidean(eye[2], eye[4])
        C = dist.euclidean(eye[0], eye[3])
        ear = (A + B) / (2.0 * C)
        return ear

    def detect_blink(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.detector(gray)
        
        for face in faces:
            landmarks = self.predictor(gray, face)
            
            left_eye = [(landmarks.part(n).x, landmarks.part(n).y) for n in range(36, 42)]
            right_eye = [(landmarks.part(n).x, landmarks.part(n).y) for n in range(42, 48)]
            
            left_ear = self.eye_aspect_ratio(left_eye)
            right_ear = self.eye_aspect_ratio(right_eye)
            ear = (left_ear + right_ear) / 2.0
            
            # Detect blink using state machine
            if not self.blink_started and ear < self.EYE_AR_THRESH:
                self.blink_started = True
            elif self.blink_started and ear > self.EYE_AR_THRESH:
                self.blink_started = False
                self.blink_counter += 1
            
            self.last_ear = ear
        
        return self.blink_counter >= self.MIN_BLINKS

    def recognize_single_face(self, image):
        if not self.model_loaded:
            return {
                'success': False,
                'message': 'Model not loaded'
            }

        # Check for blinks
        blink_detected = self.detect_blink(image)
        if not blink_detected:
            return {
                'success': False,
                'message': 'Liveness check failed - please blink naturally'
            }

        # Convert image to RGB (face_recognition uses RGB)
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Find faces in the image
        face_locations = face_recognition.face_locations(rgb_image)
        
        if not face_locations:
            return {
                'success': False,
                'message': 'No face detected in image'
            }

        # Get face encodings
        face_encodings = face_recognition.face_encodings(rgb_image, face_locations)

        if not face_encodings:
            return {
                'success': False,
                'message': 'Could not encode face features'
            }

        # Compare with known faces
        matches = face_recognition.compare_faces(
            self.known_face_encodings, 
            face_encodings[0], 
            tolerance=self.tolerance
        )
        
        if True in matches:
            # Find distances to all known faces
            face_distances = face_recognition.face_distance(
                self.known_face_encodings, 
                face_encodings[0]
            )
            best_match_index = np.argmin(face_distances)
            
            if matches[best_match_index]:
                confidence = 1 - face_distances[best_match_index]
                if confidence > 0.55:  # Confidence threshold
                    return {
                        'success': True,
                        'userId': self.known_face_names[best_match_index],
                        'confidence': float(confidence),
                        'liveness_confirmed': True,
                        'blinks': self.blink_counter  # Return current blink count
                    }

        return {
            'success': False,
            'message': 'Face not recognized or confidence too low'
        }

    def reset_blink_counter(self):
        """Reset the blink counter and state"""
        self.blink_counter = 0
        self.blink_started = False
        self.last_ear = 1.0