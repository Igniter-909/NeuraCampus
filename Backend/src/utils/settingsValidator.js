export const validateSettings = (settings) => {
    const errors = [];

    // Validate permissions
    if (settings.permissions) {
        for (const role in settings.permissions) {
            const rolePermissions = settings.permissions[role];
            
            // Validate specific permissions based on role
            if (role === 'students') {
                if (rolePermissions.maxProjectsAllowed < 0) {
                    errors.push('Maximum projects allowed cannot be negative');
                }
            }
        }
    }

    // Validate features
    if (settings.features) {
        if (settings.features.attendance) {
            const { requiredPercentage } = settings.features.attendance;
            if (requiredPercentage < 0 || requiredPercentage > 100) {
                errors.push('Attendance percentage must be between 0 and 100');
            }
        }

        if (settings.features.recruitment) {
            const { minCGPARequired } = settings.features.recruitment;
            if (minCGPARequired < 0 || minCGPARequired > 10) {
                errors.push('Minimum CGPA must be between 0 and 10');
            }
        }
    }

    // Validate security settings
    if (settings.security) {
        const { passwordPolicy } = settings.security;
        if (passwordPolicy) {
            if (passwordPolicy.minLength < 6) {
                errors.push('Minimum password length should be at least 6 characters');
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}; 