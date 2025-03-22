import os
from box.exceptions import BoxValueError
import yaml
from cms.logging import logger
from ensure import ensure_annotations
from box import ConfigBox
from pathlib import Path
from typing import Any

@ensure_annotations
def read_yaml(path_to_yaml: Path) -> ConfigBox:
    """
    Reads a yaml file and returns a ConfigBox object.
    Args:
        path_to_yaml (Path): The path to the yaml file.
    Returns:
        ConfigBox: A ConfigBox object.
    """
    try:
        with open(path_to_yaml, 'r') as yaml_file:
            content = yaml.safe_load(yaml_file)
            logger.info(f"yaml file: {path_to_yaml} loaded successfully")
            return ConfigBox(content)
    except BoxValueError:
        raise ValueError("yaml file is empty")
    except Exception as e:
        raise e
    

@ensure_annotations
def create_directories(path_to_directories: list, verbose=True):
    """
    Create a list of directories.
    Args:
        path_to_directories (list): A list of directories to create.
        verbose (bool, optional): If True, print a message for each directory created. Defaults to True.
    """
    for path in path_to_directories:
        os.makedirs(path, exist_ok=True)
        if verbose:
            logger.info(f"created directory at {path}")

@ensure_annotations
def get_size(path: Path) -> str:
    """
    Get the size of a file in KB.
    Args:
        path (Path): The path to the file.
    Returns:
        str: The size of the file in bytes.
    """
    size_in_kb = round(os.path.getsize(path)/1024)
    return f"~ {size_in_kb} KB"
    
