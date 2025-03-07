import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const verifyToken = async (req, res, next) => {
    try {
        // console.log("req.headers", req.headers);
        let token = req.header('Authorization');
        // console.log("token", token);
        
        // Remove "Bearer " prefix if it exists
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        
        // Check for token in cookies if not in header
        if (!token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid', error: error.message });
    }
};

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. ${roles.join(' or ')} role required.` 
            });
        }
        next();
    };
};

export const collegeAccess = async (req, res, next) => {
    try {
        const { collegeId } = req.params;
        if (req.user.college.toString() !== collegeId) {
            return res.status(403).json({ 
                message: 'Unauthorized access to college resources' 
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}; 