"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  ArrowUpDown,
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Filter,
  Mail,
  MoreHorizontal,
  Search,
  UserPlus,
  Users,
  Users2,
  CalendarDays,
  ClipboardList,
  Trophy,
  Plus,
  Bell,
  Star,
  Award,
  Target,
  MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
} from "@/components/ui/chart2"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Import our new components
import StudentList from "@/components/role-specific/college-admin/students/StudentList"
import StudentGrid from "@/components/role-specific/college-admin/students/StudentGrid"
import StudentFilters from "@/components/role-specific/college-admin/students/StudentFilters"
import BulkActions from "@/components/role-specific/college-admin/students/BulkActions"
import { Student } from "@/types/student"
import StudentModal from "@/components/role-specific/college-admin/students/StudentModal"
import { toast } from "sonner"
import ClubList from "@/components/role-specific/college-admin/students/ClubList"
import ClubModal from "@/components/role-specific/college-admin/students/ClubModal"

// Sample data for students
const students: Student[] = [
  {
    id: "STU001",
    name: "Alex Johnson",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023001",
    department: "Computer Science",
    program: "B.Tech",
    year: "3rd Year",
    semester: "6th Semester",
    status: "Active",
    attendance: 92,
    cgpa: 8.7,
    email: "alex.j@college.edu",
    phone: "+1 234-567-8901",
    dob: "1999-05-15",
    gender: "Male",
    address: "123 College Ave, New York, NY 10001",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
  {
    id: "STU002",
    name: "Samantha Lee",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023002",
    department: "Electrical Engineering",
    program: "B.Tech",
    year: "2nd Year",
    semester: "4th Semester",
    status: "Active",
    attendance: 85,
    cgpa: 9.2,
    email: "samantha.l@college.edu",
    phone: "+1 234-567-8902",
    dob: "2000-08-22",
    gender: "Female",
    address: "456 University Blvd, Boston, MA 02115",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
  {
    id: "STU003",
    name: "Michael Chen",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023003",
    department: "Mechanical Engineering",
    program: "B.Tech",
    year: "4th Year",
    semester: "8th Semester",
    status: "Active",
    attendance: 78,
    cgpa: 7.8,
    email: "michael.c@college.edu",
    phone: "+1 234-567-8903",
    dob: "1998-11-10",
    gender: "Male",
    address: "789 Engineering Dr, San Francisco, CA 94107",
    feePaid: false,
    feeAmount: "$2,600",
    feePending: "$2,600",
  },
  {
    id: "STU004",
    name: "Emily Rodriguez",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023004",
    department: "Chemical Engineering",
    program: "B.Tech",
    year: "1st Year",
    semester: "2nd Semester",
    status: "Active",
    attendance: 95,
    cgpa: 9.5,
    email: "emily.r@college.edu",
    phone: "+1 234-567-8904",
    dob: "2001-03-28",
    gender: "Female",
    address: "101 Science Way, Chicago, IL 60607",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
  {
    id: "STU005",
    name: "David Kim",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023005",
    department: "Computer Science",
    program: "M.Tech",
    year: "1st Year",
    semester: "2nd Semester",
    status: "Active",
    attendance: 88,
    cgpa: 8.9,
    email: "david.k@college.edu",
    phone: "+1 234-567-8905",
    dob: "1997-07-14",
    gender: "Male",
    address: "202 Graduate Housing, Seattle, WA 98105",
    feePaid: true,
    feeAmount: "$6,800",
    feePending: "$0",
  },
  {
    id: "STU006",
    name: "Priya Patel",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023006",
    department: "Civil Engineering",
    program: "B.Tech",
    year: "3rd Year",
    semester: "5th Semester",
    status: "Active",
    attendance: 72,
    cgpa: 7.5,
    email: "priya.p@college.edu",
    phone: "+1 234-567-8906",
    dob: "1999-12-05",
    gender: "Female",
    address: "303 Engineering Quad, Austin, TX 78712",
    feePaid: false,
    feeAmount: "$2,600",
    feePending: "$2,600",
  },
  {
    id: "STU007",
    name: "Rajesh Kumar",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023007",
    department: "Computer Science",
    program: "B.Tech",
    year: "2nd Year",
    semester: "4th Semester",
    status: "Active",
    attendance: 85,
    cgpa: 8.4,
    email: "rajesh.k@college.edu",
    phone: "+1 234-567-8907",
    dob: "2000-04-18",
    gender: "Male",
    address: "404 Tech Park, Bangalore, KA 560001",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
  {
    id: "STU008",
    name: "Sarah Wilson",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023008",
    department: "Electrical Engineering",
    program: "B.Tech",
    year: "4th Year",
    semester: "8th Semester",
    status: "Active",
    attendance: 88,
    cgpa: 8.9,
    email: "sarah.w@college.edu",
    phone: "+1 234-567-8908",
    dob: "1998-09-25",
    gender: "Female",
    address: "505 Engineering Block, Mumbai, MH 400001",
    feePaid: false,
    feeAmount: "$2,600",
    feePending: "$2,600",
  },
  {
    id: "STU009",
    name: "Amit Patel",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023009",
    department: "Mechanical Engineering",
    program: "B.Tech",
    year: "1st Year",
    semester: "2nd Semester",
    status: "Active",
    attendance: 92,
    cgpa: 9.1,
    email: "amit.p@college.edu",
    phone: "+1 234-567-8909",
    dob: "2001-11-30",
    gender: "Male",
    address: "606 Mechanical Wing, Delhi, DL 110001",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
  {
    id: "STU010",
    name: "Neha Sharma",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023010",
    department: "Chemical Engineering",
    program: "B.Tech",
    year: "3rd Year",
    semester: "6th Semester",
    status: "Active",
    attendance: 90,
    cgpa: 8.8,
    email: "neha.s@college.edu",
    phone: "+1 234-567-8910",
    dob: "1999-07-12",
    gender: "Female",
    address: "707 Chemistry Block, Chennai, TN 600001",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
  {
    id: "STU011",
    name: "Vikram Singh",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023011",
    department: "Civil Engineering",
    program: "B.Tech",
    year: "2nd Year",
    semester: "4th Semester",
    status: "Active",
    attendance: 87,
    cgpa: 8.5,
    email: "vikram.s@college.edu",
    phone: "+1 234-567-8911",
    dob: "2000-03-15",
    gender: "Male",
    address: "808 Civil Block, Kolkata, WB 700001",
    feePaid: false,
    feeAmount: "$2,600",
    feePending: "$2,600",
  },
  {
    id: "STU012",
    name: "Anjali Gupta",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023012",
    department: "Computer Science",
    program: "M.Tech",
    year: "1st Year",
    semester: "2nd Semester",
    status: "Active",
    attendance: 94,
    cgpa: 9.3,
    email: "anjali.g@college.edu",
    phone: "+1 234-567-8912",
    dob: "1997-12-08",
    gender: "Female",
    address: "909 Graduate Block, Hyderabad, TS 500001",
    feePaid: true,
    feeAmount: "$6,800",
    feePending: "$0",
  },
  {
    id: "STU013",
    name: "Rahul Verma",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023013",
    department: "Electrical Engineering",
    program: "B.Tech",
    year: "3rd Year",
    semester: "6th Semester",
    status: "Active",
    attendance: 89,
    cgpa: 8.6,
    email: "rahul.v@college.edu",
    phone: "+1 234-567-8913",
    dob: "1999-06-20",
    gender: "Male",
    address: "1010 Electrical Block, Pune, MH 411001",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
  {
    id: "STU014",
    name: "Priyanka Reddy",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023014",
    department: "Mechanical Engineering",
    program: "B.Tech",
    year: "4th Year",
    semester: "8th Semester",
    status: "Active",
    attendance: 91,
    cgpa: 8.7,
    email: "priyanka.r@college.edu",
    phone: "+1 234-567-8914",
    dob: "1998-10-05",
    gender: "Female",
    address: "1111 Mechanical Block, Ahmedabad, GJ 380001",
    feePaid: false,
    feeAmount: "$2,600",
    feePending: "$2,600",
  },
  {
    id: "STU015",
    name: "Arun Kumar",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "EN2023015",
    department: "Chemical Engineering",
    program: "B.Tech",
    year: "2nd Year",
    semester: "4th Semester",
    status: "Active",
    attendance: 86,
    cgpa: 8.3,
    email: "arun.k@college.edu",
    phone: "+1 234-567-8915",
    dob: "2000-02-28",
    gender: "Male",
    address: "1212 Chemistry Block, Jaipur, RJ 302001",
    feePaid: true,
    feeAmount: "$5,200",
    feePending: "$0",
  },
]

// Analytics data
const departmentDistribution = [
  { name: "Computer Science", value: 120 },
  { name: "Electrical Engineering", value: 85 },
  { name: "Mechanical Engineering", value: 70 },
  { name: "Chemical Engineering", value: 45 },
  { name: "Civil Engineering", value: 60 },
]

const cgpaDistribution = [
  { name: "9.0-10.0", value: 45 },
  { name: "8.0-8.9", value: 80 },
  { name: "7.0-7.9", value: 65 },
  { name: "6.0-6.9", value: 30 },
  { name: "Below 6.0", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// Add this after the students array
const clubs = [
  {
    id: "CLUB001",
    name: "Technical Club",
    description: "A platform for students to showcase their technical skills and participate in coding competitions",
    members: 45,
    events: [
      {
        id: "EVT001",
        title: "Hackathon 2024",
        date: "2024-03-15",
        status: "Upcoming",
        participants: 30,
      },
      {
        id: "EVT002",
        title: "Web Development Workshop",
        date: "2024-02-20",
        status: "Completed",
        participants: 25,
      },
    ],
    agenda: [
      {
        id: "AGD001",
        title: "Monthly Coding Challenge",
        description: "Solve real-world problems using programming",
        frequency: "Monthly",
      },
      {
        id: "AGD002",
        title: "Tech Talks",
        description: "Industry experts sharing insights",
        frequency: "Bi-weekly",
      },
    ],
    achievements: [
      {
        id: "ACH001",
        title: "Best Technical Club 2023",
        date: "2023-12-15",
        description: "Awarded by the college administration",
      },
    ],
  },
  {
    id: "CLUB002",
    name: "Cultural Club",
    description: "Promoting arts, music, and cultural activities",
    members: 60,
    events: [
      {
        id: "EVT003",
        title: "Annual Cultural Fest",
        date: "2024-04-10",
        status: "Upcoming",
        participants: 50,
      },
    ],
    agenda: [
      {
        id: "AGD003",
        title: "Music Practice Sessions",
        description: "Weekly practice for upcoming performances",
        frequency: "Weekly",
      },
    ],
    achievements: [
      {
        id: "ACH002",
        title: "Best Cultural Performance",
        date: "2023-11-20",
        description: "Won at Inter-college Cultural Festival",
      },
    ],
  },
]

// Add these new interfaces after the existing types
interface ClubAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "high" | "medium" | "low";
  clubId: string;
}

interface ClubPerformance {
  id: string;
  clubId: string;
  metric: string;
  value: number;
  target: number;
  period: string;
}

// Add these new sample data after the existing clubs array
const clubAnnouncements: ClubAnnouncement[] = [
  {
    id: "ANN001",
    title: "Hackathon Registration Open",
    content: "Registration for the upcoming hackathon is now open. Limited spots available!",
    date: "2024-02-15",
    priority: "high",
    clubId: "CLUB001",
  },
  {
    id: "ANN002",
    title: "Cultural Fest Auditions",
    content: "Auditions for the cultural fest will be held next week. Prepare your performances!",
    date: "2024-02-10",
    priority: "medium",
    clubId: "CLUB002",
  },
];

const clubPerformance: ClubPerformance[] = [
  {
    id: "PERF001",
    clubId: "CLUB001",
    metric: "Member Participation",
    value: 85,
    target: 90,
    period: "2024-Q1",
  },
  {
    id: "PERF002",
    clubId: "CLUB002",
    metric: "Event Attendance",
    value: 92,
    target: 85,
    period: "2024-Q1",
  },
];

export default function StudentsManagement() {
  const [viewType, setViewType] = useState<"table" | "grid">("table")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [detailView, setDetailView] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    year: "all",
    semester: "all",
    department: "all",
    attendance: "all",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [studentsList, setStudentsList] = useState<Student[]>(students)
  const studentsPerPage = 8

  const [isClubModalOpen, setIsClubModalOpen] = useState(false)
  const [selectedClub, setSelectedClub] = useState<any>(null)
  const [clubModalMode, setClubModalMode] = useState<"add" | "edit">("add")

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student)
    setDetailView(true)
  }

  const handleAddStudent = () => {
    setModalMode("add")
    setSelectedStudent(null)
    setIsModalOpen(true)
  }

  const handleEditStudent = (student: Student) => {
    setModalMode("edit")
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudentsList(studentsList.filter((student) => student.id !== studentId))
      toast.success("Student deleted successfully")
    }
  }

  const handleModalSubmit = (studentData: Omit<Student, "id">) => {
    if (modalMode === "add") {
      const newStudent: Student = {
        ...studentData,
        id: `STU${String(studentsList.length + 1).padStart(3, "0")}`,
      }
      setStudentsList([...studentsList, newStudent])
      toast.success("Student added successfully")
    } else if (selectedStudent) {
      setStudentsList(
        studentsList.map((student) =>
          student.id === selectedStudent.id ? { ...studentData, id: student.id } : student
        )
      )
      toast.success("Student updated successfully")
    }
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const filteredStudents = studentsList.filter((student) => {
    // Search filter
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())

    // Year filter
    const matchesYear = filters.year === "all" || student.year.toLowerCase() === filters.year.toLowerCase()

    // Semester filter
    const matchesSemester = filters.semester === "all" || student.semester.toLowerCase() === filters.semester.toLowerCase()

    // Department filter
    const matchesDepartment = filters.department === "all" || student.department.toLowerCase() === filters.department.toLowerCase()

    // Attendance filter
    const matchesAttendance =
      filters.attendance === "all" ||
      (filters.attendance === "above90" && student.attendance > 90) ||
      (filters.attendance === "75to90" && student.attendance >= 75 && student.attendance <= 90) ||
      (filters.attendance === "below75" && student.attendance < 75)

    return matchesSearch && matchesYear && matchesSemester && matchesDepartment && matchesAttendance
  })

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  )

  // Quick filter buttons
  const departments = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Chemical Engineering", "Civil Engineering"]
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

  const handleAddClub = () => {
    setClubModalMode("add")
    setSelectedClub(null)
    setIsClubModalOpen(true)
  }

  const handleEditClub = (club: any) => {
    setClubModalMode("edit")
    setSelectedClub(club)
    setIsClubModalOpen(true)
  }

  const handleClubSubmit = (clubData: any) => {
    if (clubModalMode === "add") {
      const newClub = {
        ...clubData,
        id: `CLUB${String(clubs.length + 1).padStart(3, "0")}`,
        members: 0,
        events: [],
        agenda: [],
        achievements: [],
      }
      clubs.push(newClub)
      toast.success("Club added successfully")
    } else if (selectedClub) {
      const index = clubs.findIndex((club) => club.id === selectedClub.id)
      if (index !== -1) {
        clubs[index] = { ...clubs[index], ...clubData }
        toast.success("Club updated successfully")
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Students</h1>
            <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              {studentsList.length} Total
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, ID, branch..."
                className="pl-8 w-full md:w-[260px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <StudentFilters onFilterChange={handleFilterChange} />

            <div className="flex items-center gap-2">
              <Tabs
                defaultValue="table"
                className="w-[180px]"
                onValueChange={(value) => setViewType(value as "table" | "grid")}
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="table">Table</TabsTrigger>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button className="gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={handleAddStudent}>
                <UserPlus className="h-4 w-4" />
                Add Student
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Departments:</span>
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={filters.department === dept.toLowerCase() ? "default" : "outline"}
                size="sm"
                className={filters.department === dept.toLowerCase() ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" : "border-gray-200 dark:border-gray-700"}
                onClick={() => {
                  const newDepartment = filters.department === dept.toLowerCase() ? "all" : dept.toLowerCase()
                  handleFilterChange({ ...filters, department: newDepartment })
                }}
              >
                {dept}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Years:</span>
            {years.map((year) => (
              <Button
                key={year}
                variant={filters.year === year.toLowerCase() ? "default" : "outline"}
                size="sm"
                className={filters.year === year.toLowerCase() ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" : "border-gray-200 dark:border-gray-700"}
                onClick={() => {
                  const newYear = filters.year === year.toLowerCase() ? "all" : year.toLowerCase()
                  handleFilterChange({ ...filters, year: newYear })
                }}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          {viewType === "table" ? (
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700 dark:text-blue-400">Student Records</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">Manage all student information from here</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentList
                  students={paginatedStudents}
                  onViewStudent={handleViewStudent}
                  onEditStudent={handleEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {paginatedStudents.length} of {filteredStudents.length} students
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 dark:border-gray-700"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 dark:border-gray-700"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <StudentGrid
              students={paginatedStudents}
              onViewStudent={handleViewStudent}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          )}

          {/* Bulk Actions */}
          <div className="mt-4">
            <BulkActions
              onPromote={() => console.log("Promote")}
              onExportCSV={() => console.log("Export CSV")}
              onExportPDF={() => console.log("Export PDF")}
              onSendEmail={() => console.log("Send Email")}
            />
          </div>

          {/* Club Section */}
          <div className="mt-8">
            <ClubList
              clubs={clubs}
              clubAnnouncements={clubAnnouncements}
              clubPerformance={clubPerformance}
              onAddClub={handleAddClub}
              onEditClub={handleEditClub}
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="lg:w-[350px] p-4 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">Analytics</h2>

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-700 dark:text-blue-400">Student Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-1" />
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{studentsList.length}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total Students</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Calendar className="h-8 w-8 text-green-600 dark:text-green-400 mb-1" />
                  <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {Math.round(studentsList.reduce((acc, student) => acc + student.attendance, 0) / studentsList.length)}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Attendance</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    {(studentsList.reduce((acc, student) => acc + student.cgpa, 0) / studentsList.length).toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. CGPA</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400 mb-1" />
                  <span className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {studentsList.filter((student) => student.attendance < 75).length}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Low Attendance</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-700 dark:text-blue-400">Department Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={departments.map((dept) => ({
                          name: dept,
                          value: studentsList.filter((student) => student.department === dept).length,
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {departments.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-700 dark:text-blue-400">CGPA Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "9.0-10.0", value: studentsList.filter((s) => s.cgpa >= 9.0).length },
                        { name: "8.0-8.9", value: studentsList.filter((s) => s.cgpa >= 8.0 && s.cgpa < 9.0).length },
                        { name: "7.0-7.9", value: studentsList.filter((s) => s.cgpa >= 7.0 && s.cgpa < 8.0).length },
                        { name: "6.0-6.9", value: studentsList.filter((s) => s.cgpa >= 6.0 && s.cgpa < 7.0).length },
                        { name: "Below 6.0", value: studentsList.filter((s) => s.cgpa < 6.0).length },
                      ]}
                    >
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <ChartTooltip />
                      <Bar dataKey="value" fill="#3b82f6">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-700 dark:text-blue-400">Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentsList
                    .filter((student) => student.attendance < 75)
                    .map((student) => (
                      <div key={student.id} className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                        <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-700 dark:text-red-300">{student.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Attendance: {student.attendance}%</p>
                        </div>
                      </div>
                    ))}
                  {studentsList
                    .filter((student) => !student.feePaid)
                    .map((student) => (
                      <div key={`fee-${student.id}`} className="flex items-center gap-3 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                        <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">{student.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Fee Pending: {student.feePending}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Student Detail View */}
      <Sheet open={detailView} onOpenChange={setDetailView}>
        <SheetContent side="right" className="sm:max-w-[600px] overflow-y-auto bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
          {selectedStudent && (
            <>
              <SheetHeader className="mb-4">
                <SheetTitle className="text-blue-700 dark:text-blue-400">Student Details</SheetTitle>
                <SheetDescription className="text-gray-500 dark:text-gray-400">
                  View complete information about {selectedStudent.name}
                </SheetDescription>
              </SheetHeader>

              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20 border-2 border-blue-100 dark:border-blue-900">
                  <AvatarImage src={selectedStudent.image} alt={selectedStudent.name} />
                  <AvatarFallback className="text-xl bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{selectedStudent.enrollmentNumber}</p>
                  <Badge variant={selectedStudent.status === "Active" ? "default" : "secondary"} className="mt-1">
                    {selectedStudent.status}
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-5 mb-4 bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="fees">Fees</TabsTrigger>
                  <TabsTrigger value="clubs">Clubs</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{selectedStudent.dob}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{selectedStudent.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedStudent.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedStudent.address}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Uploaded Documents</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">ID Proof</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Previous Marksheet</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Medical Certificate</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Enrollment Number</p>
                      <p className="font-medium">{selectedStudent.enrollmentNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Program</p>
                      <p className="font-medium">{selectedStudent.program}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{selectedStudent.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Year</p>
                      <p className="font-medium">{selectedStudent.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Semester</p>
                      <p className="font-medium">{selectedStudent.semester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">CGPA</p>
                      <p className="font-medium">{selectedStudent.cgpa}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Semester Performance</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Semester</TableHead>
                          <TableHead>SGPA</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>1st Semester</TableCell>
                          <TableCell>8.5</TableCell>
                          <TableCell>Passed</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2nd Semester</TableCell>
                          <TableCell>8.7</TableCell>
                          <TableCell>Passed</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>3rd Semester</TableCell>
                          <TableCell>9.1</TableCell>
                          <TableCell>Passed</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>4th Semester</TableCell>
                          <TableCell>8.6</TableCell>
                          <TableCell>Passed</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Disciplinary Record</h3>
                    <div className="p-3 bg-gray-50 rounded-md text-center">
                      <p className="text-sm text-gray-500">No disciplinary issues recorded</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="attendance" className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Overall Attendance</h3>
                      <span
                        className={`font-medium ${selectedStudent.attendance < 75 ? "text-red-500" : "text-green-600"}`}
                      >
                        {selectedStudent.attendance}%
                      </span>
                    </div>
                    <Progress
                      value={selectedStudent.attendance}
                      className="h-2 mb-4"
                      indicatorClassName={selectedStudent.attendance < 75 ? "bg-red-500" : "bg-green-600"}
                    />
                  </div>

                  <h3 className="font-medium">Subject-wise Attendance</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Data Structures</p>
                        <span className="text-sm font-medium text-green-600">95%</span>
                      </div>
                      <Progress value={95} className="h-2" indicatorClassName="bg-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Database Management</p>
                        <span className="text-sm font-medium text-green-600">88%</span>
                      </div>
                      <Progress value={88} className="h-2" indicatorClassName="bg-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Computer Networks</p>
                        <span className="text-sm font-medium text-amber-600">78%</span>
                      </div>
                      <Progress value={78} className="h-2" indicatorClassName="bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Operating Systems</p>
                        <span className="text-sm font-medium text-red-500">68%</span>
                      </div>
                      <Progress value={68} className="h-2" indicatorClassName="bg-red-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">Software Engineering</p>
                        <span className="text-sm font-medium text-green-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" indicatorClassName="bg-green-600" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Monthly Attendance Trend</h3>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { month: "Jan", attendance: 95 },
                            { month: "Feb", attendance: 88 },
                            { month: "Mar", attendance: 92 },
                            { month: "Apr", attendance: 78 },
                            { month: "May", attendance: 85 },
                            { month: "Jun", attendance: 90 },
                          ]}
                        >
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip />
                          <Bar dataKey="attendance" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="fees" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-500">Total Fee</p>
                      <p className="text-xl font-bold">
                        {selectedStudent.feePaid ? selectedStudent.feeAmount : `${selectedStudent.feeAmount}`}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${selectedStudent.feePaid ? "bg-green-50" : "bg-red-50"}`}>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`text-xl font-bold ${selectedStudent.feePaid ? "text-green-600" : "text-red-600"}`}>
                        {selectedStudent.feePaid ? "Paid" : "Pending"}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium">Fee Breakdown</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fee Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Tuition Fee</TableCell>
                        <TableCell>$4,000</TableCell>
                        <TableCell>
                          <Badge variant={selectedStudent.feePaid ? "outline" : "destructive"}>
                            {selectedStudent.feePaid ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Development Fee</TableCell>
                        <TableCell>$500</TableCell>
                        <TableCell>
                          <Badge variant={selectedStudent.feePaid ? "outline" : "destructive"}>
                            {selectedStudent.feePaid ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Library Fee</TableCell>
                        <TableCell>$200</TableCell>
                        <TableCell>
                          <Badge variant={selectedStudent.feePaid ? "outline" : "destructive"}>
                            {selectedStudent.feePaid ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Examination Fee</TableCell>
                        <TableCell>$300</TableCell>
                        <TableCell>
                          <Badge variant={selectedStudent.feePaid ? "outline" : "destructive"}>
                            {selectedStudent.feePaid ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Hostel Fee</TableCell>
                        <TableCell>$1,200</TableCell>
                        <TableCell>
                          <Badge variant={selectedStudent.feePaid ? "outline" : "destructive"}>
                            {selectedStudent.feePaid ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Payment History</Button>
                    <Button>Record Payment</Button>
                  </div>
                </TabsContent>

                <TabsContent value="clubs" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Active Clubs</p>
                      <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                        {clubs.filter(club => club.members > 0).length}
                      </p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Events</p>
                      <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                        {clubs.reduce((acc, club) => acc + club.events.filter(event => event.status === "Upcoming").length, 0)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Club Memberships</h3>
                      <div className="space-y-2">
                        {clubs.map((club) => (
                          <div key={club.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Users2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <span className="font-medium">{club.name}</span>
                              </div>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                {club.members} members
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{club.description}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700">
                                View Details
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700">
                                View Events
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Upcoming Events</h3>
                      <div className="space-y-2">
                        {clubs
                          .flatMap((club) =>
                            club.events
                              .filter((event) => event.status === "Upcoming")
                              .map((event) => ({ ...event, clubName: club.name }))
                          )
                          .map((event) => (
                            <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                  <span className="font-medium">{event.title}</span>
                                </div>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                  {event.participants} participants
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {event.clubName} • {new Date(event.date).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Club Achievements</h3>
                      <div className="space-y-2">
                        {clubs
                          .flatMap((club) =>
                            club.achievements.map((achievement) => ({ ...achievement, clubName: club.name }))
                          )
                          .map((achievement) => (
                            <div key={achievement.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                              <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                <span className="font-medium">{achievement.title}</span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {achievement.clubName} • {new Date(achievement.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{achievement.description}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Add/Edit Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        student={selectedStudent || undefined}
        mode={modalMode}
      />

      {/* Add/Edit Club Modal */}
      <ClubModal
        isOpen={isClubModalOpen}
        onClose={() => setIsClubModalOpen(false)}
        onSubmit={handleClubSubmit}
        club={selectedClub}
        mode={clubModalMode}
      />
    </div>
  )
}

