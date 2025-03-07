import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import * as SettingsController from '../controllers/SettingsController.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize('college_admin'));

// General settings routes
router.get('/', SettingsController.getSettings);
router.put('/', SettingsController.updateSettings);

// Feature-specific settings
router.put('/features/:featureKey', SettingsController.updateFeatureSettings);
router.put('/permissions/:role', SettingsController.updatePermissions);

// Security settings
router.put('/security', SettingsController.updateSecuritySettings);

// Notification settings
router.put('/notifications', SettingsController.updateNotificationSettings);

// Customization settings
router.put('/customization', SettingsController.updateCustomization);

export default router; 