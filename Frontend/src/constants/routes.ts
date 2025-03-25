import { NavigationItem } from '@/components/forms/layouts/Siderbar';

export const ROUTES = {
  // Auth Routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },

  // Dashboard Routes
  DASHBOARD: {
    root: '/',
    superadmin: '/dashboard/super-admin',
    college_admin: '/dashboard/college-admin',
    hod: '/dashboard/hod',
    teacher: '/dashboard/teacher',
    clerk: '/dashboard/clerk',
    student: '/dashboard/student',
    recruiter: '/dashboard/recruiter',
  },

  // User Management
  USERS: {
    PROFILE: '/profile',
    SETTINGS: '/settings',
    NOTIFICATIONS: '/notifications',
  },

  // Department Management
  DEPARTMENTS: {
    LIST: '/departments',
    CREATE: '/departments/create',
    EDIT: (id: string) => `/departments/${id}/edit`,
    VIEW: (id: string) => `/departments/${id}`,
  },

  // Course Management
  COURSES: {
    LIST: '/courses',
    CREATE: '/courses/create',
    EDIT: (id: string) => `/courses/${id}/edit`,
    VIEW: (id: string) => `/courses/${id}`,
    ENROLLMENT: '/courses/enrollment',
  },

  // Academic Management
  ACADEMICS: {
    TIMETABLE: '/academics/timetable',
    ATTENDANCE: '/academics/attendance',
    GRADES: '/academics/grades',
    EXAMS: '/academics/exams',
    ASSIGNMENTS: '/academics/assignments',
  },

  // Placement Management
  PLACEMENT: {
    JOBS: '/placement/jobs',
    APPLICATIONS: '/placement/applications',
    INTERVIEWS: '/placement/interviews',
    STATISTICS: '/placement/statistics',
  },

  // Communication
  COMMUNICATION: {
    ANNOUNCEMENTS: '/communication/announcements',
    MESSAGES: '/communication/messages',
    CHAT: '/communication/chat',
  },

  // Reports
  REPORTS: {
    ANALYTICS: '/reports/analytics',
    ACADEMIC: '/reports/academic',
    ATTENDANCE: '/reports/attendance',
    PLACEMENT: '/reports/placement',
  },

  // Settings
  SETTINGS: {
    GENERAL: '/settings/general',
    SECURITY: '/settings/security',
    NOTIFICATIONS: '/settings/notifications',
  },
} as const;

export const ROLE_DEFAULT_ROUTES: Record<string, string> = {
  SUPER_ADMIN: ROUTES.DASHBOARD.superadmin,
  COLLEGE_ADMIN: ROUTES.DASHBOARD.college_admin,
  HOD: ROUTES.DASHBOARD.hod,
  FACULTY: ROUTES.DASHBOARD.teacher,
  CLERK: ROUTES.DASHBOARD.clerk,
  STUDENT: ROUTES.DASHBOARD.student,
  RECRUITER: ROUTES.DASHBOARD.recruiter,
};

export const PUBLIC_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
];

export function isPublicRoute(path: (typeof PUBLIC_ROUTES)[number]): boolean {
  return PUBLIC_ROUTES.includes(path);
}

export function getDefaultRouteForRole(role: string): string {
  return ROLE_DEFAULT_ROUTES[role] ;
}

export type AppRoute = typeof ROUTES;

export const ROLE_DASHBOARD_ROUTES = {
  'superadmin': 'dashboard/super-admin',
  'college_admin': 'dashboard/college-admin',
  'hod': 'dashboard/hod',
  'clerk': 'dashboard/clerk',
  'teacher': 'dashboard/teacher',
  'student': 'dashboard/student',
  'recruiter': 'dashboard/recruiter'
} as const;

// Update the UserRole type to match backend exactly
export type UserRole = 'superadmin' | 'college_admin' | 'hod' | 'clerk' | 'teacher' | 'student' | 'recruiter';

export const NAVIGATION_ROUTES: Record<string, NavigationItem[]> = {
  superadmin: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD.superadmin, icon: 'dashboard' },
    { label: 'Institutions', path: 'dashboard/super-admin/institutions', icon: 'institutions' },
    { label: 'Users', path: 'dashboard/super-admin/users', icon: 'users' },
    { label: 'Colleges', path: 'dashboard/super-admin/colleges', icon: 'colleges' },
    { label: 'Settings', path: ROUTES.SETTINGS.GENERAL, icon: 'settings' }
  ],
  college_admin: [
    { label: 'Profile', path: 'dashboard/college-admin/profile', icon: 'users' },
    { label: 'Dashboard', path: ROUTES.DASHBOARD.college_admin, icon: 'dashboard' },
    { label: 'Departments', path: 'dashboard/college-admin/departments', icon: 'departments' },
    { label: 'Faculty', path: 'dashboard/college-admin/faculty', icon: 'faculty' },
    { label: 'Students', path: 'dashboard/college-admin/students', icon: 'user2' }
  ],
  hod: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD.hod, icon: 'dashboard' },
    { label: 'Department', path: 'dashboard/hod/department', icon: 'departments' },
    { label: 'Courses', path: ROUTES.COURSES.LIST, icon: 'courses' },
    { label: 'Faculty', path: 'dashboard/hod/faculty', icon: 'faculty' }
  ],
  teacher: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD.teacher, icon: 'dashboard' },
    { label: 'Courses', path: ROUTES.COURSES.LIST, icon: 'courses' },
    { label: 'Students', path: 'dashboard/teacher/students', icon: 'users' },
    { label: 'Attendance', path: 'dashboard/teacher/attendance', icon: 'attendance' },
    { label: 'Community', path: 'dashboard/teacher/community', icon: 'community' }
  ],
  student: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD.student, icon: 'dashboard' },

    { label: 'Courses', path: 'student/courses', icon: 'courses' },
    { label: 'Attendance', path: 'student/academics/attendance', icon: 'attendance' },
    { label: 'Grades', path: 'student/academics/grades', icon: 'grades' },
    { label: 'Community', path: 'student/academics/community', icon: 'community' },
    { label: 'Internship-Portal', path: 'student/academics/portal', icon: 'portal' },
    { label: 'Feeds', path: 'student/academics/feeds', icon: 'feeds' }

  ],
  recruiter: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD.recruiter, icon: 'dashboard' },
    { label: 'Jobs', path: ROUTES.PLACEMENT.JOBS, icon: 'briefcase' },
    { label: 'Applications', path: ROUTES.PLACEMENT.APPLICATIONS, icon: 'file' },
    { label: 'Statistics', path: ROUTES.PLACEMENT.STATISTICS, icon: 'stats' }
  ]
};
