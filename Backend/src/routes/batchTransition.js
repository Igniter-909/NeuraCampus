import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isCollegeActive } from '../middleware/collegeStatusCheck.js';
import { isStudent, canManageBatchTransition } from '../middleware/roleCheck.js';
import {
    getAllBatchTransitions,
    getBatchTransitionById,
    createBatchTransition,
    updateBatchTransition,
    updateBatchTransitionStatus,
    getTransitionStudents,
    updateTransitionStudents,
    sendInvitations,
    getInvitations,
    getStudentInvitations,
    respondToInvitation,
    transitionBatch,
    getInvitationById,
    resendInvitation,
    getStudentTransitions
} from '../controllers/BatchTransitionController.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isCollegeActive);

// Admin routes
router.get('/admin/batch-transitions', canManageBatchTransition, getAllBatchTransitions);
router.get('/admin/batch-transitions/:transitionId', canManageBatchTransition, getBatchTransitionById);
router.post('/admin/batch-transitions', canManageBatchTransition, createBatchTransition);
router.put('/admin/batch-transitions/:transitionId', canManageBatchTransition, updateBatchTransition);
router.put('/admin/batch-transitions/:transitionId/status', canManageBatchTransition, updateBatchTransitionStatus);
router.get('/admin/batch-transitions/:transitionId/students', canManageBatchTransition, getTransitionStudents);
router.put('/admin/batch-transitions/:transitionId/students', canManageBatchTransition, updateTransitionStudents);

// Invitation routes for admins
router.post('/admin/batch-transitions/:transitionId/invitations', canManageBatchTransition, sendInvitations);
router.get('/admin/invitations', canManageBatchTransition, getInvitations);
router.get('/admin/invitations/:invitationId', canManageBatchTransition, getInvitationById);
router.post('/admin/invitations/:invitationId/resend', canManageBatchTransition, resendInvitation);

// Student routes
router.get('/student/invitations', isStudent, getStudentInvitations);
router.put('/student/invitations/:invitationId/respond', isStudent, respondToInvitation);
router.get('/student/batch-transitions', isStudent, getStudentTransitions);

// Transition route
router.post('/transition', canManageBatchTransition, transitionBatch);

export default router; 