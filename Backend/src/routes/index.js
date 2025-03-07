import express from 'express';
import authRoutes from './auth.js';
import superAdminRoutes from './superAdmin.js';
import collegeAdminRoutes from './collegeAdmin.js';
import hodRoutes from './hod.js';
import teacherRoutes from './teacher.js';
import clerkRoutes from './clerk.js';
import studentRoutes from './student.js';
import recruiterRoutes from './recruiter.js';
import batchTransitionRoutes from './batchTransition.js';
import invitationTemplateRoutes from './invitationTemplate.js';

const router = express.Router();

// Auth routes (no auth required)
router.use('/auth', authRoutes);


// Role-specific routes (auth required)
router.use('/super-admin', superAdminRoutes);
router.use('/college-admin', collegeAdminRoutes);
router.use('/hod', hodRoutes);
router.use('/teacher', teacherRoutes);
router.use('/clerk', clerkRoutes);
router.use('/student', studentRoutes);
router.use('/recruiter', recruiterRoutes);

// Feature-specific routes
router.use('/batch-transition', batchTransitionRoutes);
router.use('/invitation-template', invitationTemplateRoutes);

export default router; 