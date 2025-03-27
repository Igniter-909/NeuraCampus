"use client"

import { Student } from "@/types/student"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StudentGridProps {
  students: Student[]
  onViewStudent: (student: Student) => void
  onEditStudent: (student: Student) => void
  onDeleteStudent: (studentId: string) => void
}

export default function StudentGrid({ students, onViewStudent, onEditStudent, onDeleteStudent }: StudentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <Card key={student.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={student.image} alt={student.name} />
                <AvatarFallback>{student.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-gray-500">{student.enrollmentNumber}</div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewStudent(student)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEditStudent(student)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDeleteStudent(student.id)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Department</span>
                <span className="text-sm font-medium">{student.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Year</span>
                <span className="text-sm font-medium">{student.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Semester</span>
                <span className="text-sm font-medium">{student.semester}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Attendance</span>
                <Badge variant={student.attendance >= 75 ? "default" : "destructive"}>
                  {student.attendance}%
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">CGPA</span>
                <span className="text-sm font-medium">{student.cgpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Fee Status</span>
                <Badge variant={student.feePaid ? "default" : "destructive"}>
                  {student.feePaid ? "Paid" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 