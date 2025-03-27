import { BookOpen, Users, Clock, Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Upload, Users2, BarChart } from "lucide-react"

interface CourseCardProps {
  course: {
    id: string
    title: string
    code: string
    subject: string
    studentCount: number
    duration: string
    status: "ongoing" | "upcoming" | "completed"
    progress: number
    lastActivity: string
  }
  onEdit: () => void
  onUpload: () => void
  onAssign: () => void
  onAnalytics: () => void
  onViewDetails: () => void
}

export function CourseCard({
  course,
  onEdit,
  onUpload,
  onAssign,
  onAnalytics,
  onViewDetails,
}: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "upcoming":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="overflow-hidden border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription className="text-sm">
                {course.code} • {course.subject}
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
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" /> Edit Course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUpload}>
                <Upload className="mr-2 h-4 w-4" /> Upload Materials
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAssign}>
                <Users2 className="mr-2 h-4 w-4" /> Assign Students
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAnalytics}>
                <BarChart className="mr-2 h-4 w-4" /> View Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">{course.studentCount} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">{course.duration}</span>
              </div>
            </div>
            <Badge variant="secondary" className={getStatusColor(course.status)}>
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Course Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last Activity: {course.lastActivity}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="ghost"
          className="w-full justify-between text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          onClick={onViewDetails}
        >
          View Course Details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
} 