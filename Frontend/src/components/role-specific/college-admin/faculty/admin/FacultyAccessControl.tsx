'use client';

import { useState } from 'react';
import { 
  Search, Shield, CheckCircle, XCircle, Lock, 
  Eye, Key, AlertCircle, RefreshCw, LogOut, Plus, Edit, MoreHorizontal
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Sample faculty data
const facultyList = [
  { 
    id: 1, 
    name: "Dr. Sarah Johnson", 
    department: "Computer Science", 
    email: "sarah.johnson@neuracampus.edu",
    position: "Associate Professor",
    accountStatus: "active",
    lastLogin: "2024-03-10T15:30:00",
    lastIp: "192.168.1.24"
  },
  { 
    id: 2, 
    name: "Prof. Michael Chen", 
    department: "Electrical Engineering",
    email: "michael.chen@neuracampus.edu",
    position: "Professor",
    accountStatus: "active",
    lastLogin: "2024-03-15T09:45:00",
    lastIp: "192.168.1.57"
  },
  { 
    id: 3, 
    name: "Dr. Emily Rodriguez", 
    department: "Mechanical Engineering",
    email: "emily.rodriguez@neuracampus.edu",
    position: "Assistant Professor",
    accountStatus: "inactive",
    lastLogin: "2024-02-28T11:20:00",
    lastIp: "192.168.1.89"
  },
  { 
    id: 4, 
    name: "Prof. David Kim", 
    department: "Civil Engineering",
    email: "david.kim@neuracampus.edu",
    position: "Professor",
    accountStatus: "locked",
    lastLogin: "2024-03-05T14:10:00",
    lastIp: "192.168.1.112"
  },
  { 
    id: 5, 
    name: "Dr. Lisa Wang", 
    department: "Information Technology",
    email: "lisa.wang@neuracampus.edu",
    position: "Assistant Professor",
    accountStatus: "active",
    lastLogin: "2024-03-14T16:25:00",
    lastIp: "192.168.1.45"
  }
];

// Faculty permissions/roles
const facultyPermissions = [
  { 
    facultyId: 1, 
    canViewAllStudents: true,
    canEditGrades: true,
    canAccessReports: true,
    canAccessLibrary: true,
    canAccessLabs: true,
    canCreateAssignments: true,
    canManageAttendance: true,
    isHOD: false,
    isExamCoordinator: true,
    isDepartmentAdmin: false,
    customRoles: ["Academic Committee Member"]
  },
  { 
    facultyId: 2, 
    canViewAllStudents: true,
    canEditGrades: true,
    canAccessReports: true,
    canAccessLibrary: true,
    canAccessLabs: true,
    canCreateAssignments: true,
    canManageAttendance: true,
    isHOD: true,
    isExamCoordinator: false,
    isDepartmentAdmin: true,
    customRoles: ["Research Committee Head"]
  },
  { 
    facultyId: 3, 
    canViewAllStudents: true,
    canEditGrades: true,
    canAccessReports: false,
    canAccessLibrary: true,
    canAccessLabs: true,
    canCreateAssignments: true,
    canManageAttendance: true,
    isHOD: false,
    isExamCoordinator: false,
    isDepartmentAdmin: false,
    customRoles: []
  },
  { 
    facultyId: 4, 
    canViewAllStudents: true,
    canEditGrades: true,
    canAccessReports: true,
    canAccessLibrary: true,
    canAccessLabs: true,
    canCreateAssignments: true,
    canManageAttendance: true,
    isHOD: false,
    isExamCoordinator: false,
    isDepartmentAdmin: false,
    customRoles: ["Placement Coordinator"]
  },
  { 
    facultyId: 5, 
    canViewAllStudents: true,
    canEditGrades: true,
    canAccessReports: false,
    canAccessLibrary: true,
    canAccessLabs: true,
    canCreateAssignments: true,
    canManageAttendance: true,
    isHOD: false,
    isExamCoordinator: false,
    isDepartmentAdmin: false,
    customRoles: ["IT Infrastructure Committee"]
  }
];

// Login history
const loginHistory = [
  { id: 1, facultyId: 1, timestamp: "2024-03-10T15:30:00", ipAddress: "192.168.1.24", device: "Windows / Chrome", status: "success" },
  { id: 2, facultyId: 1, timestamp: "2024-03-08T10:15:00", ipAddress: "192.168.1.24", device: "Windows / Chrome", status: "success" },
  { id: 3, facultyId: 2, timestamp: "2024-03-15T09:45:00", ipAddress: "192.168.1.57", device: "MacOS / Safari", status: "success" },
  { id: 4, facultyId: 3, timestamp: "2024-02-28T11:20:00", ipAddress: "192.168.1.89", device: "Windows / Edge", status: "success" },
  { id: 5, facultyId: 4, timestamp: "2024-03-05T14:10:00", ipAddress: "192.168.1.112", device: "Android / Chrome", status: "success" },
  { id: 6, facultyId: 4, timestamp: "2024-03-05T14:05:00", ipAddress: "192.168.1.112", device: "Android / Chrome", status: "failed" },
  { id: 7, facultyId: 4, timestamp: "2024-03-05T14:00:00", ipAddress: "192.168.1.112", device: "Android / Chrome", status: "failed" },
  { id: 8, facultyId: 5, timestamp: "2024-03-14T16:25:00", ipAddress: "192.168.1.45", device: "Windows / Firefox", status: "success" }
];

interface FacultyPermissions {
  facultyId: number;
  canViewAllStudents: boolean;
  canEditGrades: boolean;
  canAccessReports: boolean;
  canAccessLibrary: boolean;
  canAccessLabs: boolean;
  canCreateAssignments: boolean;
  canManageAttendance: boolean;
  isHOD: boolean;
  isExamCoordinator: boolean;
  isDepartmentAdmin: boolean;
  customRoles: string[];
}

function calculateAccessLevel(permissions: FacultyPermissions | undefined) {
  if (!permissions) return "none";
  
  if (permissions.isDepartmentAdmin || permissions.isHOD) {
    return "full";
  } else if (permissions.canViewAllStudents || permissions.canEditGrades || permissions.canAccessReports) {
    return "restricted";
  } else {
    return "none";
  }
}

export function FacultyAccessControl() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [showLockDialog, setShowLockDialog] = useState(false);
  
  // Get faculty details by ID
  const getFacultyById = (id: number) => {
    return facultyList.find(faculty => faculty.id === id);
  };
  
  // Get faculty permissions by ID
  const getFacultyPermissions = (id: number) => {
    return facultyPermissions.find(perm => perm.facultyId === id);
  };
  
  // Get login history for a faculty
  const getFacultyLoginHistory = (id: number) => {
    return loginHistory
      .filter(log => log.facultyId === id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Get status badge based on account status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'locked':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Locked</Badge>;
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
      faculty.email,
      faculty.accountStatus
    ].join(" ").toLowerCase();
    
    return searchFields.includes(searchQuery.toLowerCase());
  });

  // Handle editing faculty permissions
  const handleEditPermissions = (faculty: any) => {
    setSelectedFaculty(faculty);
    setShowEditDialog(true);
  };
  
  // Handle resetting password
  const handleResetPassword = (faculty: any) => {
    setSelectedFaculty(faculty);
    setShowResetDialog(true);
  };
  
  // Handle viewing login history
  const handleViewLoginHistory = (faculty: any) => {
    setSelectedFaculty(faculty);
    setShowLoginHistory(true);
  };
  
  // Handle locking/unlocking account
  const handleToggleLock = (faculty: any) => {
    setSelectedFaculty(faculty);
    setShowLockDialog(true);
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">Access Control</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">
                Manage faculty access permissions and roles
              </CardDescription>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Role
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
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="admin" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Admin</SelectItem>
                  <SelectItem value="faculty" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Faculty</SelectItem>
                  <SelectItem value="hod" className="dark:text-blue-50 dark:hover:bg-blue-950/30">HOD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50/50 dark:bg-blue-950/20">
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Faculty</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Department</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Role</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Access Level</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Status</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((faculty) => (
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
                          <p className="text-sm text-blue-600 dark:text-blue-300">{faculty.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">{faculty.department}</TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">{faculty.position}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          calculateAccessLevel(getFacultyPermissions(faculty.id)) === "full"
                            ? "bg-green-50 text-green-900 border-green-300 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/50"
                            : calculateAccessLevel(getFacultyPermissions(faculty.id)) === "restricted"
                            ? "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50"
                            : "bg-red-50 text-red-900 border-red-300 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/50"
                        }
                      >
                        {calculateAccessLevel(getFacultyPermissions(faculty.id))}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          faculty.accountStatus === "active"
                            ? "bg-green-50 text-green-900 border-green-300 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/50"
                            : "bg-red-50 text-red-900 border-red-300 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/50"
                        }
                      >
                        {faculty.accountStatus}
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
                            Edit Access
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30">
                            <Lock className="mr-2 h-4 w-4" />
                            Revoke Access
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

      {/* Edit Permissions Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg">
          {selectedFaculty && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Access Permissions</DialogTitle>
                <DialogDescription>
                  Manage access permissions for {selectedFaculty.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">System Roles</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="is-hod" />
                      <Label htmlFor="is-hod">Head of Department</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="is-exam-coordinator" />
                      <Label htmlFor="is-exam-coordinator">Exam Coordinator</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="is-dept-admin" />
                      <Label htmlFor="is-dept-admin">Department Admin</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">System Permissions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="view-all-students" defaultChecked />
                      <Label htmlFor="view-all-students">View All Students</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="edit-grades" defaultChecked />
                      <Label htmlFor="edit-grades">Edit Grades</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-reports" />
                      <Label htmlFor="access-reports">Access Reports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-library" defaultChecked />
                      <Label htmlFor="access-library">Access Library</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="access-labs" defaultChecked />
                      <Label htmlFor="access-labs">Access Labs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="create-assignments" defaultChecked />
                      <Label htmlFor="create-assignments">Create Assignments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="manage-attendance" defaultChecked />
                      <Label htmlFor="manage-attendance">Manage Attendance</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Custom Roles</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Add custom role" className="flex-1" />
                      <Button variant="outline" size="sm">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getFacultyPermissions(selectedFaculty.id)?.customRoles.map((role, index) => (
                        <Badge key={index} variant="secondary" className="px-2 py-1">
                          {role}
                          <button className="ml-1 text-muted-foreground hover:text-foreground">
                            <XCircle className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {getFacultyPermissions(selectedFaculty.id)?.customRoles.length === 0 && (
                        <div className="text-sm text-muted-foreground">No custom roles assigned</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
                <Button onClick={() => setShowEditDialog(false)}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="max-w-md">
          {selectedFaculty && (
            <>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Reset password for {selectedFaculty.name}. A temporary password will be sent to their email address.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="force-change" defaultChecked />
                  <Label htmlFor="force-change">Force password change on next login</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-confirmation">Confirm faculty email</Label>
                  <Input id="email-confirmation" value={selectedFaculty.email} readOnly />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowResetDialog(false)}>Cancel</Button>
                <Button onClick={() => setShowResetDialog(false)}>Reset Password</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Login History Dialog */}
      <Dialog open={showLoginHistory} onOpenChange={setShowLoginHistory}>
        <DialogContent className="max-w-2xl">
          {selectedFaculty && (
            <>
              <DialogHeader>
                <DialogTitle>Login History</DialogTitle>
                <DialogDescription>
                  Recent login activity for {selectedFaculty.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Device / Browser</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFacultyLoginHistory(selectedFaculty.id).map(log => (
                      <TableRow key={log.id}>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>{log.device}</TableCell>
                        <TableCell>
                          {log.status === "success" ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Success
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <XCircle className="h-4 w-4 mr-1" />
                              Failed
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setShowLoginHistory(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Lock/Unlock Account Dialog */}
      <Dialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <DialogContent className="max-w-md">
          {selectedFaculty && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedFaculty.accountStatus === "locked" ? "Unlock Account" : "Lock Account"}
                </DialogTitle>
                <DialogDescription>
                  {selectedFaculty.accountStatus === "locked" 
                    ? `Unlock access for ${selectedFaculty.name}. This will allow them to log in again.` 
                    : `Lock access for ${selectedFaculty.name}. This will prevent them from logging in.`}
                </DialogDescription>
              </DialogHeader>
              
              {selectedFaculty.accountStatus === "locked" ? (
                <div className="py-4 flex items-center justify-center text-center">
                  <div className="space-y-3">
                    <AlertCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <p>Are you sure you want to unlock this account?</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-center text-center">
                    <div className="space-y-3">
                      <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
                      <p>Are you sure you want to lock this account?</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lock-reason">Reason (optional)</Label>
                    <Input id="lock-reason" placeholder="Enter reason for locking the account" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-faculty" defaultChecked />
                    <Label htmlFor="notify-faculty">Notify faculty via email</Label>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowLockDialog(false)}>Cancel</Button>
                <Button 
                  variant={selectedFaculty.accountStatus === "locked" ? "default" : "destructive"}
                  onClick={() => setShowLockDialog(false)}
                >
                  {selectedFaculty.accountStatus === "locked" ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Unlock Account
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      Lock Account
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 