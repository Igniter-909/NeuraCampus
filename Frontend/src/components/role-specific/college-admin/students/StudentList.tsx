"use client"

import { Student } from "@/types/student"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

interface StudentListProps {
  students: Student[]
  onViewStudent: (student: Student) => void
  onEditStudent: (student: Student) => void
  onDeleteStudent: (studentId: string) => void
}

export default function StudentList({ students, onViewStudent, onEditStudent, onDeleteStudent }: StudentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>CGPA</TableHead>
          <TableHead>Fee Status</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.image} alt={student.name} />
                  <AvatarFallback>{student.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.enrollmentNumber}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{student.department}</TableCell>
            <TableCell>{student.year}</TableCell>
            <TableCell>{student.semester}</TableCell>
            <TableCell>
              <Badge variant={student.attendance >= 75 ? "default" : "destructive"}>
                {student.attendance}%
              </Badge>
            </TableCell>
            <TableCell>{student.cgpa}</TableCell>
            <TableCell>
              <Badge variant={student.feePaid ? "default" : "destructive"}>
                {student.feePaid ? "Paid" : "Pending"}
              </Badge>
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 