export const ROLES = {
  superadmin: 'superadmin',
  college_admin: 'college_admin',
  hod: 'hod',
  teacher: 'teacher',
  clerk: 'clerk',
  student: 'student',
  recruiter: 'recruiter',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  superadmin: [
    ROLES.superadmin,
    ROLES.college_admin,
    ROLES.hod,
    ROLES.teacher,
    ROLES.clerk,
    ROLES.student,
    ROLES.recruiter,
  ],
  college_admin: [
    ROLES.college_admin,
    ROLES.hod,
    ROLES.teacher,
    ROLES.clerk,
    ROLES.student,
  ],
  hod: [ROLES.hod, ROLES.teacher, ROLES.clerk, ROLES.student],
  teacher: [ROLES.teacher, ROLES.student],
  clerk: [ROLES.clerk, ROLES.student],
  student: [ROLES.student],
  recruiter: [ROLES.recruiter],
};

export const ROLE_LABELS: Record<Role, string> = {
  superadmin: 'Super Administrator',
  college_admin: 'College Administrator',
  hod: 'Head of Department',
  teacher: 'Faculty Member',
  clerk: 'Administrative Clerk',
  student: 'Student',
  recruiter: 'Recruiter',
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  superadmin: 'Full system access and control',
  college_admin: 'Manage college-wide operations and departments',
  hod: 'Oversee department operations and faculty',
  teacher: 'Manage courses and student academics',
  clerk: 'Handle administrative tasks and records',
  student: 'Access courses and academic information',
  recruiter: 'Manage job postings and placements',
};

export const DEFAULT_ROLE = ROLES.student;

export function isRoleAtLeast(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole].includes(requiredRole);
}

export function canManageRole(userRole: Role, targetRole: Role): boolean {
  return ROLE_HIERARCHY[userRole].includes(targetRole) && userRole !== targetRole;
}

export const ROLE_DISPLAY_NAMES = {
  superadmin: 'Super Administrator',
  college_admin: 'College Administrator',
  hod: 'Head of Department',
  teacher: 'Faculty Member',
  clerk: 'Clerk',
  student: 'Student',
  recruiter: 'Recruiter'
} as const;
