import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

const createWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });
    const clients = new Map();

    wss.on('connection', (ws, req) => {
        handleConnection(ws, req, clients);
    });

    return {
        sendToUser: (userId, data) => {
            const client = clients.get(userId);
            if (client && client.readyState === WebSocketServer.OPEN) {
                client.send(JSON.stringify(data));
            }
        },
        broadcastToRole: (role, data, excludeUserId = null) => {
            clients.forEach((ws, userId) => {
                if (userId !== excludeUserId && ws.readyState === WebSocketServer.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            });
        }
    };
};

const handleConnection = (ws, req, clients) => {
    const token = req.url.split('token=')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        clients.set(userId, ws);

        ws.on('message', (message) => {
            handleMessage(userId, message, clients);
        });

        ws.on('close', () => {
            clients.delete(userId);
        });

        ws.send(JSON.stringify({
            type: 'connection',
            status: 'success'
        }));

    } catch (error) {
        ws.close();
    }
};

const handleMessage = (userId, message, clients) => {
    try {
        const data = JSON.parse(message);
        
        switch (data.type) {
            case 'chat':
                handleChatMessage(userId, data, clients);
                break;
            case 'attendance':
                handleAttendanceVerification(userId, data, clients);
                break;
            case 'notification_ack':
                handleNotificationAcknowledgement(userId, data);
                break;
        }
    } catch (error) {
        console.error('WebSocket message handling error:', error);
    }
};

export { createWebSocketServer, handleConnection, handleMessage };

