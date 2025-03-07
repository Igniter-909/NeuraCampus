import {User} from '../models/User.js';

export const isSuperAdmin = async (req, res, next) => {
    // console.log("req.user", req.user);
    try {
        const user = await User.findById(req.user.userId);
        console.log("user", user);
        if (user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Access denied. Super Admin only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
};

export const isCollegeAdmin = async (req, res, next) => {
    try {
        // console.log("req.user", req.user);
        const user = await User.findById(req?.user?.userId);
        // console.log("user", user);
        if (user.role !== 'college_admin') {
            return res.status(403).json({ message: 'Access denied. College Admin only.' });
        }
        // console.log("user1111");
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
};

export const isTeacher = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'teacher') {
            return res.status(403).json({ message: 'Access denied. Teacher only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
};

export const isClerk = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'clerk') {
            return res.status(403).json({ message: 'Access denied. Clerk only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
};

export const isStudent = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied. Student only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
};

export const isHOD = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'hod') {
            return res.status(403).json({ message: 'Access denied. HOD only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
};

export const isRecruiter = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'recruiter') {
            return res.status(403).json({ message: 'Access denied. Recruiter only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
};

export const canManageBatchTransition = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const allowedRoles = ['superadmin', 'college_admin', 'hod', 'clerk'];
        
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ 
                message: 'Access denied. Only Super Admin, College Admin, HOD, or Clerk can manage batch transitions.' 
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking role', error: error.message });
    }
}; 