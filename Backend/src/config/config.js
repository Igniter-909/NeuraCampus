import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Email configuration
const config = {
    email: {
        host: process.env.SMTP_HOST || 'smtp.example.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true' || false,
        user: process.env.SMTP_USER || 'user@example.com',
        password: process.env.SMTP_PASSWORD || 'password',
        senderName: process.env.SMTP_SENDER_NAME || 'Your Application'
    }
};

// Log configuration (but not in production)
if (process.env.NODE_ENV !== 'production') {
    console.log('Email Configuration:', {
        ...config.email,
        password: '****' // Hide password in logs
    });
}

export default config; 