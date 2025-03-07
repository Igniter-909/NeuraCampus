import { Branch } from '../models/Branch.js';
import { User } from '../models/User.js';
import { College } from '../models/College.js';
import bcrypt from 'bcrypt';
import { sendVerificationStatusEmail } from '../utils/emailService.js';
import logger from '../utils/logger.js';
import CollegeDocument from '../models/CollegeDocument.js';


export const createBranch = async (req, res) => {
    try {
        const { name, code, totalSemesters, hodEmail } = req.body;
        const collegeId = req.user.college;

        // Create HOD user if email provided
        let hodId = null;
        if (hodEmail) {
            const password = Math.random().toString(36).slice(-8); // Generate random password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const hod = new User({
                email: hodEmail,
                password: hashedPassword,
                role: 'hod',
                college: collegeId
            });
            await hod.save();
            hodId = hod._id;

            // TODO: Send email to HOD with credentials
        }

        const branch = new Branch({
            name,
            code,
            collegeId,
            hodId,
            totalSemesters
        });

        await branch.save();

        res.status(201).json({
            message: 'Branch created successfully',
            branch
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const createTeacher = async (req, res) => {
    try {
        const { name, email, branchId, subjects } = req.body;
        const collegeId = req.user.college;

        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, 10);

        const teacher = new User({
            name,
            email,
            password: hashedPassword,
            role: 'teacher',
            college: collegeId,
            branch: branchId
        });

        await teacher.save();

        // Assign teacher to subjects if provided
        if (subjects && subjects.length > 0) {
            await Subject.updateMany(
                { _id: { $in: subjects } },
                { $push: { teachers: teacher._id } }
            );
        }

        // TODO: Send email to teacher with credentials

        res.status(201).json({
            message: 'Teacher created successfully',
            teacher: {
                id: teacher._id,
                name: teacher.name,
                email: teacher.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getCollegeStats = async (req, res) => {
    try {
        const collegeId = req.user.college;

        const stats = await College.aggregate([
            { $match: { _id: collegeId } },
            {
                $lookup: {
                    from: 'branches',
                    localField: '_id',
                    foreignField: 'collegeId',
                    as: 'branches'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'college',
                    as: 'users'
                }
            },
            {
                $project: {
                    totalBranches: { $size: '$branches' },
                    totalStudents: {
                        $size: {
                            $filter: {
                                input: '$users',
                                as: 'user',
                                cond: { $eq: ['$$user.role', 'student'] }
                            }
                        }
                    },
                    totalTeachers: {
                        $size: {
                            $filter: {
                                input: '$users',
                                as: 'user',
                                cond: { $eq: ['$$user.role', 'teacher'] }
                            }
                        }
                    }
                }
            }
        ]);

        res.status(200).json(stats[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateEmailSettings = async (req, res) => {
    try {
        const {
            emailDomain,
            alumniEmailDomains,
            verificationSettings
        } = req.body;
        const collegeId = req.user.college;

        const college = await College.findByIdAndUpdate(
            collegeId,
            {
                emailDomain,
                alumniEmailDomains,
                verificationSettings
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Email settings updated successfully',
            college
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const verifyAlumni = async (req, res) => {
    try {
        const { userId, verificationStatus, remarks } = req.body;
        const collegeId = req.user.college;

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                college: collegeId,
                userType: 'alumni'
            },
            {
                verificationStatus,
                'verification.remarks': remarks,
                'verification.verifiedBy': req.user._id,
                'verification.verifiedAt': new Date()
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found or unauthorized'
            });
        }

        // Send email notification to alumni about verification status
        await sendVerificationStatusEmail(user, verificationStatus);

        res.status(200).json({
            message: 'Alumni verification status updated',
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const collegeAdmin = await User.findById(req.user.id);

        const newBranch = new Branch({
            name,
            description,
            collegeId: collegeAdmin.college
        });

        await newBranch.save();

        res.status(201).json({
            message: 'Branch created successfully',
            branch: newBranch
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating branch',
            error: error.message
        });
    }
};

export const getDepartments = async (req, res) => {
    try {
        // console.log("req.user", req.user);
        const collegeAdmin = await User.findById(req.user.userId);

        const branches = await Branch.find({ collegeId: collegeAdmin.college });
        console.log("branches", branches);
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching branches',
            error: error.message
        });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const collegeAdmin = await User.findById(req.user.id);

        const branch = await Branch.findOne({
            _id: id,
            collegeId: collegeAdmin.college
        });

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        branch.name = name || branch.name;
        branch.description = description || branch.description;

        await branch.save();

        res.status(200).json({
            message: 'Branch updated successfully',
            branch
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating branch',
            error: error.message
        });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const collegeAdmin = await User.findById(req.user.id);

        const branch = await Branch.findOneAndDelete({
            _id: id,
            collegeId: collegeAdmin.college
        });

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        res.status(200).json({
            message: 'Branch deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting branch',
            error: error.message
        });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await User.find({
            college: req.user.college,
            role: 'student'
        }).select('-password');

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({
            college: req.user.college,
            role: 'teacher'
        }).select('-password');

        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers', error: error.message });
    }
};

export const getClerks = async (req, res) => {
    try {
        const clerks = await User.find({
            college: req.user.college,
            role: 'clerk'
        }).select('-password');

        res.status(200).json(clerks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clerks', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        // Remove sensitive fields from update data
        delete updateData.password;
        delete updateData.role;
        delete updateData.college;

        const user = await User.findOneAndUpdate(
            { _id: userId, college: req.user.college },
            updateData,
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await User.findOneAndDelete({
            _id: userId,
            college: req.user.college
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const collegeId = req.user.college;

        // Get total counts
        const totalStudents = await User.countDocuments({ 
            college: collegeId, 
            role: 'student' 
        });

        const totalTeachers = await User.countDocuments({ 
            college: collegeId, 
            role: 'teacher' 
        });

        const totalBranches = await Branch.countDocuments({ 
            collegeId: collegeId 
        });

        // Get recent users
        const recentUsers = await User.find({ 
            college: collegeId,
            role: { $in: ['student', 'teacher'] }
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email role createdAt');

        // Get branches with student count
        const branchStats = await Branch.aggregate([
            { $match: { collegeId: collegeId } },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'branch',
                    as: 'students'
                }
            },
            {
                $project: {
                    name: 1,
                    studentCount: {
                        $size: {
                            $filter: {
                                input: '$students',
                                as: 'student',
                                cond: { $eq: ['$$student.role', 'student'] }
                            }
                        }
                    }
                }
            }
        ]);

        res.status(200).json({
            stats: {
                totalStudents,
                totalTeachers,
                totalBranches
            },
            recentUsers,
            branchStats
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching dashboard stats', 
            error: error.message 
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const collegeId = req.user.college; // Get college ID from authenticated admin

        const user = await User.findOne({ 
            _id: userId,
            college: collegeId // Ensure user belongs to admin's college
        })
            .populate('department', 'name code')
            .populate('college', 'name code emailDomain logo')
            .select('-password -__v')
            .lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found or not authorized to view this user'
            });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user
        });

    } catch (error) {
        logger.error('Error fetching user:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message 
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const { 
            role,
            departmentId,
            page = 1, 
            limit = 20,
            search,
            sortBy = 'name',
            order = 'asc'
        } = req.query;

        // Build query with college restriction
        const query = {
            college: req.user.college // Only get users from admin's college
        };

        if (role) {
            query.role = role;
        }

        if (departmentId) {
            query.department = departmentId;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        // Count total matching documents
        const totalUsers = await User.countDocuments(query);

        // Get paginated results
        const users = await User.find(query)
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('department', 'name code')
            .select('-password -__v')
            .lean();

        res.status(200).json({
            users,
            pagination: {
                total: totalUsers,
                page: parseInt(page),
                pages: Math.ceil(totalUsers / limit)
            }
        });

    } catch (error) {
        logger.error('Error fetching users:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message 
        });
    }
};

export const updateCollegeProfile = async (req, res) => {
    try {
        const collegeId = req.user.college; // Get college ID from authenticated admin
        const {
            basicInfo,
            about,
            socialMedia,
            verificationSettings,
            coverImage,
            accreditations,
            rankings,
            academics
        } = req.body;

        const college = await College.findById(collegeId);
        if (!college) {
            return res.status(404).json({
                message: 'College not found'
            });
        }

        // Update only allowed fields
        if (basicInfo) {
            college.basicInfo = {
                ...college.basicInfo,
                ...basicInfo
            };
        }

        if (about) {
            college.about = {
                ...college.about,
                ...about
            };
        }

        if (socialMedia) {
            college.socialMedia = {
                ...college.socialMedia,
                ...socialMedia
            };
        }

        if (verificationSettings) {
            college.verificationSettings = {
                ...college.verificationSettings,
                ...verificationSettings
            };
        }

        if (coverImage) {
            college.media.coverImage = coverImage;
        }

        if (accreditations) {
            college.accreditations = accreditations;
        }

        if (rankings) {
            college.rankings = rankings;
        }

        if (academics) {
            college.academics = {
                ...college.academics,
                ...academics
            };
        }

        college.metadata.updatedAt = new Date();
        await college.save();

        res.status(200).json({
            message: 'College profile updated successfully',
            college
        });
    } catch (error) {
        logger.error('Error updating college profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Add document management
export const addCollegeDocument = async (req, res) => {
    try {
        const newDocument = new CollegeDocument({
            collegeId: req.user.collegeId,
            title: req.body.title,
            documentUrl: req.body.documentUrl,
            documentType: req.body.documentType,
            description: req.body.description
        });
        
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error adding document', error: error.message });
    }
};

// Get all college documents
export const getCollegeDocuments = async (req, res) => {
    try {
        const documents = await CollegeDocument.find({ collegeId: req.user.collegeId });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
};

// Delete college document
export const deleteCollegeDocument = async (req, res) => {
    try {
        const document = await CollegeDocument.findOneAndDelete({
            _id: req.params.documentId,
            collegeId: req.user.collegeId
        });
        
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
};

// Get college profile
export const getCollegeProfile = async (req, res) => {
    try {
        const college = await College.findById(req.user.collegeId);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching college profile', error: error.message });
    }
};


