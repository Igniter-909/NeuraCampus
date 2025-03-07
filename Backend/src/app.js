import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { connectDB } from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import logger from './utils/logger.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import './config/passport.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());

// Routes
app.use('/api', routes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app; 