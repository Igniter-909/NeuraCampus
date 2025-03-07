import express from 'express';
import passport from 'passport';
import { register, login, logout, googleAuth, googleAuthCallback, forgotPassword, resetPassword ,getUser, registerFace, verifyFace} from '../controllers/AuthController.js';
import { validateLogin, validateRegistration } from '../middleware/validator.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();


// Regular auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user/:userId', getUser);

// Google auth routes
router.get('/google', googleAuth);
router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/login',
        session: false 
    }),
    googleAuthCallback
);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/register-face', 
    verifyToken, 
    upload.single('faceImage'), 
    registerFace
);

router.post('/verify-face', 
    verifyToken, 
    upload.single('faceImage'), 
    verifyFace
);

export default router; 