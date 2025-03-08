// src/app/(dashboard)/student/page.tsx
'use client'
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Role, ROLES } from '@/constants/roles';
import { ROLE_DASHBOARD_ROUTES } from '@/constants/routes';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import StudentCourseList from '@/components/role-specific/student/StudentCourseList';
import UpcomingAssignments from '@/components/role-specific/student/UpcomingAssignments';
import AttendanceRecord from '@/components/role-specific/student/AttendanceRecord';
import EventsCalendar from '@/components/role-specific/student/EventsCalendar';
import PlacementNotices from '@/components/role-specific/student/PlacementNotices';
import { CourseEnrollment } from '@/components/role-specific/student/CourseEnrollment';
import { useUser } from '@/hooks/auth/useUser';

export default  function StudentDashboard() {
  // Get auth token and verify on server
  const {user,loading,error} = useUser();
  // console.log(user,"user");
  // console.log(loading,"loading");
  // console.log(error,"error");

  
  try {
    
    
    // Ensure correct role access
    if (user?.role !== ROLES?.student) {
      redirect(ROLE_DASHBOARD_ROUTES[user?.role as Role] || '/login');
    }
    
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses and Assignments */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<LoadingSkeleton height="md" />}>
              <StudentCourseList studentId={user._id} />
            </Suspense>
            
            <Suspense fallback={<LoadingSkeleton height="md" />}>
              <UpcomingAssignments studentId={user._id} />
            </Suspense>
            
            <Suspense fallback={<LoadingSkeleton height="lg" />}>
              <PlacementNotices 
                departmentId={user.department || ''} 
                batchYear={user.batchYear || ''} 
              />
            </Suspense>

            <Suspense>
              <CourseEnrollment studentId={user?.id} />
            </Suspense>
          </div>
          
          {/* Attendance and Calendar */}
          <div className="lg:col-span-1 space-y-6">
            <Suspense fallback={<LoadingSkeleton height="md" />}>
              <AttendanceRecord studentId={user?.id} />
            </Suspense>
            
            <Suspense fallback={<LoadingSkeleton height="lg" />}>
              <EventsCalendar 
                collegeId={user?.collegeId} 
                departmentId={user?.department || ''}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  } catch (error: Error | unknown) {
    console.log(error);
    redirect('/login');
  }
}