import cv2
import numpy as np
import os
from pathlib import Path
import face_recognition
import time
from src.CMS.logging import logger
from src.CMS.exception import FileOperationException

class FaceImageCapture:
    """Class for capturing face images for training."""
    
    def __init__(self):
        """Initialize the face image capture system."""
        # Get the project root directory
        self.project_root = Path(__file__).parent.parent.parent.parent
        
        # Create data directory structure
        self.data_dir = self.project_root / 'data' / 'face_data'
        self.raw_dir = self.data_dir / 'raw'
        self.processed_dir = self.data_dir / 'processed'
        
        # Create directories if they don't exist
        for directory in [self.data_dir, self.raw_dir, self.processed_dir]:
            directory.mkdir(parents=True, exist_ok=True)
    
    def capture_faces(self, person_name, num_images=20, delay=2):
        """
        Capture multiple face images of a person.
        
        Args:
            person_name (str): Name of the person
            num_images (int): Number of images to capture
            delay (int): Delay between captures in seconds
        """
        try:
            # Create directory for this person if it doesn't exist
            person_dir = self.raw_dir / person_name
            person_dir.mkdir(parents=True, exist_ok=True)
            
            # Initialize camera
            cap = cv2.VideoCapture(0)
            
            # Count images captured
            count = 0
            logger.info(f"Capturing {num_images} images for {person_name}")
            print(f"Capturing {num_images} images for {person_name}. Press 'c' to capture, 'q' to quit.")
            
            # Last capture time
            last_capture = 0
            auto_mode = False
            
            while count < num_images:
                ret, frame = cap.read()
                if not ret:
                    raise FileOperationException("Failed to grab frame from camera")
                    
                # Display current frame
                display_frame = frame.copy()
                cv2.putText(display_frame, f"Images: {count}/{num_images}", (10, 30), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                
                # Instructions
                cv2.putText(display_frame, "Press 'c' to capture manually", (10, 60), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(display_frame, "Press 'a' to toggle auto-capture", (10, 90), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(display_frame, f"Auto mode: {'ON' if auto_mode else 'OFF'}", (10, 120), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0) if auto_mode else (0, 255, 0), 2)
                
                # Face detection for feedback
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                face_locations = face_recognition.face_locations(rgb_frame)
                
                # Draw rectangle around detected faces
                for top, right, bottom, left in face_locations:
                    cv2.rectangle(display_frame, (left, top), (right, bottom), (0, 255, 0), 2)
                
                cv2.imshow('Face Capture', display_frame)
                
                # Handle auto mode
                current_time = time.time()
                if auto_mode and current_time - last_capture > delay and len(face_locations) > 0:
                    # Auto-capture if a face is detected and delay has passed
                    img_path = person_dir / f"{person_name}_{count:03d}.jpg"
                    cv2.imwrite(str(img_path), frame)
                    logger.info(f"Image {count+1} saved: {img_path}")
                    count += 1
                    last_capture = current_time
                
                # Handle key presses
                key = cv2.waitKey(1)
                if key == ord('q'):
                    break
                elif key == ord('c'):
                    if len(face_locations) > 0:
                        # Manual capture if a face is detected
                        img_path = person_dir / f"{person_name}_{count:03d}.jpg"
                        cv2.imwrite(str(img_path), frame)
                        logger.info(f"Image {count+1} saved: {img_path}")
                        count += 1
                        last_capture = time.time()
                    else:
                        logger.warning("No face detected! Please position your face in the frame.")
                elif key == ord('a'):
                    # Toggle auto mode
                    auto_mode = not auto_mode
                    logger.info(f"Auto-capture mode {'enabled' if auto_mode else 'disabled'}")
                    last_capture = time.time()  # Reset timer when toggling
            
            # Release resources
            cap.release()
            cv2.destroyAllWindows()
            logger.info(f"Completed capturing {count} images for {person_name}")
            
        except Exception as e:
            logger.error(f"Error during face capture: {str(e)}")
            raise FileOperationException(f"Face capture failed: {str(e)}")
