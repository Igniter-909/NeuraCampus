import face_recognition
import pickle
import os
from pathlib import Path
from src.CMS.logging import logger
from src.CMS.face_recognition.utils.preprocessor import FacePreprocessor
import json
import time

class FaceModelTrainer:
    """Class for training face recognition model with incremental updates."""
    
    def __init__(self):
        """Initialize the face model trainer."""
        # Get the project root directory
        self.project_root = Path(__file__).parent.parent.parent.parent
        self.models_dir = self.project_root / 'data' / 'face_data' / 'models'
        self.models_dir.mkdir(parents=True, exist_ok=True)
        
        self.model_path = self.models_dir / 'face_recognition_model.pkl'
        self.metadata_path = self.models_dir / 'model_metadata.json'
        self.known_face_encodings = []
        self.known_face_names = []
        self.preprocessor = FacePreprocessor()
        
        # Load existing model and metadata if available
        self.load_model()
        
    def load_model(self):
        """Load existing model and metadata."""
        if self.model_path.exists():
            try:
                with open(self.model_path, 'rb') as f:
                    model_data = pickle.load(f)
                self.known_face_encodings = model_data["encodings"]
                self.known_face_names = model_data["names"]
                logger.info(f"Loaded existing model with {len(self.known_face_encodings)} encodings")
            except Exception as e:
                logger.error(f"Error loading model: {e}")
                
        # Load or initialize metadata
        if self.metadata_path.exists():
            try:
                with open(self.metadata_path, 'r') as f:
                    self.metadata = json.load(f)
            except Exception as e:
                logger.error(f"Error loading metadata: {e}")
                self.metadata = {}
        else:
            self.metadata = {}
    
    def get_file_metadata(self, file_path):
        """Get file metadata including modification time."""
        return {
            'mod_time': os.path.getmtime(file_path),
            'size': os.path.getsize(file_path)
        }
    
    def train_model(self, data_dir):
        """
        Train the face recognition model, updating only changed or new data.
        
        Args:
            data_dir (str or Path): Directory containing person-wise face images
        """
        data_dir = Path(data_dir)
        logger.info(f"Checking for updates in {data_dir}")
        
        updates_made = False
        
        # Process each person's directory
        for person_name in os.listdir(data_dir):
            person_dir = data_dir / person_name
            if not person_dir.is_dir():
                continue
            
            # Check each image in the person's directory
            for image_file in person_dir.glob("*.jpg"):
                current_metadata = self.get_file_metadata(image_file)
                stored_metadata = self.metadata.get(str(image_file), {})
                
                # Check if file is new or modified
                if (str(image_file) not in self.metadata or 
                    current_metadata['mod_time'] != stored_metadata.get('mod_time') or
                    current_metadata['size'] != stored_metadata.get('size')):
                    
                    logger.info(f"Processing updated/new image: {image_file.name} for {person_name}")
                    
                    try:
                        # Process and encode face
                        face_encoding = self.preprocessor.process_image(image_file)
                        
                        if face_encoding is not None:
                            # Remove existing encodings for this person if file was modified
                            if str(image_file) in self.metadata:
                                self.remove_existing_encoding(str(image_file))
                            
                            # Add new encoding
                            self.known_face_encodings.append(face_encoding)
                            self.known_face_names.append(person_name)
                            
                            # Update metadata
                            self.metadata[str(image_file)] = current_metadata
                            updates_made = True
                            
                            logger.info(f"Successfully processed {image_file.name}")
                    except Exception as e:
                        logger.error(f"Error processing {image_file}: {e}")
        
        if updates_made:
            self.save_model()
            logger.info("Model updated with new/modified data")
        else:
            logger.info("No updates needed - all files are current")
    
    def remove_existing_encoding(self, file_path):
        """Remove existing encoding for a modified file."""
        if file_path in self.metadata:
            try:
                # Find and remove the corresponding encoding and name
                idx = list(self.metadata.keys()).index(file_path)
                self.known_face_encodings.pop(idx)
                self.known_face_names.pop(idx)
                logger.info(f"Removed existing encoding for {file_path}")
            except Exception as e:
                logger.error(f"Error removing existing encoding: {e}")
    
    def save_model(self):
        """Save the trained model and metadata to disk."""
        # Save model
        model_data = {
            "encodings": self.known_face_encodings,
            "names": self.known_face_names
        }
        
        with open(self.model_path, 'wb') as f:
            pickle.dump(model_data, f)
            
        # Save metadata
        with open(self.metadata_path, 'w') as f:
            json.dump(self.metadata, f)
            
        logger.info(f"Model saved with {len(self.known_face_encodings)} encodings")

    