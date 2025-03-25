
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
    with bz2.open('shape_predictor_68_face_landmarks.dat.bz2', 'rb') as source,          open('data/shape_predictor_68_face_landmarks.dat', 'wb') as dest:
        shutil.copyfileobj(source, dest)
    
    # Clean up
    Path('shape_predictor_68_face_landmarks.dat.bz2').unlink()
    print("Shape predictor file has been downloaded and extracted to data/shape_predictor_68_face_landmarks.dat")

if __name__ == "__main__":
    download_shape_predictor()
