import { Schedule } from '../models/Schedule.js';
import  Resource  from '../models/Resource.js';
import  Announcement  from '../models/Announcement.js';
import { uploadFile } from '../utils/fileUpload.js';
import  Clerk  from '../models/Clerk.js';

export const createSchedule = async (req, res) => {
    try {
        const { batchId, semester, weeklySchedule } = req.body;

        const schedule = new Schedule({
            batchId,
            semester,
            weeklySchedule,
            createdBy: req.user._id
        });

        await schedule.save();

        res.status(201).json({
            message: 'Schedule created successfully',
            schedule
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating schedule', error: error.message });
    }
};

export const uploadResource = async (req, res) => {
    try {
        const { title, type, subject, branch, semester, description, visibility } = req.body;
        const file = req.file;

        // Upload file to storage (e.g., AWS S3)
        const fileUrl = await uploadFile(file);

        const resource = new Resource({
            title,
            type,
            subject,
            branch,
            semester,
            fileUrl,
            description,
            visibility,
            uploadedBy: req.user._id,
            year: new Date().getFullYear()
        });

        await resource.save();

        res.status(201).json({
            message: 'Resource uploaded successfully',
            resource
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading resource', error: error.message });
    }
};

export const createAnnouncement = async (req, res) => {
    try {
        const {
            title,
            content,
            type,
            target,
            attachments,
            priority,
            validUntil
        } = req.body;

        const announcement = new Announcement({
            title,
            content,
            type,
            target,
            attachments,
            priority,
            validUntil,
            createdBy: req.user._id
        });

        await announcement.save();

        // Notify relevant users based on target
        await notifyUsers(announcement);

        res.status(201).json({
            message: 'Announcement created successfully',
            announcement
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating announcement', error: error.message });
    }
};

export const getSchedule = async (req, res) => {
    try {
        const { batchId, semester } = req.query;

        const schedule = await Schedule.findOne({ batchId, semester })
            .populate('weeklySchedule.periods.subject')
            .populate('weeklySchedule.periods.teacher', 'name');

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error getting schedule', error: error.message });
    }
};

export const notifyUsers = async (announcement) => {
    // Implementation for notifying users based on announcement target
    // This could use WebSocket or push notifications
}

export const getAllClerks = async (req, res) => {
    try {
        const clerks = await Clerk.find();
        res.status(200).json(clerks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clerks', error: error.message });
    }
};

export const createClerk = async (req, res) => {
    try {
        const { name, email, phone, department, employeeId } = req.body;
        const clerk = new Clerk({
            name,
            email,
            phone,
            department,
            employeeId
        });
        await clerk.save();
        res.status(201).json({ message: 'Clerk created successfully', clerk });
    } catch (error) {
        res.status(500).json({ message: 'Error creating clerk', error: error.message });
    }
};

export const getClerkById = async (req, res) => {
    try {
        const clerk = await Clerk.findById(req.params.id);
        if (!clerk) {
            return res.status(404).json({ message: 'Clerk not found' });
        }
        res.status(200).json(clerk);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clerk', error: error.message });
    }
};

export const updateClerk = async (req, res) => {
    try {
        const clerk = await Clerk.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!clerk) {
            return res.status(404).json({ message: 'Clerk not found' });
        }
        res.status(200).json({ message: 'Clerk updated successfully', clerk });
    } catch (error) {
        res.status(500).json({ message: 'Error updating clerk', error: error.message });
    }
};

export const deleteClerk = async (req, res) => {
    try {
        const clerk = await Clerk.findByIdAndDelete(req.params.id);
        if (!clerk) {
            return res.status(404).json({ message: 'Clerk not found' });
        }
        res.status(200).json({ message: 'Clerk deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting clerk', error: error.message });
    }
};

export const getResources = async (req, res) => {
    try {
        // Implementation for getting resources
        res.status(200).json({ message: 'Resources retrieved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error getting resources', error: error.message });
    }
};

export const getAnnouncements = async (req, res) => {
    try {
        // Implementation for getting announcements
        res.status(200).json({ message: 'Announcements retrieved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error getting announcements', error: error.message });
    }
}; 