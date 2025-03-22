from src.CMS.face_recognition.capture import FaceImageCapture

# Initialize the capture system
face_capture = FaceImageCapture()

# Capture images for a person
face_capture.capture_faces("john_doe", num_images=20, delay=2)


# Training
from src.CMS.face_recognition.train import FaceModelTrainer
from src.CMS.face_recognition.capture import FaceImageCapture
from src.CMS.face_recognition.recognize import FaceRecognizer

def capture_faces():
    face_capture = FaceImageCapture()
    name = input("Enter person's name: ")
    num_images = int(input("Enter number of images to capture: "))
    delay = float(input("Enter delay between captures (in seconds): "))
    face_capture.capture_faces(name, num_images=num_images, delay=delay)

def train_model():
    trainer = FaceModelTrainer()
    print("Training model with captured faces...")
    trainer.train_model('data/face_data/raw')
    trainer.save_model()
    print("Model training completed and saved!")

def recognize_faces():
    recognizer = FaceRecognizer(tolerance=0.6)
    recognizer.load_model()
    print("Starting face recognition...")
    recognizer.recognize_faces()

def main():
    while True:
        print("\n=== Face Recognition System ===")
        print("1. Capture Face Images")
        print("2. Train Model")
        print("3. Start Face Recognition")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ")
        
        if choice == '1':
            capture_faces()
        elif choice == '2':
            train_model()
        elif choice == '3':
            recognize_faces()
        elif choice == '4':
            print("Exiting program...")
            break
        else:
            print("Invalid choice! Please try again.")

if __name__ == "__main__":
    main()


