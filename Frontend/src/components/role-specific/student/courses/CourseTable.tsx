import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  faculty: string;
  attendance: number;
  internalMarks: number;
  finalGrade: string;
}

interface CourseTableProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

export default function CourseTable({ courses, onCourseClick }: CourseTableProps) {
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return "bg-green-500"
    if (attendance >= 75) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getGradeColor = (grade: string) => {
    if (grade === "A+" || grade === "A") return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
    if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
    if (grade === "C+" || grade === "C") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
    if (grade === "D") return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
    if (grade === "F") return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
    return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead className="hidden md:table-cell">Credits</TableHead>
            <TableHead className="hidden md:table-cell">Faculty</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead className="hidden md:table-cell">Internal Marks</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course.id}
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => onCourseClick(course)}
            >
              <TableCell className="font-medium">{course.code}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell className="hidden md:table-cell">{course.credits}</TableCell>
              <TableCell className="hidden md:table-cell">{course.faculty}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{course.attendance}%</span>
                  <Progress
                    value={course.attendance}
                    className="h-2"
                    indicatorClassName={getAttendanceColor(course.attendance)}
                  />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{course.internalMarks}/100</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getGradeColor(course.finalGrade)}>
                  {course.finalGrade}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    alert(`Downloading syllabus for ${course.code}`)
                  }}
                >
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">Download Syllabus</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 