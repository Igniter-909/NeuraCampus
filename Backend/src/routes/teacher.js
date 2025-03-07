import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isTeacher } from '../middleware/roleCheck.js';
import { getAssignedSubjects, uploadResource, getAttendanceReport, markAttendance, getSchedule } from '../controllers/TeacherController.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isTeacher);

router.get('/subjects', getAssignedSubjects);
router.post(
    '/resources',
    upload.single('file'),
    uploadResource
);
router.get('/attendance/report', getAttendanceReport);
router.post('/attendance/mark', markAttendance);
router.get('/schedule', getSchedule);

export default router; 