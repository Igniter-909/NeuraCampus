import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

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

interface CourseCardProps {
  course: Course;
  onCourseClick: (course: Course) => void;
}

export default function CourseCard({ course, onCourseClick }: CourseCardProps) {
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
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      onClick={() => onCourseClick(course)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{course.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{course.code}</p>
          </div>
          <Badge variant="secondary" className={getGradeColor(course.finalGrade)}>
            {course.finalGrade}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Credits</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{course.credits}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Faculty</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{course.faculty}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Internal Marks</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{course.internalMarks}/100</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Attendance</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{course.attendance}%</span>
            </div>
            <Progress
              value={course.attendance}
              className="h-2"
              indicatorClassName={getAttendanceColor(course.attendance)}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                alert(`Downloading syllabus for ${course.code}`)
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Syllabus
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 