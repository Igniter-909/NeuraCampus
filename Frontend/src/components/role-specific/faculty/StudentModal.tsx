"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { useToast } from "@/components/ui/use-toast"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string
  department: string
  semester: string
  course: string
  performance: number
  attendance: number
  assignments: {
    completed: number
    total: number
  }
  notes: string
  achievements: string[]
  lastActive: string
}

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (student: Omit<Student, "id" | "lastActive">) => void
  student?: Student
  mode: "add" | "edit"
}

const departments = ["Computer Science", "Electronics", "Mechanical", "Civil"]
const semesters = ["1st", "2nd", "3rd", "4th"]
const courses = ["Data Structures", "Database Management", "Computer Networks", "Operating Systems"]

export function StudentModal({ isOpen, onClose, onSubmit, student, mode }: StudentModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Omit<Student, "id" | "lastActive">>({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    semester: "",
    course: "",
    performance: 0,
    attendance: 0,
    assignments: {
      completed: 0,
      total: 0,
    },
    notes: "",
    achievements: [],
  })

  useEffect(() => {
    if (student && mode === "edit") {
      setFormData({
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        semester: student.semester,
        course: student.course,
        performance: student.performance,
        attendance: student.attendance,
        assignments: student.assignments,
        notes: student.notes,
        achievements: student.achievements,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        rollNumber: "",
        department: "",
        semester: "",
        course: "",
        performance: 0,
        attendance: 0,
        assignments: {
          completed: 0,
          total: 0,
        },
        notes: "",
        achievements: [],
      })
    }
  }, [student, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
    toast({
      title: mode === "add" ? "Student Added" : "Student Updated",
      description: mode === "add" ? "New student has been added successfully." : "Student information has been updated successfully.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {mode === "add" ? "Add New Student" : "Edit Student"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {mode === "add"
              ? "Fill in the details to add a new student."
              : "Update the student's information."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter student name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</Label>
              <Input
                id="rollNumber"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter roll number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester" className="text-sm font-medium">Semester</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => setFormData({ ...formData, semester: value })}
              >
                <SelectTrigger className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="course" className="text-sm font-medium">Course</Label>
              <Select
                value={formData.course}
                onValueChange={(value) => setFormData({ ...formData, course: value })}
              >
                <SelectTrigger className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="performance" className="text-sm font-medium">Performance (%)</Label>
              <Input
                id="performance"
                type="number"
                min="0"
                max="100"
                value={formData.performance}
                onChange={(e) => setFormData({ ...formData, performance: Number(e.target.value) })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter performance percentage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendance" className="text-sm font-medium">Attendance (%)</Label>
              <Input
                id="attendance"
                type="number"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })}
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter attendance percentage"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="completedAssignments" className="text-sm font-medium">Completed Assignments</Label>
              <Input
                id="completedAssignments"
                type="number"
                min="0"
                value={formData.assignments.completed}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignments: { ...formData.assignments, completed: Number(e.target.value) },
                  })
                }
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter completed assignments"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalAssignments" className="text-sm font-medium">Total Assignments</Label>
              <Input
                id="totalAssignments"
                type="number"
                min="0"
                value={formData.assignments.total}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignments: { ...formData.assignments, total: Number(e.target.value) },
                  })
                }
                required
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Enter total assignments"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 min-h-[100px]"
              placeholder="Enter any additional notes"
            />
          </div>

          <DialogFooter className="border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-200 dark:border-blue-800">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {mode === "add" ? "Add Student" : "Update Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 