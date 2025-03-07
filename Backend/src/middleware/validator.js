import { validationResult, body, param, query } from 'express-validator';

export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation Error',
                errors: errors.array()
            });
        }
        next();
    };
};

export const authValidations = {
    login: [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 })
    ],
    register: [
        body('name').trim().notEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
        body('role').isIn(['student', 'teacher', 'hod', 'clerk', 'recruiter'])
    ]
};

export const profileValidations = {
    update: [
        body('skills').optional().isArray(),
        body('projects').optional().isArray(),
        body('experience').optional().isArray(),
        body('education.cgpa').optional().isFloat({ min: 0, max: 10 })
    ]
};

export const jobValidations = {
    create: [
        body('title').trim().notEmpty(),
        body('type').isIn(['internship', 'full-time', 'part-time']),
        body('description').trim().notEmpty(),
        body('requirements.skills').isArray(),
        body('location').trim().notEmpty(),
        body('applicationDeadline').isISO8601()
    ]
};

export const attendanceValidations = {
    verify: [
        body('classId').isMongoId(),
        body('frequencyCode').notEmpty(),
        body('location').optional().isObject()
    ]
};

export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

export const validateRegistration = [
    body('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .isIn(['student', 'teacher', 'college_admin', 'clerk'])
        .withMessage('Invalid role specified')
]; 