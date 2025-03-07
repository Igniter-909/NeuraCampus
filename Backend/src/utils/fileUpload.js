import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Create unique filename with original extension
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

// Configure upload middleware
export const upload = multer({ storage: storage });

// Function to handle file upload and return file URL
export const uploadFile = async (file) => {
    if (!file) {
        throw new Error('No file provided');
    }
    
    // Return the file path that can be used to access the file
    return `/${file.path.replace(/\\/g, '/')}`;
}; 