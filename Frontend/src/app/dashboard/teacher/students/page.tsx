"use client"

import { useState, useEffect } from "react"
import {
  Check,
  ChevronDown,
  LayoutGrid,
  LayoutList,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  UserCog,
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useUser } from "@/hooks/auth/useUser"
import LoadingSkeleton from "@/components/ui/LoadingSkeleton"
import { redirect } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StudentModal } from "@/components/role-specific/faculty/StudentModal"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Sample data - replace with actual API calls
const initialStudents = [
  {
    id: "S001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    rollNumber: "2023001",
    department: "Computer Science",
    semester: "3rd",
    course: "Data Structures",
    performance: 85,
    attendance: 92,
    assignments: { completed: 18, total: 20 },
    notes: "Excellent participation in class discussions.",
    achievements: ["Lab Star", "Perfect Attendance"],
    lastActive: "2024-02-20",
  },
  {
    id: "S002",
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    rollNumber: "2023002",
    department: "Computer Science",
    semester: "3rd",
    course: "Data Structures",
    performance: 92,
    attendance: 96,
    assignments: { completed: 15, total: 15 },
    notes: "Outstanding lab work and research skills.",
    achievements: ["Research Award"],
    lastActive: "2024-02-19",
  },
  {
    id: "S003",
    name: "Marcus Chen",
    email: "m.chen@example.com",
    rollNumber: "2023003",
    department: "Computer Science",
    semester: "3rd",
    course: "Data Structures",
    performance: 78,
    attendance: 85,
    assignments: { completed: 12, total: 15 },
    notes: "Needs additional support with complex concepts.",
    achievements: [],
    lastActive: "2024-02-18",
  },
  {
    id: "S004",
    name: "Priya Patel",
    email: "priya.p@example.com",
    rollNumber: "2023004",
    department: "Computer Science",
    semester: "3rd",
    course: "Data Structures",
    performance: 95,
    attendance: 98,
    assignments: { completed: 19, total: 20 },
    notes: "Exceptional student with great analytical skills.",
    achievements: ["Top Performer", "Lab Star"],
    lastActive: "2024-02-20",
  },
  {
    id: "S005",
    name: "David Kim",
    email: "d.kim@example.com",
    rollNumber: "2023005",
    department: "Computer Science",
    semester: "3rd",
    course: "Data Structures",
    performance: 65,
    attendance: 75,
    assignments: { completed: 10, total: 15 },
    notes: "Struggling with attendance and assignment completion.",
    achievements: [],
    lastActive: "2024-02-17",
  },
  {
    id: "S006",
    name: "Emma Rodriguez",
    email: "emma.r@example.com",
    rollNumber: "2023006",
    department: "Computer Science",
    semester: "3rd",
    course: "Data Structures",
    performance: 88,
    attendance: 90,
    assignments: { completed: 14, total: 15 },
    notes: "Shows great potential in theoretical concepts.",
    achievements: ["Research Award"],
    lastActive: "2024-02-20",
  },
  {
    id: "S007",
    name: "James Wilson",
    email: "j.wilson@example.com",
    rollNumber: "2023007",
    department: "Computer Science",
    semester: "3rd",
    course: "Database Management",
    performance: 91,
    attendance: 94,
    assignments: { completed: 16, total: 16 },
    notes: "Excellent database design skills.",
    achievements: ["Database Design Award"],
    lastActive: "2024-02-20",
  },
  {
    id: "S008",
    name: "Sophia Chen",
    email: "s.chen@example.com",
    rollNumber: "2023008",
    department: "Computer Science",
    semester: "3rd",
    course: "Database Management",
    performance: 87,
    attendance: 89,
    assignments: { completed: 14, total: 16 },
    notes: "Strong in SQL queries.",
    achievements: ["Query Optimization Award"],
    lastActive: "2024-02-19",
  },
  {
    id: "S009",
    name: "Lucas Brown",
    email: "l.brown@example.com",
    rollNumber: "2023009",
    department: "Computer Science",
    semester: "3rd",
    course: "Database Management",
    performance: 82,
    attendance: 88,
    assignments: { completed: 13, total: 16 },
    notes: "Good understanding of normalization.",
    achievements: [],
    lastActive: "2024-02-18",
  },
  {
    id: "S010",
    name: "Isabella Martinez",
    email: "i.martinez@example.com",
    rollNumber: "2023010",
    department: "Computer Science",
    semester: "3rd",
    course: "Database Management",
    performance: 94,
    attendance: 97,
    assignments: { completed: 16, total: 16 },
    notes: "Outstanding in database optimization.",
    achievements: ["Top Performer", "Database Design Award"],
    lastActive: "2024-02-20",
  },
]

const courses = ["All Courses", "Data Structures", "Database Management"]

export default function TeacherStudentsPage() {
  const { user, loading } = useUser()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [openCourse, setOpenCourse] = useState(false)
  const [students, setStudents] = useState(initialStudents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [selectedStudent, setSelectedStudent] = useState<typeof initialStudents[0] | undefined>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<typeof initialStudents[0] | undefined>()

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

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = selectedCourse === "All Courses" || student.course === selectedCourse
    return matchesSearch && matchesCourse
  })

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "bg-blue-500 dark:bg-blue-400"
    if (performance >= 75) return "bg-blue-400 dark:bg-blue-300"
    if (performance >= 60) return "bg-blue-300 dark:bg-blue-200"
    return "bg-blue-200 dark:bg-blue-100"
  }

  const groupedStudents = filteredStudents.reduce((acc, student) => {
    if (!acc[student.course]) {
      acc[student.course] = []
    }
    acc[student.course].push(student)
    return acc
  }, {} as Record<string, typeof students>)

  const handleAddStudent = () => {
    setModalMode("add")
    setSelectedStudent(undefined)
    setIsModalOpen(true)
  }

  const handleEditStudent = (student: typeof initialStudents[0]) => {
    setModalMode("edit")
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleDeleteStudent = (student: typeof initialStudents[0]) => {
    setStudentToDelete(student)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmitStudent = (studentData: Omit<typeof initialStudents[0], "id" | "lastActive">) => {
    if (modalMode === "add") {
      const newStudent = {
        ...studentData,
        id: `S${String(students.length + 1).padStart(3, "0")}`,
        lastActive: new Date().toISOString().split("T")[0],
      }
      setStudents([...students, newStudent])
    } else if (modalMode === "edit" && selectedStudent) {
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, ...studentData, lastActive: new Date().toISOString().split("T")[0] }
            : student
        )
      )
    }
  }

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((student) => student.id !== studentToDelete.id))
      setIsDeleteDialogOpen(false)
      setStudentToDelete(undefined)
      toast({
        title: "Student Deleted",
        description: "The student has been removed successfully.",
      })
    }
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`${viewMode === "grid" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("table")}
            className={`${viewMode === "table" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 w-[200px] sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Popover open={openCourse} onOpenChange={setOpenCourse}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="justify-between w-full sm:w-[200px]">
                {selectedCourse}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search course..." />
                <CommandList>
                  <CommandEmpty>No course found.</CommandEmpty>
                  <CommandGroup>
                    {courses.map((course) => (
                      <CommandItem
                        key={course}
                        onSelect={() => {
                          setSelectedCourse(course)
                          setOpenCourse(false)
                        }}
                      >
                        <Check className={`mr-2 h-4 w-4 ${selectedCourse === course ? "opacity-100" : "opacity-0"}`} />
                        {course}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={handleAddStudent}>
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-8">
            {Object.entries(groupedStudents).map(([course, students]) => (
              <div key={course} className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{course}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <Card key={student.id} className="overflow-hidden border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{student.name}</CardTitle>
                              <CardDescription>
                                {student.rollNumber} • {student.department}
                              </CardDescription>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                                <UserCog className="mr-2 h-4 w-4" /> Edit Student
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" /> Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteStudent(student)}
                              >
                                <Trash className="mr-2 h-4 w-4" /> Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          <div className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Performance</span>
                              <span>{student.performance}%</span>
                            </div>
                            <Progress value={student.performance} className={getPerformanceColor(student.performance)} />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Attendance</p>
                              <p className="font-medium">{student.attendance}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Assignments</p>
                              <p className="font-medium">
                                {student.assignments.completed}/{student.assignments.total}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Email</p>
                              <p className="font-medium truncate">{student.email}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Active</p>
                              <p className="font-medium">{new Date(student.lastActive).toLocaleDateString()}</p>
                            </div>
                          </div>
                          {student.notes && (
                            <div className="text-sm">
                              <p className="text-muted-foreground">Notes</p>
                              <p>{student.notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      {student.achievements.length > 0 && (
                        <CardFooter className="flex gap-2 flex-wrap">
                          {student.achievements.map((achievement) => (
                            <Badge key={achievement} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                              {achievement}
                            </Badge>
                          ))}
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-8">
            {Object.entries(groupedStudents).map(([course, students]) => (
              <div key={course} className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{course}</h2>
                </div>
                <div className="rounded-md border border-blue-200 dark:border-blue-800">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50 dark:bg-blue-950/50">
                        <TableHead>Name</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead className="hidden md:table-cell">Attendance</TableHead>
                        <TableHead className="hidden md:table-cell">Assignments</TableHead>
                        <TableHead className="hidden lg:table-cell">Email</TableHead>
                        <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800">
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getPerformanceColor(student.performance)}`}></div>
                              {student.performance}%
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{student.attendance}%</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {student.assignments.completed}/{student.assignments.total}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{student.email}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {new Date(student.lastActive).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                                  <UserCog className="mr-2 h-4 w-4" /> Edit Student
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" /> Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteStudent(student)}
                                >
                                  <Trash className="mr-2 h-4 w-4" /> Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitStudent}
        student={selectedStudent}
        mode={modalMode}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the student from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}