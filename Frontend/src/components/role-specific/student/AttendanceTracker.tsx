"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import TodayAttendance from "./todayAttendance"
import AttendanceReport from "./attendanceReport"
import { Calendar, BarChart3, Bell, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Student = {
  name: string
  id: string
  course: string
  year: string
  profileImage: string
}

type NavItem = {
  id: string
  label: string
  icon: React.ReactNode
  component: React.ReactNode
}

export default function AttendanceTracker({ student }: { student: Student }) {
  const [activeSection, setActiveSection] = useState("today")

  const navItems: NavItem[] = [
    {
      id: "today",
      label: "Today",
      icon: <Calendar className="h-5 w-5" />,
      component: <TodayAttendance />,
    },
    {
      id: "report",
      label: "Report",
      icon: <BarChart3 className="h-5 w-5" />,
      component: <AttendanceReport />,
    },
    {
      id: "notifications",
      label: "Alerts",
      icon: <Bell className="h-5 w-5" />,
      component: (
        <div className="flex items-center justify-center h-64 text-muted-foreground">Notifications coming soon</div>
      ),
    },
    {
      id: "grades",
      label: "Grades",
      icon: <User className="h-5 w-5" />,
      component: (
        <div className="flex items-center justify-center h-64 text-muted-foreground">Grades coming soon</div>
      ),
    },
  ]

  const activeComponent = navItems.find((item) => item.id === activeSection)?.component

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Profile Card */}
          <Card className="bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 overflow-hidden border-none shadow-lg">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <CardContent className="pt-0 relative">
              <div className="flex flex-col items-center -mt-12">
                <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-md">
                  <AvatarImage src={student.profileImage} alt={student.name} />
                  <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mt-3">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.id}</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    {student.course}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {student.year}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-none shadow-lg">
            <CardContent className="p-3">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Date Card */}
          <Card className="bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-none shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl font-bold">{new Date().getDate()}</div>
                <div className="text-lg font-medium">{new Date().toLocaleDateString("en-US", { month: "short" })}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {new Date().toLocaleDateString("en-US", { weekday: "long" })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{navItems.find((item) => item.id === activeSection)?.label}</h1>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  >
                    Semester: Spring 2024
                  </Badge>
                  <button className="p-2 rounded-full hover:bg-secondary">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              {activeComponent}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

