'use client';

import { useState } from 'react';
import { 
  Search, Filter, Check, X, Clock, 
  AlertCircle, CalendarDays, Calendar as CalendarIcon, Plus, MoreHorizontal, Eye 
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
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for faculty members
const facultyList = [
  { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science", image: "/avatars/faculty-1.jpg" },
  { id: 2, name: "Prof. Michael Chen", department: "Electrical Engineering", image: "/avatars/faculty-2.jpg" },
  { id: 3, name: "Dr. Emily Rodriguez", department: "Mechanical Engineering", image: "/avatars/faculty-3.jpg" },
  { id: 4, name: "Prof. David Kim", department: "Civil Engineering", image: "/avatars/faculty-4.jpg" },
  { id: 5, name: "Dr. Lisa Wang", department: "Information Technology", image: "/avatars/faculty-5.jpg" }
];

// Mock data for leave requests
const leaveRequests = [
  { 
    id: 1, 
    facultyId: 1, 
    type: "Sick Leave", 
    startDate: "2023-11-15", 
    endDate: "2023-11-18", 
    reason: "Medical treatment", 
    status: "approved", 
    appliedOn: "2023-11-10" 
  },
  { 
    id: 2, 
    facultyId: 2, 
    type: "Casual Leave", 
    startDate: "2023-12-05", 
    endDate: "2023-12-07", 
    reason: "Family function", 
    status: "rejected", 
    appliedOn: "2023-11-25",
    rejectionReason: "Faculty required for end semester evaluations" 
  },
  { 
    id: 3, 
    facultyId: 3, 
    type: "Academic Leave", 
    startDate: "2023-12-10", 
    endDate: "2023-12-15", 
    reason: "Attending conference in Boston", 
    status: "pending", 
    appliedOn: "2023-11-30" 
  },
  { 
    id: 4, 
    facultyId: 1, 
    type: "Casual Leave", 
    startDate: "2024-01-02", 
    endDate: "2024-01-03", 
    reason: "Personal work", 
    status: "pending", 
    appliedOn: "2023-12-20" 
  },
  { 
    id: 5, 
    facultyId: 5, 
    type: "Academic Leave", 
    startDate: "2024-01-15", 
    endDate: "2024-01-20", 
    reason: "Workshop at partner university", 
    status: "pending", 
    appliedOn: "2023-12-22" 
  }
];

// Leave balance of faculty members
const leaveBalances = [
  { facultyId: 1, casual: 8, sick: 10, academic: 15, earned: 30 },
  { facultyId: 2, casual: 10, sick: 12, academic: 10, earned: 30 },
  { facultyId: 3, casual: 6, sick: 12, academic: 8, earned: 30 },
  { facultyId: 4, casual: 10, sick: 15, academic: 15, earned: 30 },
  { facultyId: 5, casual: 7, sick: 10, academic: 10, earned: 30 }
];

export function FacultyLeaveManagement() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeaveDetails, setShowLeaveDetails] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  // Filter leave requests based on active tab and search query
  const getFilteredLeaveRequests = () => {
    return leaveRequests
      .filter(request => {
        // Filter by status
        if (activeTab !== "all" && request.status !== activeTab) return false;
        
        // Filter by search query
        if (searchQuery) {
          const faculty = getFacultyById(request.facultyId);
          const searchText = (faculty?.name || "") + request.type + request.reason;
          return searchText.toLowerCase().includes(searchQuery.toLowerCase());
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by applied date (most recent first) for pending requests
        if (activeTab === "pending") {
          return new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime();
        }
        // Sort by start date (most recent first) for other tabs
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
  };
  
  // Get faculty details by ID
  const getFacultyById = (id: number) => {
    return facultyList.find(faculty => faculty.id === id);
  };
  
  // Get leave balance for a faculty
  const getLeaveBalance = (facultyId: number) => {
    return leaveBalances.find(balance => balance.facultyId === facultyId);
  };
  
  // Calculate duration of leave in days
  const calculateLeaveDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start day
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get status badge based on leave status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Handle opening leave details
  const handleViewLeaveDetails = (leaveRequest: any) => {
    setSelectedLeave(leaveRequest);
    setShowLeaveDetails(true);
  };
  
  // Handle approving a leave request
  const handleApproveLeave = () => {
    // Implement API call to approve leave
    console.log(`Approving leave request #${selectedLeave.id}`);
    setShowApproveDialog(false);
    setShowLeaveDetails(false);
  };
  
  // Handle rejecting a leave request
  const handleRejectLeave = () => {
    if (!rejectionReason.trim()) return;
    
    // Implement API call to reject leave
    console.log(`Rejecting leave request #${selectedLeave.id} with reason: ${rejectionReason}`);
    setShowRejectDialog(false);
    setShowLeaveDetails(false);
    setRejectionReason("");
  };
  
  const filteredLeaveRequests = getFilteredLeaveRequests();

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">Leave Requests</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">
                Manage and track faculty leave requests
              </CardDescription>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Request
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
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="pending" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Pending</SelectItem>
                  <SelectItem value="approved" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Approved</SelectItem>
                  <SelectItem value="rejected" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                  <SelectValue placeholder="Leave Type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="sick" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Sick Leave</SelectItem>
                  <SelectItem value="vacation" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Vacation</SelectItem>
                  <SelectItem value="personal" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50/50 dark:bg-blue-950/20">
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Faculty</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Leave Type</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Duration</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Status</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaveRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-blue-900 text-white dark:bg-blue-800/90 dark:text-blue-50 font-medium">
                            {getFacultyById(request.facultyId)?.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-50">{getFacultyById(request.facultyId)?.name}</p>
                          <p className="text-sm text-blue-600 dark:text-blue-300">{getFacultyById(request.facultyId)?.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">{request.type}</TableCell>
                    <TableCell>
                      <div className="text-blue-800 dark:text-blue-200">
                        <p>{formatDate(request.startDate)} - {formatDate(request.endDate)}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">{calculateLeaveDuration(request.startDate, request.endDate)} days</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          request.status === "approved"
                            ? "bg-green-50 text-green-900 border-green-300 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/50"
                            : request.status === "rejected"
                            ? "bg-red-50 text-red-900 border-red-300 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/50"
                            : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50"
                        }
                      >
                        {getStatusBadge(request.status)}
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
                          <DropdownMenuItem className="cursor-pointer text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/30">
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30">
                            <X className="mr-2 h-4 w-4" />
                            Reject
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

      {/* Leave Details Dialog */}
      <Dialog open={showLeaveDetails} onOpenChange={setShowLeaveDetails}>
        <DialogContent className="max-w-md">
          {selectedLeave && (
            <>
              <DialogHeader>
                <DialogTitle>Leave Request Details</DialogTitle>
                <DialogDescription>
                  Request #{selectedLeave.id} submitted on {formatDate(selectedLeave.appliedOn)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium">
                      {getFacultyById(selectedLeave.facultyId)?.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-medium">{getFacultyById(selectedLeave.facultyId)?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {getFacultyById(selectedLeave.facultyId)?.department}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Leave Type</div>
                    <div>{selectedLeave.type}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Status</div>
                    <div>{getStatusBadge(selectedLeave.status)}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Duration</div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>
                      {formatDate(selectedLeave.startDate)} - {formatDate(selectedLeave.endDate)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {calculateLeaveDuration(selectedLeave.startDate, selectedLeave.endDate)} days
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Reason</div>
                  <div className="text-sm">{selectedLeave.reason}</div>
                </div>
                
                {selectedLeave.status === 'rejected' && selectedLeave.rejectionReason && (
                  <div>
                    <div className="text-sm font-medium mb-1 text-red-600">Rejection Reason</div>
                    <div className="text-sm p-2 bg-red-50 border border-red-100 rounded">
                      {selectedLeave.rejectionReason}
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm font-medium mb-1">Leave Balance</div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <div className="text-xs text-muted-foreground">Casual</div>
                      <div className="font-medium">{getLeaveBalance(selectedLeave.facultyId)?.casual}</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded-md">
                      <div className="text-xs text-muted-foreground">Sick</div>
                      <div className="font-medium">{getLeaveBalance(selectedLeave.facultyId)?.sick}</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-md">
                      <div className="text-xs text-muted-foreground">Academic</div>
                      <div className="font-medium">{getLeaveBalance(selectedLeave.facultyId)?.academic}</div>
                    </div>
                    <div className="p-2 bg-orange-50 rounded-md">
                      <div className="text-xs text-muted-foreground">Earned</div>
                      <div className="font-medium">{getLeaveBalance(selectedLeave.facultyId)?.earned}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedLeave.status === 'pending' && (
                <DialogFooter className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      setShowLeaveDetails(false);
                      setShowRejectDialog(true);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setShowLeaveDetails(false);
                      setShowApproveDialog(true);
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Leave Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this leave request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>Cancel</Button>
            <Button onClick={handleApproveLeave}>Confirm Approval</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Leave Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this leave request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Rejection</label>
              <Input
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection"
              />
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectLeave}
              disabled={!rejectionReason.trim()}
            >
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 