'use client';

import { useState } from 'react';
import { 
  Search, Filter, ChevronDown, Plus, Edit, Trash, 
  BookOpen, GraduationCap, Users, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogFooter, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Sample data
const facultyList = [
  { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science", expertise: ["Programming", "Machine Learning", "Databases"] },
  { id: 2, name: "Prof. Michael Chen", department: "Electrical Engineering", expertise: ["Circuit Design", "Power Systems", "Electronics"] },
  { id: 3, name: "Dr. Emily Rodriguez", department: "Mechanical Engineering", expertise: ["Fluid Mechanics", "Thermodynamics", "Materials"] },
  { id: 4, name: "Prof. David Kim", department: "Civil Engineering", expertise: ["Structural Design", "Environmental Engineering", "Construction"] },
  { id: 5, name: "Dr. Lisa Wang", department: "Information Technology", expertise: ["Web Development", "Software Engineering", "Data Science"] }
];

const courseList = [
  { id: 1, code: "CS101", name: "Introduction to Programming", department: "Computer Science", credits: 4, semester: 1 },
  { id: 2, code: "CS201", name: "Data Structures", department: "Computer Science", credits: 4, semester: 3 },
  { id: 3, code: "CS301", name: "Database Systems", department: "Computer Science", credits: 3, semester: 5 },
  { id: 4, code: "CS401", name: "Machine Learning", department: "Computer Science", credits: 4, semester: 7 },
  { id: 5, code: "EE101", name: "Basic Electronics", department: "Electrical Engineering", credits: 4, semester: 1 },
  { id: 6, code: "EE201", name: "Digital Circuits", department: "Electrical Engineering", credits: 3, semester: 3 },
  { id: 7, code: "ME101", name: "Engineering Mechanics", department: "Mechanical Engineering", credits: 4, semester: 1 },
  { id: 8, code: "IT201", name: "Web Development", department: "Information Technology", credits: 3, semester: 3 }
];

const assignedCourses = [
  { id: 1, facultyId: 1, courseId: 1, academicYear: "2023-2024", section: "A", students: 45 },
  { id: 2, facultyId: 1, courseId: 2, academicYear: "2023-2024", section: "B", students: 40 },
  { id: 3, facultyId: 2, courseId: 5, academicYear: "2023-2024", section: "A", students: 50 },
  { id: 4, facultyId: 3, courseId: 7, academicYear: "2023-2024", section: "C", students: 38 },
  { id: 5, facultyId: 5, courseId: 8, academicYear: "2023-2024", section: "B", students: 42 }
];

export function FacultyCourseManagement() {
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [academicYear, setAcademicYear] = useState("2023-2024");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Get faculty details by ID
  const getFacultyById = (id: number) => {
    return facultyList.find(faculty => faculty.id === id);
  };

  // Get course details by ID
  const getCourseById = (id: number) => {
    return courseList.find(course => course.id === id);
  };

  // Filter assigned courses for the selected faculty
  const getFacultyCourses = () => {
    if (!selectedFaculty) return [];
    return assignedCourses
      .filter(assignment => assignment.facultyId === selectedFaculty)
      .map(assignment => {
        const course = getCourseById(assignment.courseId);
        return {
          ...assignment,
          course
        };
      });
  };

  // Filter available courses that can be assigned to faculty
  const getAvailableCourses = () => {
    // Get IDs of courses already assigned to the faculty
    const assignedCourseIds = assignedCourses
      .filter(assignment => assignment.facultyId === selectedFaculty)
      .map(assignment => assignment.courseId);
    
    // Return courses not yet assigned to this faculty
    return courseList.filter(course => !assignedCourseIds.includes(course.id));
  };

  const facultyCourses = getFacultyCourses();
  const availableCourses = getAvailableCourses();

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">Course Assignments</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">
                Manage faculty course assignments and teaching loads
              </CardDescription>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Assign Course
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-900/50 dark:text-blue-300" />
                <Input
                  placeholder="Search courses or faculty..."
                  className="pl-8 w-full border-blue-200 focus:border-blue-900 transition-colors dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:placeholder-blue-300/50"
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="cs" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Computer Science</SelectItem>
                  <SelectItem value="ee" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Electrical Engineering</SelectItem>
                  <SelectItem value="me" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="1" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Semester 1</SelectItem>
                  <SelectItem value="2" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Semester 2</SelectItem>
                  <SelectItem value="3" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Semester 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50/50 dark:bg-blue-950/20">
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Course</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Faculty</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Department</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Semester</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Status</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyCourses.map((course) => (
                  <TableRow key={course.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-50">{course.course?.name}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">{course.course?.code}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-blue-900 text-white dark:bg-blue-800/90 dark:text-blue-50 font-medium">
                            {getFacultyById(course.facultyId)?.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </Avatar>
                        <span className="text-blue-900 dark:text-blue-200">{getFacultyById(course.facultyId)?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">{getFacultyById(course.facultyId)?.department}</TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">{course.course?.semester}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          course.status === "active" 
                            ? "bg-green-50 text-green-900 border-green-300 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/50" 
                            : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50"
                        }
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 text-blue-900 dark:text-blue-300" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-blue-100 dark:bg-gray-800/95 dark:border-blue-900/50">
                          <DropdownMenuItem className="cursor-pointer text-blue-900 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30">
                            <Trash className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Course Dialog */}
      <Dialog>
        <DialogContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
          <DialogHeader>
            <DialogTitle className="text-blue-900 dark:text-blue-50">Assign Course</DialogTitle>
            <DialogDescription className="text-blue-600 dark:text-blue-300">
              Assign a course to faculty member
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-blue-900 dark:text-blue-200">Course</label>
              <Select>
                <SelectTrigger className="col-span-3 border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  {/* Add course options */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-blue-900 dark:text-blue-200">Faculty</label>
              <Select>
                <SelectTrigger className="col-span-3 border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                  <SelectValue placeholder="Select Faculty" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  {/* Add faculty options */}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" 
              className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
              Cancel
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              Assign Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 