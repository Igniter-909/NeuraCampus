import bcrypt from 'bcrypt';
import { College } from '../models/College.js';
import { User } from '../models/User.js';
import  logger  from '../utils/logger.js';
import { notificationService } from '../services/notificationService.js';

const createCollege = async (req, res) => {
    try {
        const {
            name,
            code,
            emailDomain,
            address,
            contact,
            logo,
            establishedYear,
            adminEmail,
            adminName,
            adminPassword,
            adminAvatar,
            adminProfile
        } = req.body;

        // Check if admin email already exists
        const existingUser = await User.findOne({ email: adminEmail });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Admin email already exists',
                error: 'Email already in use'
            });
        }

        // Create college with only essential details
        const college = new College({
            name,
            code,
            emailDomain,
            address: {
                street: address?.street,
                city: address?.city,
                state: address?.state,
                country: address?.country,
                pincode: address?.pincode
            },
            contact: {
                email: contact?.email,
                phone: contact?.phone,
                website: contact?.website
            },
            media: {
                logo: logo || '',
            },
            establishedYear,
            status: 'pending',
            subscription: {
                status: 'none',
                paymentStatus: 'none'
            },
            metadata: {
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: req.user?._id
            }
        });

        await college.save();

        // Generate default avatar if none provided
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(adminName)}&background=random`;

        // Create college admin with avatar and profile
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const collegeAdmin = new User({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'college_admin',
            college: college._id,
            collegeId: college._id,
            media: {
                avatar: {
                    url: adminAvatar || defaultAvatar,
                    publicId: '',
                    uploadedAt: new Date()
                }
            },
            profile: {
                bio: adminProfile?.bio || '',
                phone: adminProfile?.phone || '',
                dateOfBirth: adminProfile?.dateOfBirth || null,
                gender: adminProfile?.gender || 'prefer_not_to_say',
                address: {
                    street: adminProfile?.address?.street || '',
                    city: adminProfile?.address?.city || '',
                    state: adminProfile?.address?.state || '',
                    country: adminProfile?.address?.country || '',
                    pincode: adminProfile?.address?.pincode || ''
                }
            },
            status: 'active',
            lastLogin: null,
            metadata: {
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: req.user?._id
            }
        });
        
        await collegeAdmin.save();

        // Update college with admin reference
        college.adminId = collegeAdmin._id;
        college.administrators = [collegeAdmin._id];
        await college.save();

        res.status(201).json({
            message: 'College and admin created successfully',
            college
        });
    } catch (error) {
        if (error.code === 11000) {
            await College.findByIdAndDelete(college?._id);
            return res.status(400).json({ 
                message: 'Admin email already exists',
                error: 'Email already in use'
            });
        }
        
        logger.error('Error creating college:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find()
            .populate('adminId', 'name email')
            .select('-__v');
        res.status(200).json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateCollege = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const college = await College.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteCollege = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete college admin
        const college = await College.findById(id);
        if (college.adminId) {
            await User.findByIdAndDelete(college.adminId);
        }

        // Delete college
        await College.findByIdAndDelete(id);

        res.status(200).json({ message: 'College and associated admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAnalytics = async (req, res) => {
    try {
        // Get total number of colleges
        const totalColleges = await College.countDocuments();

        // Get colleges grouped by verification status
        const collegesByStatus = await College.aggregate([
            {
                $group: {
                    _id: '$verificationStatus',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get total number of users by role
        const usersByRole = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get recently added colleges
        const recentColleges = await College.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('adminId', 'name email');

        res.status(200).json({
            totalColleges,
            collegesByStatus,
            usersByRole,
            recentColleges
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching analytics', 
            error: error.message 
        });
    }
};

// Add status update function for super admin
const updateCollegeStatus = async (req, res) => {
    try {
        const { collegeId } = req.params;
        const { status, statusReason } = req.body;

        if (!['active', 'inactive', 'suspended', 'pending'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid status value'
            });
        }

        const college = await College.findById(collegeId);
        if (!college) {
            return res.status(404).json({
                message: 'College not found'
            });
        }

        college.status = status;
        college.statusReason = statusReason;
        college.statusChangedAt = new Date();
        college.statusChangedBy = req.user._id;

        await college.save();

        res.status(200).json({
            message: 'College status updated successfully',
            college
        });
    } catch (error) {
        logger.error('Error updating college status:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get colleges with filtering by status
const getColleges = async (req, res) => {
    try {
        const { 
            status, 
            subscriptionStatus, 
            page = 1, 
            limit = 20,
            search,
            sortBy = 'name',
            order = 'asc'
        } = req.query;
        
        // Build query
        const query = {};
        
        if (status) {
            query.status = status;
        }
        
        if (subscriptionStatus) {
            query['subscription.status'] = subscriptionStatus;
        }
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Count total matching documents
        const totalColleges = await College.countDocuments(query);
        
        // Get paginated results
        const colleges = await College.find(query)
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('administrators', 'name email')
            .select('-__v');
        
        res.status(200).json({
            colleges,
            pagination: {
                total: totalColleges,
                page: parseInt(page),
                pages: Math.ceil(totalColleges / limit)
            }
        });
        
    } catch (error) {
        logger.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get college by ID
const getCollegeById = async (req, res) => {
  try {
    const { collegeId } = req.params;
    
    // Find college by ID with populated fields
    const college = await College.findById(collegeId)
      .populate('administrators', 'name email profilePicture')
      .populate({
        path: 'departments',
        select: 'name code',
        populate: {
          path: 'hod',
          select: 'name email'
        }
      });
    
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    
    // Get additional statistics
    const stats = {
      totalStudents: await User.countDocuments({ 
        collegeId, 
        role: 'student',
        status: 'active'
      }),
      totalFaculty: await User.countDocuments({ 
        collegeId, 
        role: 'faculty',
        status: 'active'
      }),
      totalDepartments: college.departments.length,
      activeUsers: await User.countDocuments({ 
        collegeId, 
        status: 'active' 
      }),
      inactiveUsers: await User.countDocuments({ 
        collegeId, 
        status: 'inactive' 
      })
    };
    
    // Format subscription data
    const subscriptionInfo = {
      plan: college.subscription.plan,
      status: college.subscription.status,
      paymentStatus: college.subscription.paymentStatus,
      startDate: college.subscription.startDate,
      endDate: college.subscription.endDate,
      lastPaymentDate: college.subscription.lastPaymentDate,
      nextPaymentDue: college.subscription.nextPaymentDue,
      daysRemaining: college.subscription.endDate ? 
        Math.max(0, Math.ceil((new Date(college.subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24))) : 
        0
    };
    
    // Format status history if needed
    const statusInfo = {
      current: college.status,
      reason: college.statusReason,
      changedAt: college.statusChangedAt,
      changedBy: college.statusChangedBy
    };
    
    // Return formatted response
    res.status(200).json({
      college: {
        id: college._id,
        name: college.name,
        code: college.code,
        address: college.address,
        contact: college.contact,
        logo: college.logo,
        establishedYear: college.establishedYear,
        accreditations: college.accreditations,
        administrators: college.administrators,
        departments: college.departments,
        status: statusInfo,
        subscription: subscriptionInfo,
        metadata: {
          createdAt: college.metadata.createdAt,
          updatedAt: college.metadata.updatedAt,
          createdBy: college.metadata.createdBy
        }
      },
      stats
    });
    
  } catch (error) {
    logger.error('Error fetching college details:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
            .populate('college', 'name code emailDomain logo')
            .populate('department', 'name code')
            .select('-password -__v')
            .lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
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

const getUsers = async (req, res) => {
    try {
        const { 
            role,
            collegeId,
            departmentId,
            page = 1, 
            limit = 20,
            search,
            sortBy = 'name',
            order = 'asc'
        } = req.query;

        // Build query
        const query = {};

        if (role) {
            query.role = role;
        }

        if (collegeId) {
            query.college = collegeId;
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
            .populate('college', 'name code emailDomain logo')
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

export
{
    getAllColleges,
    getColleges,
    getCollegeById,
    updateCollegeStatus,
    getAnalytics,
    createCollege,
    deleteCollege,
    updateCollege,
    getUser,
    getUsers
}