import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { isRecruiter } from '../middleware/roleCheck.js';
import * as PaymentController from '../controllers/PaymentController.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isRecruiter);

// Payment routes
router.post('/subscription/order', PaymentController.createSubscriptionOrder);
router.post('/subscription/verify', PaymentController.verifySubscriptionPayment);
router.get('/history', PaymentController.getPaymentHistory);

export default router; 