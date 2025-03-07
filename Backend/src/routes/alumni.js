import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import * as AlumniController from '../controllers/AlumniController.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

router.use(authenticate);

// Registration and profile routes
router.post(
    '/register',
    authorize('alumni'),
    upload.array('documents'),
    AlumniController.registerAlumni
);
router.put('/profile', authorize('alumni'), AlumniController.updateProfile);
router.put('/mentorship', authorize('alumni'), AlumniController.updateMentorshipStatus);

// Network routes
router.get('/network', AlumniController.getAlumniNetwork);
router.get('/mentors', AlumniController.getAvailableMentors);
router.post('/mentorship/request', authorize('student'), AlumniController.requestMentorship);

// Events and contributions
router.post('/events', authorize('alumni'), AlumniController.createEvent);
router.post('/job-referrals', authorize('alumni'), AlumniController.createJobReferral);

export default router; 