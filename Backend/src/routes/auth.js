import express from 'express';
import passport from 'passport';
import { register, login, logout, googleAuth, googleAuthCallback, forgotPassword, resetPassword ,getUser} from '../controllers/AuthController.js';
import { validateLogin, validateRegistration } from '../middleware/validator.js';

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

export default router; 