import dotenv from 'dotenv';
import app from './app.js';
import logger from './utils/logger.js';
import { createWebSocketServer } from './utils/WebSocket.js';
import events from 'events';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Increase the listener limit
events.EventEmitter.defaultMaxListeners = 15;

const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Initialize WebSocket server
createWebSocketServer(server);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
}); 