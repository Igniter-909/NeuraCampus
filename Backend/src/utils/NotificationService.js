import { Notification } from '../models/Notification.js';

export const sendNotification = async (userId, notification, wss) => {
    try {
        const newNotification = await Notification.create({
            userId,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            data: notification.data
        });

        wss.sendToUser(userId, {
            type: 'notification',
            data: newNotification
        });

        return newNotification;
    } catch (error) {
        console.error('Notification sending error:', error);
        throw error;
    }
};

export const sendBulkNotifications = async (userIds, notification, wss) => {
    try {
        const notifications = await Promise.all(
            userIds.map(userId => 
                sendNotification(userId, notification, wss)
            )
        );
        return notifications;
    } catch (error) {
        console.error('Bulk notification error:', error);
        throw error;
    }
};

export const markNotificationRead = async (userId, notificationId) => {
    try {
        await Notification.findByIdAndUpdate(notificationId, {
            readAt: new Date()
        });
    } catch (error) {
        console.error('Mark notification read error:', error);
        throw error;
    }
};

export const sendAnnouncementNotification = async (announcement) => {
    try {
        let userIds = [];

        // Determine target users based on announcement target
        switch (announcement.target.type) {
            case 'college':
                userIds = await getCollegeUsers(announcement.target.collegeId);
                break;
            case 'branch':
                userIds = await getBranchUsers(announcement.target.branchId);
                break;
            case 'batch':
                userIds = await getBatchUsers(announcement.target.batchId);
                break;
            case 'specific_users':
                userIds = announcement.target.users;
                break;
        }

        await sendBulkNotifications(userIds, {
            title: announcement.title,
            message: announcement.content,
            type: 'announcement',
            data: { announcementId: announcement._id }
        });
    } catch (error) {
        console.error('Announcement notification error:', error);
        throw error;
    }
}; 