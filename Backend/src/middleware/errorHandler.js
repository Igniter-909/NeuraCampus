import logger from '../utils/logger.js';

export const errorHandler = async (err, req, res, next) => {
    const errorResponse = {
        message: err.message || 'Internal server error',
        status: err.status || 500,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };

    // Log error
    logger.error({
        error: err,
        requestId: req.id,
        path: req.path,
        user: req.user?.id
    });

    // Custom error handling based on error types
    if (err.name === 'ValidationError') {
        errorResponse.status = 400;
        errorResponse.message = 'Validation Error';
        errorResponse.details = Object.values(err.errors).map(e => e.message);
    }

    if (err.name === 'JsonWebTokenError') {
        errorResponse.status = 401;
        errorResponse.message = 'Invalid token';
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        errorResponse.status = 409;
        errorResponse.message = 'Duplicate entry found';
    }

    res.status(errorResponse.status).json(errorResponse);
};

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
}; 