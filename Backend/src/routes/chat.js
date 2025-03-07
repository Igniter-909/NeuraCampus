import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {   
    createChat,
    sendMessage,
    getChats,
    getChatMessages,
    markAsRead,
    deleteMessage,
    updateChat,
    leaveChat
} from '../controllers/ChatController.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

router.use(verifyToken);

router.get('/chats', getChats);
router.get('/chats/:chatId/messages', getChatMessages);
router.post('/chats/:chatId/messages', upload.single('media'), sendMessage);
router.post('/chats', createChat);
router.put('/chats/:chatId', updateChat);
router.delete('/chats/:chatId/messages/:messageId', deleteMessage);
router.post('/chats/:chatId/read', markAsRead);
router.post('/chats/:chatId/leave', leaveChat);

export default router; 