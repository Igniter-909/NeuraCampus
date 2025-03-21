"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ClipboardList, Calendar, FileText, Shield, DollarSign, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

import { FacultyManagement } from "./FacultyManagement"
import { FacultyTimeTableManagement } from "./FacultyTimeTableManagement"
import { FacultyCourseManagement } from "./FacultyCourseManagement"
import { FacultyLeaveManagement } from "./FacultyLeaveManagement"
import { FacultyPayrollManagement } from "./FacultyPayrollManagement"
import { FacultyAccessControl } from "./FacultyAccessControl"
import { FacultyAttendanceManagement } from "./FacultyAttendanceManagement"

export function AdminFacultyManagementDashboard() {
  const [activeView, setActiveView] = useState("faculty-list")

  // Define available views
  const views = [
    {
      id: "faculty-list",
      label: "Faculty List",
      icon: <Users className="h-5 w-5" />,
      component: <FacultyManagement />,
      title: "Faculty Management",
      description: "Add, edit, view and manage faculty members.",
    },
    {
      id: "timetable",
      label: "Timetable",
      icon: <Calendar className="h-5 w-5" />,
      component: <FacultyTimeTableManagement />,
      title: "Faculty Timetable Management",
      description: "Manage and view faculty teaching schedules.",
    },
    {
      id: "courses",
      label: "Courses",
      icon: <ClipboardList className="h-5 w-5" />,
      component: <FacultyCourseManagement />,
      title: "Faculty Course Management",
      description: "Assign and manage courses for faculty members.",
    },
    {
      id: "leave",
      label: "Leave",
      icon: <FileText className="h-5 w-5" />,
      component: <FacultyLeaveManagement />,
      title: "Faculty Leave Management",
      description: "View and manage faculty leave requests.",
    },
    {
      id: "payroll",
      label: "Payroll",
      icon: <DollarSign className="h-5 w-5" />,
      component: <FacultyPayrollManagement />,
      title: "Faculty Payroll Management",
      description: "Manage salary and payroll for faculty members.",
    },
    {
      id: "access",
      label: "Access",
      icon: <Shield className="h-5 w-5" />,
      component: <FacultyAccessControl />,
      title: "Faculty Access Control",
      description: "Manage system permissions and access for faculty.",
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: <CalendarDays className="h-5 w-5" />,
      component: <FacultyAttendanceManagement />,
      title: "Faculty Attendance Management",
      description: "Track and manage faculty attendance records.",
    },
  ]

  // Get the active view info
  const activeViewInfo = views.find((view) => view.id === activeView) || views[0]

  return (
    <div className="space-y-6 dark:bg-gray-900/95">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-50">Faculty Management</h2>
        <p className="text-blue-600 dark:text-blue-300">
          Manage faculty members, their schedules, courses, leave, payroll, access control, and attendance.
        </p>
      </div>

      {/* Modern navigation cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg transition-all",
              activeView === view.id
                ? "bg-blue-900 text-white shadow-lg shadow-blue-500/20"
                : "bg-white dark:bg-gray-800/80 text-blue-900 dark:text-blue-50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50",
            )}
          >
            <div
              className={cn(
                "rounded-full p-2 mb-2",
                activeView === view.id 
                  ? "bg-white/20" 
                  : "bg-blue-50 dark:bg-blue-950/50",
              )}
            >
              {view.icon}
            </div>
            <span className="text-sm font-medium">{view.label}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <Card className="border-blue-100 dark:border-blue-900/50 dark:bg-gray-800/90 shadow-lg shadow-blue-900/5">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-900 dark:bg-blue-800/90 text-white">
              {activeViewInfo.icon}
            </div>
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">{activeViewInfo.title}</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">{activeViewInfo.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">{activeViewInfo.component}</CardContent>
      </Card>
    </div>
  )
}

export default AdminFacultyManagementDashboard

