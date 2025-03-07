import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isHOD } from '../middleware/roleCheck.js';
import * as HODController from '../controllers/HODController.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isHOD);

router.post('/branches', HODController.createBranch);
router.post('/batches', HODController.createBatch);
router.get('/branches/:branchId', HODController.getBranchDetails);

export default router; 