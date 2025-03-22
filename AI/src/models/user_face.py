from pymongo import MongoClient
from datetime import datetime

class UserFace:
    def __init__(self, mongodb_uri):
        self.client = MongoClient(mongodb_uri)
        self.db = self.client.test  # Your existing database name
        self.users_collection = self.db.users  # Your existing users collection

    def create_user(self, user_id):
        user = {
            'user_id': user_id,
            'face_images': [],
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        return self.collection.insert_one(user)

    def add_face_image(self, user_id, image_url, cloudinary_public_id):
        image_data = {
            'url': image_url,
            'cloudinary_public_id': cloudinary_public_id,
            'captured_at': datetime.now()
        }
        
        # Find user and update/create faceData field
        return self.users_collection.update_one(
            {'_id': user_id},  # Assuming user_id is the MongoDB _id
            {
                '$push': {'faceData.faceImages': image_data},
                '$set': {
                    'faceData.lastUpdated': datetime.now(),
                    'faceData.verificationStatus': 'verified'
                }
            }
        )

    def get_user_images(self, user_id):
        user = self.users_collection.find_one({'_id': user_id})
        return user.get('faceData', {}).get('faceImages', []) if user else []

    def get_all_users(self):
        # Only get users who have face images
        return list(self.users_collection.find(
            {'faceData.faceImages': {'$exists': True, '$ne': []}},
            {'faceData.faceImages': 1, '_id': 1, 'name': 1}
        ))

    def verify_user_exists(self, user_id):
        user = self.users_collection.find_one({'_id': user_id})
        return user is not None

    def get_user(self, user_id):
        """
        Get a single user by ID with their face images
        
        Args:
            user_id: ObjectId of the user
            
        Returns:
            dict: User document with face images
        """
        return self.db.users.find_one({'_id': user_id})