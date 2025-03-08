"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import DepartmentDetail from "@/components/role-specific/college-admin/Department/department-detail"
import { BackgroundPattern } from "@/components/ui/background-pattern"

const generateGradientColor = (index: number): string => {
  // Array of base colors for gradients
  const baseColors = [
    'purple',
    'blue',
    'teal',
    'amber',
    'pink',
    'indigo',
    'emerald',
    'rose',
    'cyan',
    'violet'
  ];

  // Get color based on index, loop back to start if index exceeds array length
  const color = baseColors[index % baseColors.length];

  // Return tailwind gradient class
  return `bg-gradient-to-br from-${color}-500/20 to-${color}-500/10`;
};

// Sample data for departments (expanded)
const departments = [
  {
    id: 1,
    name: "Computer Science",
    hod: "Dr. Alan Turing",
    hodImage: "/placeholder.svg?height=80&width=80",
    curriculum: "CS 2023 v2.1",
    batches: 4,
    teachers: 12,
    students: 180,
    passRate: 92,
    topPerformers: [
      { name: "John Doe", score: 98 },
      { name: "Jane Smith", score: 97 },
      { name: "Bob Johnson", score: 96 },
    ],
    upcomingEvents: [
      { name: "CS Symposium", date: "Mar 15, 2025" },
      { name: "Hackathon", date: "Apr 2, 2025" },
    ],
  },
  {
    id: 2,
    name: "Electrical Engineering",
    hod: "Dr. Nikola Tesla",
    hodImage: "/placeholder.svg?height=80&width=80",
    curriculum: "EE 2023 v1.8",
    batches: 3,
    teachers: 10,
    students: 150,
    passRate: 88,
    topPerformers: [
      { name: "Alice Williams", score: 95 },
      { name: "Charlie Brown", score: 94 },
      { name: "Diana Prince", score: 93 },
    ],
    upcomingEvents: [
      { name: "EE Workshop", date: "Mar 20, 2025" },
      { name: "Circuit Design Competition", date: "Apr 5, 2025" },
    ],
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    hod: "Dr. Henry Ford",
    hodImage: "/placeholder.svg?height=80&width=80",
    curriculum: "ME 2023 v1.5",
    batches: 3,
    teachers: 9,
    students: 160,
    passRate: 85,
    topPerformers: [
      { name: "Eve Green", score: 92 },
      { name: "Frank Castle", score: 91 },
      { name: "Grace Hopper", score: 90 },
    ],
    upcomingEvents: [
      { name: "ME Conference", date: "Mar 25, 2025" },
      { name: "Robotics Competition", date: "Apr 10, 2025" },
    ],
  },
  {
    id: 4,
    name: "Business Administration",
    hod: "Dr. Peter Drucker",
    hodImage: "/placeholder.svg?height=80&width=80",
    curriculum: "BA 2023 v2.0",
    batches: 2,
    teachers: 8,
    students: 120,
    passRate: 90,
    topPerformers: [
      { name: "Henry Cavill", score: 96 },
      { name: "Ivy League", score: 95 },
      { name: "Jack Sparrow", score: 94 },
    ],
    upcomingEvents: [
      { name: "BA Seminar", date: "Mar 30, 2025" },
      { name: "Business Plan Competition", date: "Apr 15, 2025" },
    ],
  },
  {
    id: 5,
    name: "Physics",
    hod: "Dr. Marie Curie",
    hodImage: "/placeholder.svg?height=80&width=80",
    curriculum: "PH 2023 v1.7",
    batches: 2,
    teachers: 7,
    students: 100,
    passRate: 82,
    topPerformers: [
      { name: "Katherine Johnson", score: 90 },
      { name: "Leonardo DaVinci", score: 89 },
      { name: "Marie Curie", score: 88 },
    ],
    upcomingEvents: [
      { name: "Physics Experiment", date: "Apr 1, 2025" },
      { name: "Science Fair", date: "Apr 8, 2025" },
    ],
  },
  {
    id: 6,
    name: "Mathematics",
    hod: "Dr. Katherine Johnson",
    hodImage: "/placeholder.svg?height=80&width=80",
    curriculum: "MA 2023 v1.9",
    batches: 2,
    teachers: 6,
    students: 90,
    passRate: 87,
    topPerformers: [
      { name: "Newton", score: 95 },
      { name: "Einstein", score: 94 },
      { name: "Gauss", score: 93 },
    ],
    upcomingEvents: [
      { name: "Math Olympiad", date: "Apr 3, 2025" },
      { name: "Math Conference", date: "Apr 12, 2025" },
    ],
  },
]

// Sample data for events
const events = [
  {
    id: 1,
    title: "Faculty Meeting",
    date: "Mar 5, 2025",
    time: "10:00 AM",
    location: "Conference Hall A",
  },
  {
    id: 2,
    title: "Curriculum Review",
    date: "Mar 8, 2025",
    time: "2:00 PM",
    location: "Dean's Office",
  },
  {
    id: 3,
    title: "Student Orientation",
    date: "Mar 12, 2025",
    time: "9:00 AM",
    location: "Main Auditorium",
  },
  {
    id: 4,
    title: "Department Heads Meeting",
    date: "Mar 15, 2025",
    time: "11:00 AM",
    location: "Conference Hall B",
  },
]

export default function DepartmentManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null)

  const handleDepartmentClick = (id: number) => {
    setSelectedDepartment(id)
  }

  const handleBackClick = () => {
    setSelectedDepartment(null)
  }

  return (
    <div className="relative min-h-screen p-6 bg-transparent">
      <BackgroundPattern />
      <div className="p-6 bg-transparent">
        {/* Content Area */}
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {selectedDepartment === null ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">Department Management</h1>
                    <p className="text-gray-500">Manage all departments and their details</p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {departments.map((dept, index) => (
                    <Card
                      key={dept.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${generateGradientColor(index)}`}
                      onClick={() => handleDepartmentClick(dept.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{dept.name}</CardTitle>
                          <Badge variant="outline" className="bg-white/80">
                            {dept.curriculum}
                          </Badge>
                        </div>
                        <CardDescription>HOD: {dept.hod}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{dept.batches}</p>
                            <p className="text-xs text-gray-500">Batches</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{dept.teachers}</p>
                            <p className="text-xs text-gray-500">Teachers</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{dept.students}</p>
                            <p className="text-xs text-gray-500">Students</p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Performance</span>
                            <span>{dept.passRate}%</span>
                          </div>
                          <Progress value={dept.passRate} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Top Performers</h4>
                            <ul className="text-xs space-y-1">
                              {dept.topPerformers.map((student, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{student.name}</span>
                                  <span className="font-medium">{student.score}%</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Upcoming Events</h4>
                            <ul className="text-xs space-y-1">
                              {dept.upcomingEvents.map((event, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{event.name}</span>
                                  <span className="text-gray-500">{event.date}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <DepartmentDetail
                department={departments.find((d) => d.id === selectedDepartment)!}
                onBack={handleBackClick}
              />
            )}
          </div>

          {/* Right Sidebar - Events Calendar */}
          <div className="hidden xl:block w-80">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Calendar</CardTitle>
                <CardDescription>Upcoming events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="w-12 h-12 rounded-md bg-purple-100 text-purple-600 flex flex-col items-center justify-center text-xs font-medium">
                      <span>{event.date.split(",")[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-xs text-gray-500">
                        {event.time} • {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

