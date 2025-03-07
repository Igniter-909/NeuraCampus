import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Custom log format
const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Custom console format for development
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
    )
);

// Define log directory
const logDir = 'logs';

// Transport for daily rotate file
const dailyRotateFileTransport = new DailyRotateFile({
    filename: path.join(logDir, '%DATE%-combined.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

// Transport for error logs
const errorFileTransport = new DailyRotateFile({
    filename: path.join(logDir, '%DATE%-error.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error'
});

// Create the logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports: [
        dailyRotateFileTransport,
        errorFileTransport
    ]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleFormat,
        level: 'debug'
    }));
}

// Create a stream object for Morgan
logger.stream = {
    write: (message) => logger.info(message.trim())
};

// Add custom logging methods
logger.success = (message) => {
    logger.info({ level: 'success', message });
};

logger.database = (message) => {
    logger.info({ level: 'database', message });
};

logger.security = (message, metadata = {}) => {
    logger.warn({
        level: 'security',
        message,
        ...metadata
    });
};

logger.audit = (userId, action, details) => {
    logger.info({
        level: 'audit',
        userId,
        action,
        details,
        timestamp: new Date()
    });
};

// Error logging with request context
logger.logError = (err, req = null) => {
    const errorLog = {
        message: err.message,
        stack: err.stack,
        timestamp: new Date()
    };

    if (req) {
        errorLog.requestInfo = {
            method: req.method,
            url: req.url,
            headers: req.headers,
            query: req.query,
            body: req.body,
            userId: req.user ? req.user._id : null
        };
    }

    logger.error(errorLog);
};

// Performance logging
logger.performance = (action, timeInMs) => {
    logger.info({
        level: 'performance',
        action,
        duration: timeInMs,
        timestamp: new Date()
    });
};

// API request logging
logger.apiRequest = (req, res, duration) => {
    logger.info({
        level: 'api',
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration,
        userId: req.user ? req.user._id : null,
        timestamp: new Date()
    });
};

export default logger; 