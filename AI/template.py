import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(message)s:')

project_name = "CMS"

list_of_files = [
    ".github/workflows/.gitkeep",
    "requirements.txt",
    "README.md",
    "main.py",
    "setup.py",
    "Dockerfile",
    "requirements_dev.txt",
    "config/config.yaml",
    "params.yaml",
    f"src/{project_name}/__init__.py",
    f"src/{project_name}/config/__init__.py",
    f"src/{project_name}/config/configuration.py",
    f"src/{project_name}/logging/__init__.py",

    f"src/{project_name}/face_recognition/__init__.py",
    f"src/{project_name}/face_recognition/utils/__init__.py",
    f"src/{project_name}/face_recognition/utils/preprocessing.py",
    f"src/{project_name}/face_recognition/models/__init__.py",
    f"src/{project_name}/face_recognition/recognize.py",
    f"src/{project_name}/face_recognition/train.py",
    f"src/{project_name}/face_recognition/capture.py",
    f"src/{project_name}/face_recognition/verify.py",

    f"src/{project_name}/lab_management/__init__.py",
    f"src/{project_name}/lab_management/utils/__init__.py",
    f"src/{project_name}/lab_management/utils/helpers.py",
    f"src/{project_name}/lab_management/models/__init__.py",
    f"src/{project_name}/lab_management/scanner.py",
    f"src/{project_name}/lab_management/inventory.py",
    f"src/{project_name}/lab_management/recommendation.py",


    f"src/{project_name}/utils/__init__.py",
    f"src/{project_name}/utils/common.py",
    f"src/{project_name}/exception.py",


    "data/face_data/raw/.gitkeep",
    "data/face_data/processed/.gitkeep",
    "data/face_data/models/.gitkeep",

    "data/lab_data/inventory/.gitkeep",
    "data/lab_data/logs/.gitkeep",

    "tests/__init__.py",
    "tests/test_face_recognition/.gitkeep",
    "tests/test_lab_management/.gitkeep",

    "notebooks/face_recognition_experiments/.gitkeep",
    "notebooks/lab_management_experiments/.gitkeep",

    "reports/face_recognition_report/.gitkeep",
    "reports/lab_management_report/.gitkeep",
]


for filepath in list_of_files:
    filepath = Path(filepath)
    filedir, filename = os.path.split(filepath)

    if filedir != "":
        os.makedirs(filedir, exist_ok=True)
        logging.info(f"Creating directory: {filedir} for the file {filename}")

    if (not os.path.exists(filepath)) or (os.path.getsize(filepath) == 0):
        with open(filepath,'w') as f:
            pass
            logging.info(f"Creating empty file: {filepath}")

    else:
        logging.info(f"{filename} already exists")
