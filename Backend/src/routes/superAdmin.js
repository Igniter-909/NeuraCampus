import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isSuperAdmin } from '../middleware/roleCheck.js';
// import * as SuperAdminController from '../controllers/SuperAdminController.js';
import {
    createCollege,
    getAllColleges,
    getColleges,
    getCollegeById,
    updateCollege,
    deleteCollege,
    updateCollegeStatus,
    getAnalytics,
    getUsers,
    getUser
} from '../controllers/SuperAdminController.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isSuperAdmin);

// User management routes
router.get('/users', getUsers);  // Get all users
router.get('/users/:userId', getUser);  // Get a specific user

// College management routes
router.get('/colleges', getColleges);  // Filtered colleges with pagination
router.get('/colleges/all', getAllColleges);  // Get all colleges without filtering
router.post('/colleges', createCollege);  // Create a new college
router.get('/colleges/:collegeId', getCollegeById);  // Get a specific college
router.put('/colleges/:collegeId', updateCollege);  // Update college details
router.delete('/colleges/:collegeId', deleteCollege);  // Delete a college
router.put('/colleges/:collegeId/status', updateCollegeStatus);  // Update college status

// Analytics route
router.get('/analytics', getAnalytics);  // Get system analytics

// Other routes remain the same
// ...


export default router; 