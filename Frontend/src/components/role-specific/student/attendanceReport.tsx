"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, BookOpen, Calendar, CheckCircle2, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for all subjects
const allSubjects = [
  {
    id: 1,
    name: "Advanced Mathematics",
    code: "MATH301",
    professor: "Dr. Emily Chen",
    attendance: 85,
    classes: [
      { date: "2023-03-01", status: "present" },
      { date: "2023-03-03", status: "present" },
      { date: "2023-03-08", status: "absent" },
      { date: "2023-03-10", status: "present" },
      { date: "2023-03-15", status: "present" },
    ],
  },
  {
    id: 2,
    name: "Data Structures",
    code: "CS202",
    professor: "Prof. Michael Brown",
    attendance: 92,
    classes: [
      { date: "2023-03-02", status: "present" },
      { date: "2023-03-04", status: "present" },
      { date: "2023-03-09", status: "present" },
      { date: "2023-03-11", status: "present" },
      { date: "2023-03-16", status: "absent" },
    ],
  },
  {
    id: 3,
    name: "Computer Networks",
    code: "CS305",
    professor: "Dr. Sarah Johnson",
    attendance: 78,
    classes: [
      { date: "2023-03-01", status: "present" },
      { date: "2023-03-03", status: "absent" },
      { date: "2023-03-08", status: "present" },
      { date: "2023-03-10", status: "absent" },
      { date: "2023-03-15", status: "present" },
    ],
  },
  {
    id: 4,
    name: "Software Engineering",
    code: "CS401",
    professor: "Prof. David Wilson",
    attendance: 88,
    classes: [
      { date: "2023-03-02", status: "present" },
      { date: "2023-03-04", status: "present" },
      { date: "2023-03-09", status: "present" },
      { date: "2023-03-11", status: "absent" },
      { date: "2023-03-16", status: "present" },
    ],
  },
]

export default function AttendanceReport() {
  const [selectedSubject, setSelectedSubject] = useState(allSubjects[0])
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  // Calculate overall attendance
  const totalClasses = allSubjects.reduce((acc, subject) => acc + subject.classes.length, 0)
  const presentClasses = allSubjects.reduce(
    (acc, subject) => acc + subject.classes.filter((c) => c.status === "present").length,
    0,
  )
  const overallAttendance = Math.round((presentClasses / totalClasses) * 100)

  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Overall Attendance</p>
                <h3 className="text-3xl font-bold mt-1">{overallAttendance}%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <Progress value={overallAttendance} className="h-2 mt-4 bg-white/20" indicatorClassName="bg-white" />
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Present</p>
                <h3 className="text-3xl font-bold mt-1">{presentClasses}</h3>
                <p className="text-sm text-muted-foreground mt-1">Classes attended</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Absent</p>
                <h3 className="text-3xl font-bold mt-1">{totalClasses - presentClasses}</h3>
                <p className="text-sm text-muted-foreground mt-1">Classes missed</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allSubjects.map((subject) => (
          <Card
            key={subject.id}
            className={`cursor-pointer transition-all hover:shadow-md border-none shadow-md ${
              selectedSubject.id === subject.id
                ? "ring-2 ring-blue-500 dark:ring-blue-400"
                : "bg-white dark:bg-slate-800"
            }`}
            onClick={() => setSelectedSubject(subject)}
          >
            <CardContent className="p-5">
              <div className="flex flex-col space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                      <span className="text-sm font-medium">{subject.code}</span>
                    </div>
                    <h4 className="font-semibold text-sm truncate" title={subject.name}>
                      {subject.name}
                    </h4>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground text-xs">Attendance</span>
                    <span className="font-medium text-xs">{subject.attendance}%</span>
                  </div>
                  <Progress
                    value={subject.attendance}
                    className="h-2"
                    indicatorClassName={
                      subject.attendance >= 90
                        ? "bg-green-500"
                        : subject.attendance >= 75
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subject Detail */}
      <Card className="bg-white dark:bg-slate-800 border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {selectedSubject.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedSubject.code} • {selectedSubject.professor}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <BarChart3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`p-2 rounded-md ${
                  viewMode === "calendar"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Calendar className="h-5 w-5" />
              </button>
            </div>
          </div>

          {viewMode === "list" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedSubject.classes.map((classSession, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(classSession.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {classSession.status === "present" ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-green-600 dark:text-green-400 font-medium">Present</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-red-600 dark:text-red-400 font-medium">Absent</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="mt-4">
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="font-medium text-sm py-1">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2 // Offset to start month on a Wednesday
                  if (day < 1 || day > 31) return <div key={i} className="h-12"></div>

                  // Find if there's a class on this day
                  const classOnDay = selectedSubject.classes.find((c) => new Date(c.date).getDate() === day)

                  return (
                    <div
                      key={i}
                      className={`h-14 flex items-center justify-center rounded-md border ${
                        classOnDay
                          ? classOnDay.status === "present"
                            ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                            : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                          : "border-transparent"
                      }`}
                    >
                      <span className={classOnDay ? "font-medium" : ""}>{day}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

