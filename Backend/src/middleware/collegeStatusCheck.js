import { College } from '../models/College.js';
import logger from '../utils/logger.js';

// Middleware to check if college is active
export const isCollegeActive = async (req, res, next) => {
  try {
    // Skip for super admin
    if (req.user.role === 'super-admin') {
      return next();
    }
    
    // Get college ID from user
    const collegeId = req.user.collegeId;
    
    if (!collegeId) {
      return res.status(403).json({ message: 'College not assigned' });
    }
    
    // Check college status
    const college = await College.findById(collegeId);
    
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    
    if (college.status !== 'active') {
      logger.warn(`Access denied: College ${college.name} is ${college.status}`);
      return res.status(403).json({ 
        message: `Access denied. Your institution is currently ${college.status}.`,
        status: college.status,
        reason: college.statusReason || 'Contact your administrator for more information.'
      });
    }
    
    // College is active, proceed
    next();
    
  } catch (error) {
    logger.error('Error checking college status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 