import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {  isStudent } from '../middleware/roleCheck.js';
import { upload } from '../middleware/fileUpload.js';
import {
    // Profile Management
    getProfile,
    updateProfile,
    
    // Project Management
    addProject,
    updateProject,
    deleteProject,
    getProjects,
    
    // Post Management
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostById,
    
    // Connection Management
    addConnection,
    updateConnection,
    getConnections,
    getConnectionRequests,
    
    // Assignment Management
    submitAssignment,
    getAssignmentSubmission,
    getAllAssignmentSubmissions,
    deleteAssignmentSubmission,
    
    // Announcement Management
    getAnnouncements,
    markAnnouncementAsRead,
    getAnnouncementById,
    
    // Event Management
    getEvents,
    getEventById,
    registerForEvent,
    getEventSuggestions,
    
    // Academic Management
    getSchedule,
    getAttendance,
    getSubjects,
    getResources
} from '../controllers/StudentProfileController.js';

const router = express.Router();

// Apply authentication and student role middleware to all routes
router.use(verifyToken, isStudent);

// Profile Management Routes
router.get('/profile', getProfile);
router.put('/profile', upload.single('profilePicture'), updateProfile);

// Project Management Routes
router.get('/projects', getProjects);
router.post('/projects', upload.array('images'), addProject);
router.put('/projects/:projectId', upload.array('images'), updateProject);
router.delete('/projects/:projectId', deleteProject);

// Post Management Routes
router.get('/posts', getPosts);
router.get('/posts/:postId', getPostById);
router.post('/posts', upload.array('media'), createPost);
router.put('/posts/:postId', upload.array('media'), updatePost);
router.delete('/posts/:postId', deletePost);

// Connection Management Routes
router.get('/connections', getConnections);
router.get('/connections/requests', getConnectionRequests);
router.post('/connections', addConnection);
router.put('/connections/:connectionId', updateConnection);

// Assignment Management Routes
router.get('/assignments/submissions', getAllAssignmentSubmissions);
router.get('/assignments/:assignmentId/submission', getAssignmentSubmission);
router.post('/assignments/:assignmentId/submit', upload.array('files'), submitAssignment);
router.delete('/assignments/:assignmentId/submission', deleteAssignmentSubmission);

// Announcement Management Routes
router.get('/announcements', getAnnouncements);
router.get('/announcements/:announcementId', getAnnouncementById);
router.put('/announcements/:announcementId/read', markAnnouncementAsRead);

// Event Management Routes
router.get('/events', getEvents);
router.get('/events/suggestions', getEventSuggestions);
router.get('/events/:eventId', getEventById);
router.post('/events/:eventId/register', registerForEvent);

// Academic Management Routes
router.get('/schedule', getSchedule);
router.get('/attendance', getAttendance);
router.get('/subjects', getSubjects);
router.get('/resources', getResources);

export default router; 