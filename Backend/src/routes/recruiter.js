import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isRecruiter } from '../middleware/roleCheck.js';
import * as RecruiterController from '../controllers/RecruiterController.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isRecruiter);

router.post('/register', RecruiterController.register);

router.post('/jobs', RecruiterController.createJobPosting);
router.get('/jobs', RecruiterController.getJobPostings);
router.put('/jobs/:id', RecruiterController.updateJobPosting);
router.get('/students', RecruiterController.searchStudents);
router.put('/applications/:id/status', RecruiterController.updateApplicationStatus);
router.get('/subscription', RecruiterController.getSubscriptionDetails);
router.post('/subscription/renew', RecruiterController.renewSubscription);

export default router; 