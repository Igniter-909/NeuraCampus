import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
}); 