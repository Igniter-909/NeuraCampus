// app/(dashboard)/faculty/page.tsx
'use client'
// import { Metadata } from "next";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { ClassSchedule } from "@/components/role-specific/faculty/ClassSchedule";
import { PendingAssignments } from "@/components/role-specific/faculty/PendingAssignments";
import { StudentPerformance } from "@/components/role-specific/faculty/StudentPerformance";
import { AttendanceOverview } from "@/components/role-specific/faculty/AttendanceOverview";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { redirect } from 'next/navigation';
import { useUser } from "@/hooks/auth/useUser";

// export const metadata: Metadata = {
//   title: "Faculty Dashboard | Campus Connect",
//   description: "Manage your classes, assignments, and student performance",
// };

export default function FacultyDashboardPage() {
  const { user, loading, error } = useUser();
  console.log(user,"user");
  console.log(loading,"loading");
  console.log(error,"error");

  if (loading) return <LoadingSkeleton height="lg" />;
  if ( !user) {
    redirect('/login');
  }

  if (user?.role !== 'teacher') {
    redirect('/login');
  }
  if(loading){
    return <LoadingSkeleton height="lg" />;
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Heres an overview of your classes and pending tasks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 classes today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              Across 5 courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 need grading today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ClassSchedule />
        <PendingAssignments />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StudentPerformance />
        <AttendanceOverview />
      </div>
    </div>
  );
}