import cv2
import face_recognition
import numpy as np
from src.CMS.logging import logger
import dlib
from pathlib import Path
import sys
import os

class FacePreprocessor:
    """Utility class for face image preprocessing."""
    
    def __init__(self):
        """Initialize the preprocessor."""
        self.detector = dlib.get_frontal_face_detector()
        
        # Get the project root directory
        self.project_root = Path(__file__).parent.parent.parent.parent
        self.predictor_path = self.project_root / 'data' / 'shape_predictor_68_face_landmarks.dat'
        
        # Check if shape predictor file exists
        if not self.predictor_path.exists():
            logger.error(f"Shape predictor file not found at {self.predictor_path}")
            logger.info("Please download the shape predictor file using the following commands:")
            logger.info("1. wget http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2")
            logger.info("2. bzip2 -d shape_predictor_68_face_landmarks.dat.bz2")
            logger.info(f"3. Move the file to: {self.predictor_path}")
            logger.info("\nOr run the following Python code:")
            logger.info("import urllib.request")
            logger.info("import bz2")
            logger.info("import shutil")
            logger.info("url = 'http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2'")
            logger.info("urllib.request.urlretrieve(url, 'shape_predictor_68_face_landmarks.dat.bz2')")
            logger.info("with bz2.open('shape_predictor_68_face_landmarks.dat.bz2', 'rb') as source, \\\n"
                       "     open('data/shape_predictor_68_face_landmarks.dat', 'wb') as dest:")
            logger.info("    shutil.copyfileobj(source, dest)")
            
            # Create a helper script
            self.create_download_script()
            logger.info("\nAlternatively, run the generated script: python download_shape_predictor.py")
            
            sys.exit(1)
            
        self.predictor = dlib.shape_predictor(str(self.predictor_path))
        self.blink_threshold = 0.25
        self.blink_consec_frames = 1
        self.head_threshold = 0.2
        self.blink_counter = 0
        self.blink_total = 0
        self.head_movement_detected = False
        self.last_head_pose = None
        
    def create_download_script(self):
        """Create a helper script to download the shape predictor file."""
        script_content = '''
import urllib.request
import bz2
import shutil
from pathlib import Path

def download_shape_predictor():
    # Create data directory if it doesn't exist
    data_dir = Path('data')
    data_dir.mkdir(exist_ok=True)
    
    # Download the file
    print("Downloading shape predictor file...")
    url = 'http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2'
    urllib.request.urlretrieve(url, 'shape_predictor_68_face_landmarks.dat.bz2')
    
    # Extract the file
    print("Extracting file...")
    with bz2.open('shape_predictor_68_face_landmarks.dat.bz2', 'rb') as source, \
         open('data/shape_predictor_68_face_landmarks.dat', 'wb') as dest:
        shutil.copyfileobj(source, dest)
    
    # Clean up
    Path('shape_predictor_68_face_landmarks.dat.bz2').unlink()
    print("Shape predictor file has been downloaded and extracted to data/shape_predictor_68_face_landmarks.dat")

if __name__ == "__main__":
    download_shape_predictor()
'''
        
        with open('download_shape_predictor.py', 'w') as f:
            f.write(script_content)

    def calculate_ear(self, eye_landmarks):
        """Calculate Eye Aspect Ratio (EAR)."""
        # Compute vertical distances
        A = np.linalg.norm(eye_landmarks[1] - eye_landmarks[5])
        B = np.linalg.norm(eye_landmarks[2] - eye_landmarks[4])
        # Compute horizontal distance
        C = np.linalg.norm(eye_landmarks[0] - eye_landmarks[3])
        # Calculate EAR
        ear = (A + B) / (2.0 * C)
        return ear
    
    def get_head_pose(self, shape):
        """Estimate head pose using facial landmarks."""
        image_points = np.array([
            shape[30],    # Nose tip
            shape[8],     # Chin
            shape[36],    # Left eye left corner
            shape[45],    # Right eye right corner
            shape[48],    # Left mouth corner
            shape[54]     # Right mouth corner
        ], dtype="double")

        # 3D model points
        model_points = np.array([
            (0.0, 0.0, 0.0),             # Nose tip
            (0.0, -330.0, -65.0),        # Chin
            (-225.0, 170.0, -135.0),     # Left eye left corner
            (225.0, 170.0, -135.0),      # Right eye right corner
            (-150.0, -150.0, -125.0),    # Left mouth corner
            (150.0, -150.0, -125.0)      # Right mouth corner
        ])

        # Camera internals
        size = (640, 480)
        focal_length = size[1]
        center = (size[1]/2, size[0]/2)
        camera_matrix = np.array([
            [focal_length, 0, center[0]],
            [0, focal_length, center[1]],
            [0, 0, 1]
        ], dtype="double")

        dist_coeffs = np.zeros((4,1))
        (success, rotation_vector, translation_vector) = cv2.solvePnP(
            model_points, image_points, camera_matrix, dist_coeffs)

        return rotation_vector[1][0]  # Return y-axis rotation (head turn)
    
    def check_liveness(self, frame):
        """Check for signs of liveness (blinks and head movement)."""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.detector(gray, 0)
        
        liveness_detected = False
        blinked = False
        head_moved = False
        
        for face in faces:
            shape = self.predictor(gray, face)
            shape = np.array([[p.x, p.y] for p in shape.parts()])
            
            # Get eye landmarks
            left_eye = shape[36:42]
            right_eye = shape[42:48]
            
            # Calculate EAR for both eyes
            left_ear = self.calculate_ear(left_eye)
            right_ear = self.calculate_ear(right_eye)
            ear = (left_ear + right_ear) / 2.0
            
            # Debug logging for EAR values
            logger.debug(f"Current EAR: {ear:.3f}")
            
            # Check for blink
            if ear < self.blink_threshold:
                self.blink_counter += 1
                logger.debug(f"Blink counter: {self.blink_counter}")
            else:
                if self.blink_counter >= self.blink_consec_frames:
                    self.blink_total += 1
                    blinked = True
                    logger.info(f"Blink detected! Total blinks: {self.blink_total}")
                self.blink_counter = 0
            
            # Check head pose
            head_pose = self.get_head_pose(shape)
            
            # Initialize last_head_pose if None
            if self.last_head_pose is None:
                self.last_head_pose = head_pose
            
            # Check for significant head movement
            head_movement = abs(head_pose - self.last_head_pose)
            logger.debug(f"Head movement: {head_movement:.3f}")
            
            if head_movement > self.head_threshold:
                head_moved = True
                self.head_movement_detected = True
                logger.info("Head movement detected!")
            
            self.last_head_pose = head_pose
            
            # Consider liveness detected if either:
            # 1. Person has blinked at least once and moved their head
            # 2. Person has blinked multiple times (3 or more)
            if (blinked and self.head_movement_detected) or self.blink_total >= 3:
                liveness_detected = True
                logger.info("Liveness confirmed!")
                
        return liveness_detected, self.blink_total
    
    def process_frame(self, frame):
        """Process a video frame for face recognition with liveness detection."""
        # Resize frame for faster processing while maintaining accuracy
        height, width = frame.shape[:2]
        scale_factor = min(640 / width, 480 / height)
        if scale_factor < 1:
            small_frame = cv2.resize(frame, (0, 0), fx=scale_factor, fy=scale_factor)
        else:
            small_frame = frame.copy()
            
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        
        # Detect faces and get encodings
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        
        # Scale face locations back to original size if needed
        if scale_factor < 1:
            face_locations = [(int(top/scale_factor), int(right/scale_factor), 
                             int(bottom/scale_factor), int(left/scale_factor)) 
                            for top, right, bottom, left in face_locations]
        
        # Check liveness
        liveness_detected, blink_count = self.check_liveness(frame)
        
        return face_locations, face_encodings, liveness_detected, blink_count
    
    def process_image(self, image_path):
        """
        Process a single image file and return face encoding.
        
        Args:
            image_path: Path to the image file
            
        Returns:
            numpy.ndarray: Face encoding if face found, None otherwise
        """
        try:
            # Load and encode face
            image = face_recognition.load_image_file(str(image_path))
            face_encodings = face_recognition.face_encodings(image)
            
            if face_encodings:
                return face_encodings[0]
            else:
                logger.warning(f"No face found in {image_path}")
                return None
                
        except Exception as e:
            logger.error(f"Error processing {image_path}: {e}")
            return None 