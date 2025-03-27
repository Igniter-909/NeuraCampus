"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/auth/useUser"
import LoadingSkeleton from "@/components/ui/LoadingSkeleton"
import { redirect } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CourseCard } from "@/components/role-specific/faculty/courses/CourseCard"
import { CourseFilters } from "@/components/role-specific/faculty/courses/CourseFilters"
import { CourseModal } from "@/components/role-specific/faculty/courses/CourseModal"
import { useToast } from "@/components/ui/use-toast"
import { CourseDetailsSidebar } from "@/components/role-specific/faculty/courses/CourseDetailsSidebar"
import { TeacherTimetable } from "@/components/role-specific/faculty/courses/TeacherTimetable"

// Sample data - replace with actual API calls
const initialCourses = [
  {
    id: "C001",
    title: "Data Structures and Algorithms",
    code: "CS201",
    subject: "Computer Science",
    studentCount: 45,
    duration: "12 weeks",
    status: "ongoing" as const,
    progress: 65,
    lastActivity: "2024-02-20",
    description: "Learn fundamental data structures and algorithms in this comprehensive course.",
  },
  {
    id: "C002",
    title: "Database Management Systems",
    code: "CS202",
    subject: "Computer Science",
    studentCount: 38,
    duration: "10 weeks",
    status: "upcoming" as const,
    progress: 0,
    lastActivity: "2024-02-19",
    description: "Master the concepts of database design and management.",
  },
  {
    id: "C003",
    title: "Advanced Mathematics",
    code: "MATH301",
    subject: "Mathematics",
    studentCount: 30,
    duration: "14 weeks",
    status: "ongoing" as const,
    progress: 45,
    lastActivity: "2024-02-18",
    description: "Advanced mathematical concepts and their applications.",
  },
  {
    id: "C004",
    title: "Quantum Physics",
    code: "PHY401",
    subject: "Physics",
    studentCount: 25,
    duration: "16 weeks",
    status: "completed" as const,
    progress: 100,
    lastActivity: "2024-02-17",
    description: "Explore the fascinating world of quantum mechanics.",
  },
]

export default function TeacherCoursesPage() {
  const { user, loading } = useUser()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [courses, setCourses] = useState(initialCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [subjectFilter, setSubjectFilter] = useState("All Subjects")
  const [sortBy, setSortBy] = useState("name")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [selectedCourse, setSelectedCourse] = useState<typeof initialCourses[0] | undefined>()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<typeof initialCourses[0] | undefined>()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingSkeleton height="lg" />
  }

  if (loading) {
    return <LoadingSkeleton height="lg" />
  }

  if (!user || user?.role !== "teacher") {
    redirect("/login")
  }

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "All Status" || course.status === statusFilter.toLowerCase()
      const matchesSubject = subjectFilter === "All Subjects" || course.subject === subjectFilter
      return matchesSearch && matchesStatus && matchesSubject
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "students":
          return b.studentCount - a.studentCount
        case "progress":
          return b.progress - a.progress
        case "lastActivity":
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        default:
          return 0
      }
    })

  const handleAddCourse = () => {
    setModalMode("add")
    setSelectedCourse(undefined)
    setIsModalOpen(true)
  }

  const handleEditCourse = (course: typeof initialCourses[0]) => {
    setModalMode("edit")
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const handleSubmitCourse = (courseData: Omit<typeof initialCourses[0], "id" | "studentCount" | "progress" | "lastActivity">) => {
    if (modalMode === "add") {
      const newCourse = {
        ...courseData,
        id: `C${String(courses.length + 1).padStart(3, "0")}`,
        studentCount: 0,
        progress: 0,
        lastActivity: new Date().toISOString().split("T")[0],
      }
      setCourses([...courses, newCourse])
    } else if (modalMode === "edit" && selectedCourse) {
      setCourses(
        courses.map((course) =>
          course.id === selectedCourse.id
            ? { ...course, ...courseData, lastActivity: new Date().toISOString().split("T")[0] }
            : course
        )
      )
    }
  }

  const handleExport = () => {
    // Implement export functionality
    toast({
      title: "Export Started",
      variant: "default",
    })
  }

  const handleViewDetails = (course: typeof initialCourses[0]) => {
    setSelectedCourseForDetails(course)
    setIsSidebarOpen(true)
  }

  const handleDownloadStudents = () => {
    // Implement download functionality
    toast({
      title: "Download Started",
      variant: "default",
    })
  }

  const handleEditStudents = () => {
    // Implement edit students functionality
    toast({
      title: "Edit Students",
      variant: "default",
    })
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Courses</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={handleAddCourse}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <CourseFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        subjectFilter={subjectFilter}
        onSubjectChange={setSubjectFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onExport={handleExport}
      />

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={() => handleEditCourse(course)}
                onUpload={() => {
                  toast({
                    title: "Upload Materials",
                    variant: "default",
                  })
                }}
                onAssign={() => {
                  toast({
                    title: "Assign Students",
                    variant: "default",
                  })
                }}
                onAnalytics={() => {
                  toast({
                    title: "View Analytics",
                    variant: "default",
                  })
                }}
                onViewDetails={() => handleViewDetails(course)}
              />
            ))}
          </div>

          <div className="pt-6 border-t border-blue-200 dark:border-blue-800">
            <TeacherTimetable />
          </div>
        </div>
      </ScrollArea>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitCourse}
        course={selectedCourse}
        mode={modalMode}
      />

      {selectedCourseForDetails && (
        <CourseDetailsSidebar
          isOpen={isSidebarOpen}
          onClose={() => {
            setIsSidebarOpen(false)
            setSelectedCourseForDetails(undefined)
          }}
          course={selectedCourseForDetails}
          onEditCourse={() => {
            setIsSidebarOpen(false)
            handleEditCourse(selectedCourseForDetails)
          }}
          onDownloadStudents={handleDownloadStudents}
          onEditStudents={handleEditStudents}
        />
      )}
    </div>
  )
}