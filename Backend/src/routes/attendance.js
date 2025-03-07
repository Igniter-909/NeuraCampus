import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isTeacher, isStudent, isHOD } from '../middleware/roleCheck.js';
import { generateAttendanceCode, verifyAttendance, getAttendanceStats } from '../controllers/AttendanceController.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);

// Teacher routes
router.post(
    '/generate-code',
    isTeacher,
    generateAttendanceCode
);

// Student routes
router.post(
    '/verify',
    isStudent,
    verifyAttendance
);

// Common routes
router.get(
    '/stats/:studentId?',
    [isTeacher, isStudent, isHOD],
    getAttendanceStats
);

export default router; 