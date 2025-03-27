"use client"

import { useState, useEffect } from "react"
import { Student } from "@/types/student"
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
import { ScrollArea } from "@/components/ui/scroll-area"

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (studentData: Omit<Student, "id">) => void
  student?: Student | null
  mode: "add" | "edit"
}

export default function StudentModal({ isOpen, onClose, onSubmit, student, mode }: StudentModalProps) {
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    name: "",
    image: "/placeholder.svg?height=40&width=40",
    enrollmentNumber: "",
    department: "",
    program: "",
    year: "",
    semester: "",
    status: "Active",
    attendance: 0,
    cgpa: 0,
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    feePaid: false,
    feeAmount: "$5,200",
    feePending: "$5,200",
  })

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        image: student.image,
        enrollmentNumber: student.enrollmentNumber,
        department: student.department,
        program: student.program,
        year: student.year,
        semester: student.semester,
        status: student.status,
        attendance: student.attendance,
        cgpa: student.cgpa,
        email: student.email,
        phone: student.phone,
        dob: student.dob,
        gender: student.gender,
        address: student.address,
        feePaid: student.feePaid,
        feeAmount: student.feeAmount,
        feePending: student.feePending,
      })
    } else {
      setFormData({
        name: "",
        image: "/placeholder.svg?height=40&width=40",
        enrollmentNumber: "",
        department: "",
        program: "",
        year: "",
        semester: "",
        status: "Active",
        attendance: 0,
        cgpa: 0,
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        feePaid: false,
        feeAmount: "$5,200",
        feePending: "$5,200",
      })
    }
  }, [student])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {mode === "add" ? "Add New Student" : "Edit Student"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Fill in the details to add a new student to the system."
              : "Update the student's information below."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-12rem)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
                <Input
                  id="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Chemical Engineering">Chemical Engineering</SelectItem>
                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => setFormData({ ...formData, program: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B.Tech">B.Tech</SelectItem>
                    <SelectItem value="M.Tech">M.Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Semester">1st Semester</SelectItem>
                    <SelectItem value="2nd Semester">2nd Semester</SelectItem>
                    <SelectItem value="3rd Semester">3rd Semester</SelectItem>
                    <SelectItem value="4th Semester">4th Semester</SelectItem>
                    <SelectItem value="5th Semester">5th Semester</SelectItem>
                    <SelectItem value="6th Semester">6th Semester</SelectItem>
                    <SelectItem value="7th Semester">7th Semester</SelectItem>
                    <SelectItem value="8th Semester">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendance">Attendance (%)</Label>
                <Input
                  id="attendance"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cgpa">CGPA</Label>
                <Input
                  id="cgpa"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="feeAmount">Fee Amount</Label>
                <Input
                  id="feeAmount"
                  value={formData.feeAmount}
                  onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeStatus">Fee Status</Label>
                <Select
                  value={formData.feePaid ? "paid" : "pending"}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      feePaid: value === "paid",
                      feePending: value === "paid" ? "$0" : formData.feeAmount,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Fee Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {mode === "add" ? "Add Student" : "Update Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 