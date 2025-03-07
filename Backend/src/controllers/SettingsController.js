import { CollegeSettings } from '../models/CollegeSettings.js';
import { validateSettings } from '../utils/settingsValidator.js';
import { applySettingsUpdate } from '../utils/settingsUpdater.js';

export const getSettings = async (req, res) => {
    try {
        const collegeId = req.user.college;
        
        let settings = await CollegeSettings.findOne({ collegeId });
        
        if (!settings) {
            // Create default settings if none exist
            settings = new CollegeSettings({ collegeId });
            await settings.save();
        }

        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const collegeId = req.user.college;
        const updates = req.body;

        // Validate settings updates
        const validationResult = validateSettings(updates);
        if (!validationResult.isValid) {
            return res.status(400).json({
                message: 'Invalid settings',
                errors: validationResult.errors
            });
        }

        // Apply updates and get affected systems
        const affectedSystems = await applySettingsUpdate(collegeId, updates);

        const settings = await CollegeSettings.findOneAndUpdate(
            { collegeId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Settings updated successfully',
            settings,
            affectedSystems
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateFeatureSettings = async (req, res) => {
    try {
        const { featureKey, settings } = req.body;
        const collegeId = req.user.college;

        const updateQuery = {
            [`features.${featureKey}`]: settings
        };

        const updatedSettings = await CollegeSettings.findOneAndUpdate(
            { collegeId },
            { $set: updateQuery },
            { new: true }
        );

        res.status(200).json({
            message: `${featureKey} settings updated successfully`,
            settings: updatedSettings.features[featureKey]
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updatePermissions = async (req, res) => {
    try {
        const { role, permissions } = req.body;
        const collegeId = req.user.college;

        const updateQuery = {
            [`permissions.${role}`]: permissions
        };

        const updatedSettings = await CollegeSettings.findOneAndUpdate(
            { collegeId },
            { $set: updateQuery },
            { new: true }
        );

        res.status(200).json({
            message: `Permissions for ${role} updated successfully`,
            permissions: updatedSettings.permissions[role]
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 