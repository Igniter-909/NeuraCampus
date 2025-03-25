
"use client"


import { redirect } from "next/navigation"
import AttendanceTracker from "@/components/role-specific/student/AttendanceTracker"

// This is a mock authentication check - in a real app, you would use a proper auth system
const isAuthenticated = true
const studentData = {
  name: "Alex Johnson",
  id: "STU2024001",
  course: "Computer Science",
  year: "3rd Year",
  profileImage: "/placeholder.svg?height=100&width=100",
}

export default function Home() {
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-transparent">
      <AttendanceTracker student={studentData} />
    </main>
  )
}



