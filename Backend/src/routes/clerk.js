import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isClerk } from '../middleware/roleCheck.js';
import * as ClerkController from '../controllers/ClerkController.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(isClerk);

router.post('/schedule', ClerkController.createSchedule);
router.post('/resources', upload.single('file'), ClerkController.uploadResource);
router.post('/announcements', ClerkController.createAnnouncement);
router.get('/schedule/:batchId', ClerkController.getSchedule);
router.get('/resources', ClerkController.getResources);
router.get('/announcements', ClerkController.getAnnouncements);

// Define routes with their handlers
router.post('/', ClerkController.createClerk);
router.get('/', ClerkController.getAllClerks);
router.get('/:id', ClerkController.getClerkById);
router.put('/:id', ClerkController.updateClerk);
router.delete('/:id', ClerkController.deleteClerk);

export default router; 