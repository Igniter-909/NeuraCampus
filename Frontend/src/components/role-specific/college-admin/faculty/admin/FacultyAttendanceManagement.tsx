'use client';

import { useState } from 'react';
import { 
  Search, Download, Calendar, Clock, 
  BarChart3, CalendarDays, ArrowUpDown, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Sample faculty data
const facultyList = [
  { 
    id: 1, 
    name: "Dr. Sarah Johnson", 
    department: "Computer Science", 
    email: "sarah.johnson@neuracampus.edu",
    position: "Associate Professor",
  },
  { 
    id: 2, 
    name: "Prof. Michael Chen", 
    department: "Electrical Engineering",
    email: "michael.chen@neuracampus.edu",
    position: "Professor",
  },
  { 
    id: 3, 
    name: "Dr. Emily Rodriguez", 
    department: "Mechanical Engineering",
    email: "emily.rodriguez@neuracampus.edu",
    position: "Assistant Professor",
  },
  { 
    id: 4, 
    name: "Prof. David Kim", 
    department: "Civil Engineering",
    email: "david.kim@neuracampus.edu",
    position: "Professor",
  },
  { 
    id: 5, 
    name: "Dr. Lisa Wang", 
    department: "Information Technology",
    email: "lisa.wang@neuracampus.edu",
    position: "Assistant Professor",
  }
];

// Sample attendance records
const attendanceData = [
  { facultyId: 1, date: "2024-03-01", checkIn: "09:05:22", checkOut: "17:10:45", status: "present", totalHours: 8.09, remarks: "" },
  { facultyId: 1, date: "2024-03-02", checkIn: "09:12:18", checkOut: "17:05:33", status: "present", totalHours: 7.89, remarks: "" },
  { facultyId: 1, date: "2024-03-03", checkIn: "", checkOut: "", status: "weekend", totalHours: 0, remarks: "Weekend" },
  { facultyId: 1, date: "2024-03-04", checkIn: "", checkOut: "", status: "weekend", totalHours: 0, remarks: "Weekend" },
  { facultyId: 1, date: "2024-03-05", checkIn: "09:30:12", checkOut: "17:30:45", status: "present", totalHours: 8.01, remarks: "" },
  { facultyId: 1, date: "2024-03-06", checkIn: "09:15:32", checkOut: "17:25:11", status: "present", totalHours: 8.16, remarks: "" },
  { facultyId: 1, date: "2024-03-07", checkIn: "", checkOut: "", status: "leave", totalHours: 0, remarks: "Sick Leave" },
  { facultyId: 1, date: "2024-03-08", checkIn: "10:05:22", checkOut: "17:15:45", status: "late", totalHours: 7.17, remarks: "Reported late" },
  { facultyId: 1, date: "2024-03-09", checkIn: "09:10:22", checkOut: "16:45:45", status: "present", totalHours: 7.59, remarks: "" },
  { facultyId: 1, date: "2024-03-10", checkIn: "", checkOut: "", status: "weekend", totalHours: 0, remarks: "Weekend" },
  { facultyId: 1, date: "2024-03-11", checkIn: "", checkOut: "", status: "weekend", totalHours: 0, remarks: "Weekend" },
  { facultyId: 2, date: "2024-03-01", checkIn: "09:00:15", checkOut: "17:05:45", status: "present", totalHours: 8.09, remarks: "" },
  { facultyId: 2, date: "2024-03-02", checkIn: "09:05:10", checkOut: "17:10:37", status: "present", totalHours: 8.09, remarks: "" },
  { facultyId: 2, date: "2024-03-05", checkIn: "09:08:22", checkOut: "17:15:40", status: "present", totalHours: 8.12, remarks: "" },
  { facultyId: 3, date: "2024-03-01", checkIn: "09:30:18", checkOut: "17:20:25", status: "late", totalHours: 7.84, remarks: "Reported late" },
  { facultyId: 3, date: "2024-03-02", checkIn: "09:15:10", checkOut: "17:00:37", status: "present", totalHours: 7.76, remarks: "" },
  { facultyId: 4, date: "2024-03-01", checkIn: "", checkOut: "", status: "absent", totalHours: 0, remarks: "Absent without notice" },
  { facultyId: 4, date: "2024-03-02", checkIn: "09:10:45", checkOut: "17:05:22", status: "present", totalHours: 7.91, remarks: "" },
  { facultyId: 5, date: "2024-03-01", checkIn: "09:00:12", checkOut: "17:00:45", status: "present", totalHours: 8.01, remarks: "" },
  { facultyId: 5, date: "2024-03-02", checkIn: "08:55:32", checkOut: "17:10:15", status: "present", totalHours: 8.24, remarks: "" }
];

// Sample monthly summary
const monthlySummary = [
  { 
    facultyId: 1, 
    month: "March", 
    year: 2024, 
    workingDays: 23, 
    present: 18, 
    absent: 0, 
    leave: 3, 
    late: 2,
    totalHours: 145.5,
    avgHoursPerDay: 8.08,
    attendancePercentage: 91.3
  },
  { 
    facultyId: 2, 
    month: "March", 
    year: 2024, 
    workingDays: 23, 
    present: 22, 
    absent: 0, 
    leave: 1, 
    late: 0,
    totalHours: 176.8,
    avgHoursPerDay: 8.04,
    attendancePercentage: 100
  },
  { 
    facultyId: 3, 
    month: "March", 
    year: 2024, 
    workingDays: 23, 
    present: 20, 
    absent: 0, 
    leave: 2, 
    late: 1,
    totalHours: 162.3,
    avgHoursPerDay: 7.73,
    attendancePercentage: 95.7
  },
  { 
    facultyId: 4, 
    month: "March", 
    year: 2024, 
    workingDays: 23, 
    present: 19, 
    absent: 2, 
    leave: 1, 
    late: 1,
    totalHours: 154.1,
    avgHoursPerDay: 8.11,
    attendancePercentage: 87.0
  },
  { 
    facultyId: 5, 
    month: "March", 
    year: 2024, 
    workingDays: 23, 
    present: 21, 
    absent: 0, 
    leave: 2, 
    late: 0,
    totalHours: 169.5,
    avgHoursPerDay: 8.07,
    attendancePercentage: 95.7
  }
];

export function FacultyAttendanceManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [showAttendanceDetails, setShowAttendanceDetails] = useState(false);
  const [selectedDateRecord, setSelectedDateRecord] = useState<any>(null);
  
  // Get faculty details by ID
  const getFacultyById = (id: number) => {
    return facultyList.find(faculty => faculty.id === id);
  };
  
  // Get monthly summary for a faculty
  const getFacultyMonthlySummary = (facultyId: number, month: string, year: number) => {
    return monthlySummary.find(
      summary => 
        summary.facultyId === facultyId && 
        summary.month === month && 
        summary.year === year
    );
  };
  
  // Get attendance records for a faculty
  const getFacultyAttendanceRecords = (facultyId: number) => {
    return attendanceData
      .filter(record => record.facultyId === facultyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get status badge based on attendance status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Late</Badge>;
      case 'leave':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Leave</Badge>;
      case 'weekend':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Weekend</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Filter faculty list based on search query
  const filteredFaculty = facultyList.filter(faculty => {
    if (!searchQuery) return true;
    
    const searchFields = [
      faculty.name,
      faculty.department,
      faculty.position,
      faculty.email
    ].join(" ").toLowerCase();
    
    return searchFields.includes(searchQuery.toLowerCase());
  });

  // Handle viewing attendance details
  const handleViewAttendanceDetails = (record: any) => {
    setSelectedDateRecord(record);
    setShowAttendanceDetails(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Faculty Attendance Management</CardTitle>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search faculty..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select onValueChange={(value) => setSelectedMonth(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</SelectItem>
              <SelectItem value="April">April</SelectItem>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="June">June</SelectItem>
              <SelectItem value="July">July</SelectItem>
              <SelectItem value="August">August</SelectItem>
              <SelectItem value="September">September</SelectItem>
              <SelectItem value="October">October</SelectItem>
              <SelectItem value="November">November</SelectItem>
              <SelectItem value="December">December</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedYear(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="monthly" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
            <TabsTrigger value="daily">Daily Records</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Leave</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Average Hours/Day</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Attendance %
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 ml-1">
                                <Filter className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Present and Leave days count towards attendance percentage</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaculty.map(faculty => {
                    const summary = getFacultyMonthlySummary(faculty.id, selectedMonth, Number(selectedYear));
                    return (
                      <TableRow key={faculty.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedFaculty(faculty.id)}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium">
                                {faculty.name.charAt(0)}
                              </div>
                            </Avatar>
                            <div>
                              <div className="font-medium">{faculty.name}</div>
                              <div className="text-xs text-muted-foreground">{faculty.department}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-green-600">{summary?.present || 0}</div>
                          <div className="text-xs text-muted-foreground">out of {summary?.workingDays || "N/A"}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-red-600">{summary?.absent || 0}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-blue-600">{summary?.leave || 0}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-yellow-600">{summary?.late || 0}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{summary?.avgHoursPerDay.toFixed(2) || "N/A"}</div>
                          <div className="text-xs text-muted-foreground">hours</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="font-medium">{summary?.attendancePercentage.toFixed(1) || "N/A"}%</div>
                            <Progress 
                              value={summary?.attendancePercentage || 0} 
                              className="h-2" 
                              indicatorClassName={
                                (summary?.attendancePercentage || 0) >= 90 ? "bg-green-500" : 
                                (summary?.attendancePercentage || 0) >= 75 ? "bg-yellow-500" : 
                                "bg-red-500"
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="daily">
            {selectedFaculty ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium">
                        {getFacultyById(selectedFaculty)?.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <div className="text-lg font-medium">{getFacultyById(selectedFaculty)?.name}</div>
                      <div className="text-sm text-muted-foreground">{getFacultyById(selectedFaculty)?.department}</div>
                    </div>
                  </div>
                  
                  {getFacultyMonthlySummary(selectedFaculty, selectedMonth, Number(selectedYear)) && (
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Present</div>
                        <div className="text-xl font-semibold text-green-600">
                          {getFacultyMonthlySummary(selectedFaculty, selectedMonth, Number(selectedYear))?.present || 0}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Absent</div>
                        <div className="text-xl font-semibold text-red-600">
                          {getFacultyMonthlySummary(selectedFaculty, selectedMonth, Number(selectedYear))?.absent || 0}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Leave</div>
                        <div className="text-xl font-semibold text-blue-600">
                          {getFacultyMonthlySummary(selectedFaculty, selectedMonth, Number(selectedYear))?.leave || 0}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Late</div>
                        <div className="text-xl font-semibold text-yellow-600">
                          {getFacultyMonthlySummary(selectedFaculty, selectedMonth, Number(selectedYear))?.late || 0}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total Hours</TableHead>
                        <TableHead>Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFacultyAttendanceRecords(selectedFaculty).map((record, index) => (
                        <TableRow 
                          key={index}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewAttendanceDetails(record)}
                        >
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell>
                            {record.checkIn ? (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                {record.checkIn}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">--:--:--</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {record.checkOut ? (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                {record.checkOut}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">--:--:--</span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell>
                            {record.totalHours > 0 ? (
                              <div className="font-medium">{record.totalHours.toFixed(2)} hrs</div>
                            ) : (
                              <span className="text-muted-foreground">--</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {record.remarks || <span className="text-muted-foreground">No remarks</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <CalendarDays className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p>Select a faculty member from the Monthly Summary tab to view daily attendance records</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Attendance Details Dialog */}
      <Dialog open={showAttendanceDetails} onOpenChange={setShowAttendanceDetails}>
        <DialogContent className="max-w-md">
          {selectedDateRecord && (
            <>
              <DialogHeader>
                <DialogTitle>Attendance Details</DialogTitle>
                <DialogDescription>
                  {formatDate(selectedDateRecord.date)} • {getFacultyById(selectedDateRecord.facultyId)?.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Status</div>
                  <div>{getStatusBadge(selectedDateRecord.status)}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Check In</div>
                    {selectedDateRecord.checkIn ? (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {selectedDateRecord.checkIn}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not recorded</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Check Out</div>
                    {selectedDateRecord.checkOut ? (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {selectedDateRecord.checkOut}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not recorded</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Total Hours</div>
                  {selectedDateRecord.totalHours > 0 ? (
                    <div className="font-medium">{selectedDateRecord.totalHours.toFixed(2)} hours</div>
                  ) : (
                    <span className="text-muted-foreground">No hours recorded</span>
                  )}
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Remarks</div>
                  {selectedDateRecord.remarks ? (
                    <div className="text-sm p-2 bg-gray-50 border rounded">
                      {selectedDateRecord.remarks}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No remarks</span>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAttendanceDetails(false)}>Close</Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Record
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
} 