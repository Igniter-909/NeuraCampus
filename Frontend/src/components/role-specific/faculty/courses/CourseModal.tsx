import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (courseData: any) => void
  course?: {
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
  mode: "add" | "edit"
}

const subjects = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"]
const statuses = ["ongoing", "upcoming", "completed"]

export function CourseModal({ isOpen, onClose, onSubmit, course, mode }: CourseModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    subject: "",
    duration: "",
    status: "upcoming",
    description: "",
  })

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        code: course.code,
        subject: course.subject,
        duration: course.duration,
        status: course.status,
        description: course.description || "",
      })
    } else {
      setFormData({
        title: "",
        code: "",
        subject: "",
        duration: "",
        status: "upcoming",
        description: "",
      })
    }
  }, [course])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
    toast({
      title: mode === "add" ? "Course Added" : "Course Updated",
      description: mode === "add" ? "The course has been added successfully." : "The course has been updated successfully.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {mode === "add" ? "Add New Course" : "Edit Course"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {mode === "add"
              ? "Fill in the details to create a new course."
              : "Update the course information."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter course title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">Course Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter course code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
              >
                <SelectTrigger className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="e.g., 12 weeks"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "ongoing" | "upcoming" | "completed") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 min-h-[100px]"
              placeholder="Enter course description"
            />
          </div>

          <DialogFooter className="border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-200 dark:border-blue-800">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {mode === "add" ? "Add Course" : "Update Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 