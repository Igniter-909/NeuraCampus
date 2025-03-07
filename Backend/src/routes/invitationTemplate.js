import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isCollegeActive } from '../middleware/collegeStatusCheck.js';
import { canManageBatchTransition, isHOD,  isCollegeAdmin, isTeacher } from '../middleware/roleCheck.js';
import {
    getAllTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    createDefaultTemplates,
    getHODTemplates
} from '../controllers/InvitationTemplateController.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isCollegeActive);

// Routes that can be accessed by users who can manage batch transitions
router.get(
  '/templates',
  canManageBatchTransition,
  getAllTemplates
);

router.get(
  '/templates/:templateId',
  canManageBatchTransition,
  getTemplateById
);

router.post(
  '/templates',
  canManageBatchTransition,
  createTemplate
);

router.put(
  '/templates/:templateId',
  canManageBatchTransition,
  updateTemplate
);

router.delete(
  '/templates/:templateId',
  canManageBatchTransition,
  deleteTemplate
);

// HOD-specific route
router.get(
  '/hod/templates',
  isHOD,
  getHODTemplates
);

// Admin route for creating default templates
router.post('/templates/create-defaults', isHOD,isCollegeAdmin,isTeacher, async (req, res) => {
    try {
        const collegeId = req.user.collegeId;
        const createdById = req.user._id;

        await createDefaultTemplates(collegeId, createdById);
        
        res.status(200).json({
            message: 'Default templates created successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating default templates',
            error: error.message
        });
    }
});

export default router; 