// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerCookie } from './lib/cookies.server';
import auth from './lib/auth';

// Public routes that anyone can access
const publicRoutes = [
  '/',
  '/complete-registration',
  '/about',
  '/contact',
  '/our-work',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password'
];

// Auth routes that handle authentication
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

// Add type for valid roles
type UserRole = 'superadmin' | 'college_admin' | 'hod' | 'teacher' | 'clerk' | 'student' | 'recruiter';

// Type-safe role dashboards mapping
const roleDashboards: Record<UserRole, string> = {
  'superadmin': 'dashboard/super-admin',
  'college_admin': 'dashboard/college-admin',
  'hod': 'dashboard/hod',
  'teacher': 'dashboard/faculty',
  'clerk': 'dashboard/clerk',
  'student': 'dashboard/student',
  'recruiter': 'dashboard/recruiter'
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = (await getServerCookie('token'))?.value;
   // Allow access to public routes without any checks
   if (publicRoutes.some(route => pathname === route)) {
    return NextResponse.next();
  }


  // Handle auth routes (login, register, etc.)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      const userData = await auth.verifyToken(token);
      const userRole = userData.role as UserRole;
      
      if (userRole && roleDashboards[userRole]) {
        return NextResponse.redirect(new URL(roleDashboards[userRole], request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - check for token
  if (!token) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Allow access to protected routes if token exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};