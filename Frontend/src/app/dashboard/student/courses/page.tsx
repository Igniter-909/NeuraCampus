"use client"

import { useState, useEffect } from "react"
import { Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import StudentOverview from "@/components/role-specific/student/courses/StudentOverview"
import CourseFilters from "@/components/role-specific/student/courses/CourseFilters"
import CourseTable from "@/components/role-specific/student/courses/CourseTable"
import CourseCard from "@/components/role-specific/student/courses/CourseCard"
import CourseDetailModal from "@/components/role-specific/student/courses/CourseDetailModal"

// Sample student data
const student = {
  name: "Alex Johnson",
  rollNumber: "CS2023045",
  department: "Computer Science",
  program: "Bachelor of Technology",
  year: "3rd Year",
  semester: "6th Semester",
  cgpa: 3.85,
  profilePicture: "/placeholder.svg?height=100&width=100",
}

// Sample courses data
const courses = [
  {
    id: 1,
    code: "CSE101",
    name: "Introduction to Programming",
    credits: 4,
    faculty: "Dr. Sarah Williams",
    attendance: 92,
    internalMarks: 85,
    finalGrade: "A",
    status: "Pass",
    type: "Core",
    semester: "1st Semester",
    description:
      "This course introduces students to the fundamentals of programming using Python. Topics include variables, data types, control structures, functions, and basic algorithms.",
    schedule: [
      { day: "Monday", time: "10:00 AM - 11:30 AM", room: "CS-201" },
      { day: "Wednesday", time: "10:00 AM - 11:30 AM", room: "CS-201" },
    ],
    assignments: [
      { name: "Assignment 1", status: "Submitted", grade: "90/100", dueDate: "2023-09-15" },
      { name: "Assignment 2", status: "Submitted", grade: "85/100", dueDate: "2023-10-10" },
      { name: "Assignment 3", status: "Pending", grade: "-", dueDate: "2023-11-05" },
    ],
    facultyRemarks: "Alex shows great potential in programming concepts.",
  },
  {
    id: 2,
    code: "CSE201",
    name: "Data Structures",
    credits: 4,
    faculty: "Dr. Michael Chen",
    attendance: 88,
    internalMarks: 78,
    finalGrade: "B+",
    status: "Pass",
    type: "Core",
    semester: "2nd Semester",
    description:
      "This course covers fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs, along with algorithms for manipulating these structures.",
    schedule: [
      { day: "Tuesday", time: "1:00 PM - 2:30 PM", room: "CS-105" },
      { day: "Thursday", time: "1:00 PM - 2:30 PM", room: "CS-105" },
    ],
    assignments: [
      { name: "Assignment 1", status: "Submitted", grade: "82/100", dueDate: "2023-09-20" },
      { name: "Assignment 2", status: "Submitted", grade: "88/100", dueDate: "2023-10-15" },
    ],
    facultyRemarks: "Good understanding of complex data structures.",
  },
  {
    id: 3,
    code: "CSE301",
    name: "Database Management Systems",
    credits: 3,
    faculty: "Prof. Emily Rodriguez",
    attendance: 75,
    internalMarks: 72,
    finalGrade: "B",
    status: "Pass",
    type: "Core",
    semester: "3rd Semester",
    description:
      "This course introduces database concepts, design principles, and SQL programming. Students learn to design and implement relational databases.",
    schedule: [
      { day: "Monday", time: "2:00 PM - 3:30 PM", room: "CS-302" },
      { day: "Friday", time: "10:00 AM - 11:30 AM", room: "CS-302" },
    ],
    assignments: [
      { name: "Assignment 1", status: "Submitted", grade: "75/100", dueDate: "2023-09-25" },
      { name: "Assignment 2", status: "Submitted", grade: "80/100", dueDate: "2023-10-20" },
    ],
    facultyRemarks: "Needs to improve on normalization concepts.",
  },
  {
    id: 4,
    code: "CSE401",
    name: "Artificial Intelligence",
    credits: 4,
    faculty: "Dr. James Wilson",
    attendance: 95,
    internalMarks: 92,
    finalGrade: "A+",
    status: "Pass",
    type: "Elective",
    semester: "5th Semester",
    description:
      "This course covers fundamental concepts in artificial intelligence including search algorithms, knowledge representation, machine learning, and neural networks.",
    schedule: [
      { day: "Tuesday", time: "10:00 AM - 11:30 AM", room: "CS-401" },
      { day: "Thursday", time: "10:00 AM - 11:30 AM", room: "CS-401" },
    ],
    assignments: [
      { name: "Assignment 1", status: "Submitted", grade: "95/100", dueDate: "2023-09-30" },
      { name: "Assignment 2", status: "Submitted", grade: "98/100", dueDate: "2023-10-25" },
    ],
    facultyRemarks: "Exceptional understanding of AI concepts and applications.",
  },
  {
    id: 5,
    code: "CSE501",
    name: "Web Development",
    credits: 3,
    faculty: "Prof. David Kim",
    attendance: 65,
    internalMarks: 68,
    finalGrade: "C+",
    status: "Pass",
    type: "Elective",
    semester: "5th Semester",
    description:
      "This course teaches modern web development techniques using HTML, CSS, JavaScript, and popular frameworks like React and Node.js.",
    schedule: [
      { day: "Wednesday", time: "2:00 PM - 3:30 PM", room: "CS-205" },
      { day: "Friday", time: "2:00 PM - 3:30 PM", room: "CS-205" },
    ],
    assignments: [
      { name: "Assignment 1", status: "Submitted", grade: "70/100", dueDate: "2023-10-05" },
      { name: "Assignment 2", status: "Late Submission", grade: "65/100", dueDate: "2023-10-30" },
    ],
    facultyRemarks: "Attendance is a concern. Needs to focus more on practical implementations.",
  },
  {
    id: 6,
    code: "CSE601",
    name: "Machine Learning",
    credits: 4,
    faculty: "Dr. Lisa Thompson",
    attendance: 85,
    internalMarks: 88,
    finalGrade: "In Progress",
    status: "In Progress",
    type: "Elective",
    semester: "6th Semester",
    description:
      "This course covers supervised and unsupervised learning algorithms, feature engineering, model evaluation, and practical applications of machine learning.",
    schedule: [
      { day: "Monday", time: "4:00 PM - 5:30 PM", room: "CS-405" },
      { day: "Wednesday", time: "4:00 PM - 5:30 PM", room: "CS-405" },
    ],
    assignments: [
      { name: "Assignment 1", status: "Submitted", grade: "90/100", dueDate: "2023-10-10" },
      { name: "Assignment 2", status: "Pending", grade: "-", dueDate: "2023-11-15" },
    ],
    facultyRemarks: "Shows great promise in machine learning concepts.",
  },
]

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [sortOption, setSortOption] = useState("none")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Handle course click to open modal
  const handleCourseClick = (course: any) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  // Handle filter changes
  const handleFilterChange = () => {
    let result = [...courses]

    // Apply semester filter
    if (semesterFilter !== "all") {
      result = result.filter((course) => course.semester === semesterFilter)
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((course) => course.type === typeFilter)
    }

    // Apply sorting
    if (sortOption === "grade") {
      result.sort((a, b) => {
        const gradeValues: { [key: string]: number } = {
          "A+": 10,
          A: 9,
          "B+": 8,
          B: 7,
          "C+": 6,
          C: 5,
          D: 4,
          F: 0,
          "In Progress": -1,
        }
        return (gradeValues[b.finalGrade] || -1) - (gradeValues[a.finalGrade] || -1)
      })
    } else if (sortOption === "attendance") {
      result.sort((a, b) => b.attendance - a.attendance)
    } else if (sortOption === "credits") {
      result.sort((a, b) => b.credits - a.credits)
    }

    setFilteredCourses(result)
  }

  // Apply filters when filter options change
  useEffect(() => {
    handleFilterChange()
  }, [semesterFilter, typeFilter, sortOption])

  return (
    <div className="container mx-auto p-4  bg-transparent min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Courses Enrolled</h1>

      {/* Student Overview */}
      <StudentOverview student={student} />

      {/* Low Attendance Alert */}
      {filteredCourses.some((course) => course.attendance < 75) && (
        <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <AlertDescription className="text-red-800 dark:text-red-200">
            You have courses with attendance below 75%. Please improve your attendance to avoid academic penalties.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters and View Toggle */}
      <CourseFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onFilterChange={handleFilterChange}
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Enroll in New Course
        </Button>
        <Button variant="outline" className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <Download className="h-4 w-4 mr-2" />
          Download Course Report (PDF)
        </Button>
      </div>

      {/* Courses View */}
      {viewMode === "table" ? (
        <CourseTable courses={filteredCourses} onCourseClick={handleCourseClick} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onCourseClick={handleCourseClick} />
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

