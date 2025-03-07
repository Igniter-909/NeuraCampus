import { Chat } from '../models/Chat.js';
import { uploadFile } from '../utils/fileUpload.js';
import logger from '../utils/logger.js';

const createChat = async (req, res) => {
    try {
        const { participantId } = req.body;
        const userId = req.user._id;

        // Check if chat already exists
        const existingChat = await Chat.findOne({
            chatType: 'individual',
            participants: { $all: [userId, participantId] }
        });

        if (existingChat) {
            return res.status(200).json({ chat: existingChat });
        }

        // Create new chat
        const newChat = await Chat.create({
            participants: [userId, participantId],
            chatType: 'individual',
            metadata: {
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true
            }
        });

        const populatedChat = await Chat.findById(newChat._id)
            .populate('participants', 'name email profilePicture');

        res.status(201).json({
            message: 'Chat created successfully',
            chat: populatedChat
        });

    } catch (error) {
        logger.error('Error creating chat:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { content, messageType = 'text' } = req.body;
        const userId = req.user._id;

        let chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Create new message
        const newMessage = {
            senderId: userId,
            content,
            messageType,
            readBy: [{ userId }]
        };

        // Handle media upload if present
        if (req.file) {
            newMessage.media = {
                url: await uploadFile(req.file),
                type: req.file.mimetype,
                name: req.file.originalname,
                size: req.file.size
            };
        }

        // Update chat with new message
        chat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { messages: newMessage },
                $set: {
                    'lastMessage.content': content,
                    'lastMessage.senderId': userId,
                    'lastMessage.timestamp': new Date(),
                    'metadata.updatedAt': new Date()
                }
            },
            { new: true }
        ).populate('messages.senderId', 'name email profilePicture');

        // Notify other participants through WebSocket
        const otherParticipants = chat.participants.filter(p => !p.equals(userId));
        wsManager.broadcastToUsers(otherParticipants, {
            type: 'new_message',
            chatId,
            message: newMessage
        });

        res.status(200).json({
            message: 'Message sent successfully',
            chatMessage: chat.messages[chat.messages.length - 1]
        });

    } catch (error) {
        logger.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getChats = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const userId = req.user._id;

        const chats = await Chat.find({
            participants: userId,
            'metadata.isActive': true
        })
        .populate('participants', 'name email profilePicture')
        .populate('lastMessage.senderId', 'name')
        .sort({ 'metadata.updatedAt': -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

        const totalChats = await Chat.countDocuments({
            participants: userId,
            'metadata.isActive': true
        });

        // Process chats to include additional info
        const processedChats = chats.map(chat => ({
            ...chat.toObject(),
            unreadCount: chat.messages.filter(msg => 
                !msg.readBy.some(read => read.userId.equals(userId))
            ).length,
            otherParticipant: chat.participants.find(p => !p._id.equals(userId))
        }));

        res.status(200).json({
            chats: processedChats,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalChats / limit),
                totalChats
            }
        });

    } catch (error) {
        logger.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { page = 1, limit = 50 } = req.query;
        const userId = req.user._id;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        })
        .populate('participants', 'name email profilePicture')
        .populate('messages.senderId', 'name email profilePicture')
        .select('messages metadata chatType');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Paginate messages
        const startIndex = chat.messages.length - (page * limit);
        const endIndex = startIndex + limit;
        const paginatedMessages = chat.messages.slice(
            Math.max(0, startIndex),
            Math.max(0, endIndex)
        );

        // Mark messages as read
        await Chat.updateMany(
            { _id: chatId, 'messages.readBy.userId': { $ne: userId } },
            { 
                $push: { 
                    'messages.$[].readBy': {
                        userId,
                        readAt: new Date()
                    }
                }
            }
        );

        res.status(200).json({
            messages: paginatedMessages,
            metadata: chat.metadata,
            chatType: chat.chatType,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(chat.messages.length / limit),
                totalMessages: chat.messages.length
            }
        });

    } catch (error) {
        logger.error('Error fetching chat messages:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        const chat = await Chat.findOneAndUpdate(
            {
                _id: chatId,
                participants: userId,
                'messages.readBy': { $ne: userId }
            },
            {
                $addToSet: {
                    'messages.$[].readBy': userId
                }
            },
            { new: true }
        );

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found or unauthorized' });
        }

        res.status(200).json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { chatId, messageId } = req.params;
        const userId = req.user._id;

        const chat = await Chat.findOneAndUpdate(
            {
                _id: chatId,
                participants: userId,
                'messages._id': messageId,
                'messages.sender': userId // Only message sender can delete
            },
            {
                $set: {
                    'messages.$.deleted': true,
                    'messages.$.content': 'This message was deleted'
                }
            },
            { new: true }
        );

        if (!chat) {
            return res.status(404).json({ 
                message: 'Message not found or unauthorized to delete' 
            });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { name, participants } = req.body;
        const userId = req.user._id;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found or unauthorized' });
        }

        if (name) chat.name = name;
        if (participants) {
            // Ensure current user remains in participants
            if (!participants.includes(userId)) {
                participants.push(userId);
            }
            chat.participants = participants;
        }

        await chat.save();

        res.status(200).json({
            message: 'Chat updated successfully',
            chat
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const leaveChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        const chat = await Chat.findOneAndUpdate(
            {
                _id: chatId,
                participants: userId
            },
            {
                $pull: { participants: userId }
            },
            { new: true }
        );

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found or unauthorized' });
        }

        // If no participants left, delete the chat
        if (chat.participants.length === 0) {
            await Chat.findByIdAndDelete(chatId);
            return res.status(200).json({ message: 'Chat deleted as no participants remain' });
        }

        res.status(200).json({ message: 'Left chat successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export {
    createChat,
    sendMessage,
    getChats,
    getChatMessages,
    markAsRead,
    deleteMessage,
    updateChat,
    leaveChat
}; 