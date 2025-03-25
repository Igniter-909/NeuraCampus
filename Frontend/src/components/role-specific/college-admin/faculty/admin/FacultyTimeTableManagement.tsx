'use client';

import { useState } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogFooter, DialogTrigger, DialogDescription 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";

// Sample timetable data
const timeSlots = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', 
                  '12:00 PM - 1:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Sample faculty list
const facultyList = [
  { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science" },
  { id: 2, name: "Prof. Michael Chen", department: "Electrical Engineering" },
  { id: 3, name: "Dr. Emily Rodriguez", department: "Mechanical Engineering" },
  { id: 4, name: "Prof. David Kim", department: "Civil Engineering" },
  { id: 5, name: "Dr. Lisa Wang", department: "Information Technology" }
];

// Sample schedule data for a selected faculty
const sampleScheduleData = {
  facultyId: 1,
  schedule: [
    { day: 'Monday', time: '9:00 AM - 10:00 AM', subject: 'Data Structures', room: 'CS-101', batch: 'CSE 2023' },
    { day: 'Monday', time: '11:00 AM - 12:00 PM', subject: 'Database Systems', room: 'CS-102', batch: 'CSE 2022' },
    { day: 'Tuesday', time: '10:00 AM - 11:00 AM', subject: 'Algorithms', room: 'CS-103', batch: 'CSE 2023' },
    { day: 'Wednesday', time: '2:00 PM - 3:00 PM', subject: 'Data Structures Lab', room: 'Lab-1', batch: 'CSE 2023' },
    { day: 'Thursday', time: '3:00 PM - 4:00 PM', subject: 'Database Systems', room: 'CS-102', batch: 'CSE 2022' },
    { day: 'Friday', time: '9:00 AM - 10:00 AM', subject: 'Algorithms', room: 'CS-103', batch: 'CSE 2023' }
  ]
};

export function FacultyTimeTableManagement() {
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState(sampleScheduleData);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  // Initialize timetable grid
  const initializeTimetable = () => {
    let timetable: any = {};
    weekDays.forEach(day => {
      timetable[day] = {};
      timeSlots.forEach(slot => {
        timetable[day][slot] = null;
      });
    });
    
    // Fill in classes
    scheduleData.schedule.forEach(entry => {
      if (timetable[entry.day]) {
        timetable[entry.day][entry.time] = entry;
      }
    });
    
    return timetable;
  };

  const timetable = initializeTimetable();

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">Faculty Timetable</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">
                Manage and view faculty teaching schedules
              </CardDescription>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
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
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="cs" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Computer Science</SelectItem>
                  <SelectItem value="ee" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Electrical Engineering</SelectItem>
                  <SelectItem value="me" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                  <SelectValue placeholder="Select Semester" />
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
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Time Slot</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Monday</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Tuesday</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Wednesday</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Thursday</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Friday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((slot) => (
                  <TableRow key={slot} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                    <TableCell className="font-medium text-blue-900 dark:text-blue-200">{slot}</TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">
                      <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
                        <p className="font-medium text-blue-900 dark:text-blue-50">Data Structures</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">Dr. Sarah Johnson</p>
                      </div>
                    </TableCell>
                    {/* Add similar cells for other days */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Schedule Dialog */}
      <Dialog>
        <DialogContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
          <DialogHeader>
            <DialogTitle className="text-blue-900 dark:text-blue-50">Add Schedule</DialogTitle>
            <DialogDescription className="text-blue-600 dark:text-blue-300">
              Add a new class schedule for faculty
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
            {/* Add other form fields */}
          </div>
          <DialogFooter>
            <Button variant="outline" 
              className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
              Cancel
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              Save Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 