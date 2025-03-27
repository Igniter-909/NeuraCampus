import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  type: string;
  semester: string;
  description: string;
  schedule: Array<{
    day: string;
    time: string;
    room: string;
  }>;
  assignments: Array<{
    name: string;
    status: string;
    grade: string;
    dueDate: string;
  }>;
  facultyRemarks: string;
}

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseDetailModal({ course, isOpen, onClose }: CourseDetailModalProps) {
  if (!course) return null;

  const getGradeColor = (grade: string) => {
    if (grade === "A+" || grade === "A") return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
    if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
    if (grade === "C+" || grade === "C") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
    if (grade === "D") return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
    if (grade === "F") return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
    return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <span>{course.code}</span>
            <span className="text-gray-400">|</span>
            <span>{course.name}</span>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-3 mt-2">
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">{course.credits} Credits</Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">{course.type}</Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">{course.semester}</Badge>
              <Badge variant="secondary" className={getGradeColor(course.finalGrade)}>
                {course.finalGrade}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Course Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Course Description</h3>
            <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-800" />

          {/* Weekly Schedule */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Weekly Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.schedule.map((schedule, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{schedule.day}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{schedule.time}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">Room: {schedule.room}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-800" />

          {/* Assignments */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Assignments</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead>Assignment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.assignments.map((assignment, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-900 dark:text-gray-100">{assignment.name}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assignment.status === "Pending"
                              ? "outline"
                              : assignment.status === "Late Submission"
                                ? "destructive"
                                : "default"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">{assignment.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-800" />

          {/* Faculty Remarks */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Faculty Remarks</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-gray-600 dark:text-gray-400 italic">{course.facultyRemarks}</p>
            </div>
          </div>

          {/* Notes & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Notes & Resources</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">Lecture Notes - Week 1</span>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">Lecture Notes - Week 2</span>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">Reference Material</span>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 