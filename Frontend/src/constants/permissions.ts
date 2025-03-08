import { Role } from '@/types/roles';

export const PERMISSIONS = {
  // User Management
  USER: {
    CREATE: 'user:create',
    READ: 'user:read',
    UPDATE: 'user:update',
    DELETE: 'user:delete',
    MANAGE_ROLES: 'user:manage_roles',
  },

  // Department Management
  DEPARTMENT: {
    CREATE: 'department:create',
    READ: 'department:read',
    UPDATE: 'department:update',
    DELETE: 'department:delete',
    MANAGE_FACULTY: 'department:manage_faculty',
    MANAGE_STUDENTS: 'department:manage_students',
  },

  // Course Management
  COURSE: {
    CREATE: 'course:create',
    READ: 'course:read',
    UPDATE: 'course:update',
    DELETE: 'course:delete',
    ASSIGN_FACULTY: 'course:assign_faculty',
    MANAGE_ENROLLMENT: 'course:manage_enrollment',
  },

  // Academic Management
  ACADEMIC: {
    MANAGE_TIMETABLE: 'academic:manage_timetable',
    MARK_ATTENDANCE: 'academic:mark_attendance',
    VIEW_ATTENDANCE: 'academic:view_attendance',
    MANAGE_GRADES: 'academic:manage_grades',
    VIEW_GRADES: 'academic:view_grades',
    MANAGE_EXAMS: 'academic:manage_exams',
  },

  // Placement Management
  PLACEMENT: {
    POST_JOBS: 'placement:post_jobs',
    MANAGE_APPLICATIONS: 'placement:manage_applications',
    VIEW_JOBS: 'placement:view_jobs',
    APPLY_JOBS: 'placement:apply_jobs',
    SCHEDULE_INTERVIEWS: 'placement:schedule_interviews',
  },

  // Communication
  COMMUNICATION: {
    SEND_ANNOUNCEMENTS: 'communication:send_announcements',
    MANAGE_NOTIFICATIONS: 'communication:manage_notifications',
    SEND_MESSAGES: 'communication:send_messages',
  },

  // Reports & Analytics
  REPORTS: {
    VIEW_ANALYTICS: 'reports:view_analytics',
    GENERATE_REPORTS: 'reports:generate_reports',
    EXPORT_DATA: 'reports:export_data',
  },

  // System Settings
  SETTINGS: {
    MANAGE_SYSTEM: 'settings:manage_system',
    CONFIGURE_ROLES: 'settings:configure_roles',
    MANAGE_PERMISSIONS: 'settings:manage_permissions',
  },
} as const;

export type Permission = '*' | 'college:manage' | 'department:manage' | 'faculty:manage' | 
  'course:manage' | 'attendance:manage' | 'student:view' | 'attendance:view' | 
  'placement:manage' | 'course:view';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: ['*'],
  COLLEGE_ADMIN: ['college:manage', 'department:manage'],
  HOD: ['department:manage', 'faculty:manage'],
  FACULTY: ['course:manage', 'attendance:manage'],
  CLERK: ['student:view', 'attendance:view'],
  STUDENT: ['course:view', 'attendance:view'],
  RECRUITER: ['student:view', 'placement:manage']
} as const; 