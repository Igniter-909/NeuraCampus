import { X, Download, Users, Edit, BookOpen, Clock, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CourseDetailsSidebarProps {
  isOpen: boolean
  onClose: () => void
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
    description: string
  }
  onEditCourse: () => void
  onDownloadStudents: () => void
  onEditStudents: () => void
}

export function CourseDetailsSidebar({
  isOpen,
  onClose,
  course,
  onEditCourse,
  onDownloadStudents,
  onEditStudents,
}: CourseDetailsSidebarProps) {
  const { toast } = useToast()

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

  const handleDownloadSyllabus = () => {
    toast({
      title: "Download Started",
      variant: "default",
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[85vw] border-l border-blue-200 dark:border-blue-800 p-6">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Course Details
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-6 pr-4 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.code} • {course.subject}</p>
                </div>
              </div>
              <Badge variant="secondary" className={getStatusColor(course.status)}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="font-medium">{course.duration}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="font-medium">{new Date(course.lastActivity).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold">Description</h4>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold">Students</h4>
                </div>
                <span className="text-sm text-muted-foreground">{course.studentCount} enrolled</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200 dark:border-blue-800"
                  onClick={onDownloadStudents}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download List
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200 dark:border-blue-800"
                  onClick={onEditStudents}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit in Sheets
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Course Materials</h4>
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-200 dark:border-blue-800"
                onClick={handleDownloadSyllabus}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Syllabus
              </Button>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full border-blue-200 dark:border-blue-800"
                onClick={onEditCourse}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Course Details
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
} 