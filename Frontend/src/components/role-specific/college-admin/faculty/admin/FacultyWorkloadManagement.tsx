'use client';

import { useState } from 'react';
import { 
  CalendarDays, Book, ClipboardList, Clock, 
  Calendar, DollarSign, ShieldCheck, Download, Plus, Eye, Edit, History,
  Search, MoreHorizontal, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Input 
} from "@/components/ui/input";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock data - replace with actual data fetching in production
const facultyWorkloadData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    courses: [
      { id: 1, code: "CS301", name: "Data Structures", credits: 4, students: 42 },
      { id: 2, code: "CS405", name: "Database Systems", credits: 3, students: 38 }
    ],
    classes_per_week: 12,
    attendance: 98,
    pending_classes: 0
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    department: "Electrical Engineering",
    courses: [
      { id: 3, code: "EE201", name: "Circuit Theory", credits: 4, students: 36 },
      { id: 4, code: "EE304", name: "Digital Electronics", credits: 3, students: 40 },
      { id: 5, code: "EE405", name: "Power Systems", credits: 4, students: 32 }
    ],
    classes_per_week: 18,
    attendance: 96,
    pending_classes: 2
  }
];

const leaveRequests = [
  {
    id: 1,
    faculty_name: "Dr. James Wilson",
    department: "Physics",
    type: "Medical Leave",
    from_date: "2023-06-10",
    to_date: "2023-06-15",
    reason: "Scheduled surgery",
    status: "pending"
  },
  {
    id: 2,
    faculty_name: "Prof. Michael Chen",
    department: "Electrical Engineering",
    type: "Conference Leave",
    from_date: "2023-06-20",
    to_date: "2023-06-22",
    reason: "Presenting research paper at IEEE conference",
    status: "approved"
  }
];

export function FacultyWorkloadManagement() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">Workload Management</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">
                Monitor and manage faculty teaching hours and assignments
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" 
                className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Assign Workload
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-900/50 dark:text-blue-300" />
                <Input
                  placeholder="Search faculty..."
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
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Faculty</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Department</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Teaching Hours</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Courses</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Status</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyWorkloadData.map((faculty) => (
                  <TableRow key={faculty.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-blue-900 text-white dark:bg-blue-800/90 dark:text-blue-50 font-medium">
                            {faculty.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                        </Avatar>
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-50">{faculty.name}</p>
                          <p className="text-sm text-blue-600 dark:text-blue-300">{faculty.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">{faculty.department}</TableCell>
                    <TableCell>
                      <div className="text-blue-800 dark:text-blue-200">
                        <p>{faculty.classes_per_week} hrs/week</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          {faculty.classes_per_week >= 18 ? 'Full Load' : 'Partial Load'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {faculty.courses.map((course, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50"
                          >
                            {course.code}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          faculty.attendance > 95 
                            ? "bg-green-50 text-green-900 border-green-300 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/50"
                            : faculty.attendance > 85
                              ? "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50"
                              : "bg-red-50 text-red-900 border-red-300 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/50"
                        }
                      >
                        {faculty.attendance}%
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Workload
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30">
                            <History className="mr-2 h-4 w-4" />
                            View History
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

      {/* Assign Workload Dialog */}
      <Dialog>
        <DialogContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
          <DialogHeader>
            <DialogTitle className="text-blue-900 dark:text-blue-50">Assign Workload</DialogTitle>
            <DialogDescription className="text-blue-600 dark:text-blue-300">
              Assign teaching hours and courses to faculty
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-blue-900 dark:text-blue-200">Teaching Hours</label>
              <Input 
                type="number" 
                placeholder="Hours per week" 
                className="col-span-3 border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-blue-900 dark:text-blue-200">Courses</label>
              <div className="col-span-3 space-y-2">
                <Select>
                  <SelectTrigger className="w-full border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                    <SelectValue placeholder="Select Courses" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                    {/* Add course options */}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  <Badge 
                    variant="outline" 
                    className="bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50"
                  >
                    CS101
                    <Button variant="ghost" className="h-4 w-4 p-0 hover:bg-transparent">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" 
              className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
              Cancel
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 