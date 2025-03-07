import { Subject } from '../models/Subject.js';
import  Attendance  from '../models/Attendance.js';
import  Resource  from '../models/Resource.js';
import { uploadFile } from '../utils/fileUpload.js';
import { Schedule } from '../models/Schedule.js';

export const getAssignedSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({
            teachers: req.user._id
        }).populate('branch', 'name');

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const uploadResource = async (req, res) => {
    try {
        const { subjectId, title, description, type } = req.body;
        const file = req.file;

        // Verify teacher is assigned to subject
        const subject = await Subject.findOne({
            _id: subjectId,
            teachers: req.user._id
        });

        if (!subject) {
            return res.status(403).json({ message: 'Unauthorized access to subject' });
        }

        const fileUrl = await uploadFile(file);

        const resource = new Resource({
            title,
            type,
            subject: subjectId,
            branch: subject.branch,
            semester: subject.semester,
            fileUrl,
            description,
            uploadedBy: req.user._id
        });

        await resource.save();

        // Add resource to subject
        subject.resources.push(resource._id);
        await subject.save();

        res.status(201).json({
            message: 'Resource uploaded successfully',
            resource
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAttendanceReport = async (req, res) => {
    try {
        const { subjectId, startDate, endDate } = req.query;

        const attendance = await Attendance.aggregate([
            {
                $match: {
                    subject: mongoose.Types.ObjectId(subjectId),
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: '$studentId',
                    totalClasses: { $sum: 1 },
                    present: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'present'] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const markAttendance = async (req, res) => {
    try {
        const { subjectId, studentIds, status, date } = req.body;

        // Verify teacher is assigned to subject
        const subject = await Subject.findOne({
            _id: subjectId,
            teachers: req.user._id
        });

        if (!subject) {
            return res.status(403).json({ message: 'Unauthorized access to subject' });
        }

        // Create attendance records for each student
        const attendanceRecords = studentIds.map(studentId => ({
            subject: subjectId,
            studentId,
            date: new Date(date),
            status,
            markedBy: req.user._id
        }));

        await Attendance.insertMany(attendanceRecords);

        res.status(201).json({
            message: 'Attendance marked successfully',
            count: attendanceRecords.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error marking attendance',
            error: error.message
        });
    }
};

export const getSchedule = async (req, res) => {
    try {
        const teacherId = req.user._id;
        
        // Get the teacher's schedule for the entire week
        const schedule = await Schedule.find({
            teacher: teacherId
        })
        .populate('subject', 'name code')
        .populate('branch', 'name')
        .populate('semester', 'name')
        .sort({ dayOfWeek: 1, startTime: 1 });

        // Organize schedule by day of week
        const weeklySchedule = {
            Monday: schedule.filter(s => s.dayOfWeek === 1),
            Tuesday: schedule.filter(s => s.dayOfWeek === 2),
            Wednesday: schedule.filter(s => s.dayOfWeek === 3),
            Thursday: schedule.filter(s => s.dayOfWeek === 4),
            Friday: schedule.filter(s => s.dayOfWeek === 5),
            Saturday: schedule.filter(s => s.dayOfWeek === 6)
        };

        res.status(200).json({
            message: 'Schedule retrieved successfully',
            weeklySchedule,
            todaySchedule: schedule.filter(s => s.dayOfWeek === new Date().getDay())
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching schedule',
            error: error.message
        });
    }
};
