'use client';

import { useState } from 'react';
import { 
  Search, PlusCircle, Edit, Trash, MoreHorizontal, 
  Mail, Phone, GraduationCap, CalendarClock 
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
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogFooter, DialogTrigger 
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";

// Mock data - replace with actual data fetching in production
const facultyData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@neuracampus.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    designation: "Associate Professor",
    joining_date: "2018-05-15",
    subjects: ["Data Structures", "Algorithms", "Database Systems"],
    status: "active"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@neuracampus.edu",
    phone: "+1 (555) 234-5678",
    department: "Electrical Engineering",
    designation: "Professor",
    joining_date: "2015-08-10",
    subjects: ["Circuit Theory", "Digital Electronics", "Power Systems"],
    status: "active"
  },
  {
    id: 3,
    name: "Dr. Rebecca Williams",
    email: "rebecca.williams@neuracampus.edu",
    phone: "+1 (555) 345-6789",
    department: "Mathematics",
    designation: "Assistant Professor",
    joining_date: "2020-01-20",
    subjects: ["Calculus", "Linear Algebra", "Differential Equations"],
    status: "active"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    email: "james.wilson@neuracampus.edu",
    phone: "+1 (555) 456-7890",
    department: "Physics",
    designation: "Associate Professor",
    joining_date: "2017-09-05",
    subjects: ["Mechanics", "Electromagnetism", "Quantum Physics"],
    status: "on-leave"
  }
];

export function FacultyManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editFaculty, setEditFaculty] = useState<null | typeof facultyData[0]>(null);

  const filteredFaculty = facultyData.filter(
    faculty => faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
               faculty.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">      
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="flex flex-row items-center justify-between bg-blue-50/50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900/50">
          <CardTitle className="text-blue-900 dark:text-blue-50">Faculty Directory</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-900/50 dark:text-blue-300" />
              <Input
                placeholder="Search faculty..."
                className="pl-8 w-[300px] border-blue-200 focus:border-blue-900 transition-colors dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:placeholder-blue-300/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white flex items-center transition-colors">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                <DialogHeader>
                  <DialogTitle className="text-blue-900 dark:text-blue-50">Add New Faculty</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right text-blue-900 dark:text-blue-200">Name</label>
                    <Input id="name" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" placeholder="Full Name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right text-blue-900 dark:text-blue-200">Email</label>
                    <Input id="email" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" placeholder="Email Address" type="email" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="phone" className="text-right text-blue-900 dark:text-blue-200">Phone</label>
                    <Input id="phone" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" placeholder="Phone Number" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="department" className="text-right text-blue-900 dark:text-blue-200">Department</label>
                    <Input id="department" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" placeholder="Department" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="designation" className="text-right text-blue-900 dark:text-blue-200">Designation</label>
                    <Input id="designation" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" placeholder="Designation" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenAddDialog(false)} 
                    className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
                    Cancel
                  </Button>
                  <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50/50 dark:bg-blue-950/20">
                <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Faculty</TableHead>
                <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Department</TableHead>
                <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Designation</TableHead>
                <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Status</TableHead>
                <TableHead className="text-blue-900 dark:text-blue-50 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow key={faculty.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <div className="flex h-full w-full items-center justify-center bg-blue-900 text-white dark:bg-blue-800/90 dark:text-blue-50 font-medium">
                          {faculty.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-50">{faculty.name}</p>
                        <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                          <Mail className="mr-1 h-3 w-3" />
                          {faculty.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-900 dark:text-blue-200">{faculty.department}</TableCell>
                  <TableCell className="text-blue-900 dark:text-blue-200">{faculty.designation}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        faculty.status === "active" 
                          ? "bg-green-50 text-green-900 border-green-300 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/50" 
                          : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50"
                      }
                    >
                      {faculty.status === "active" ? "Active" : "On Leave"}
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
                        <DialogTrigger asChild>
                          <DropdownMenuItem 
                            onClick={() => setEditFaculty(faculty)}
                            className="cursor-pointer text-blue-900 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Faculty Dialog */}
      <Dialog open={!!editFaculty} onOpenChange={(open) => !open && setEditFaculty(null)}>
        <DialogContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
          <DialogHeader>
            <DialogTitle className="text-blue-900 dark:text-blue-50">Edit Faculty</DialogTitle>
          </DialogHeader>
          {editFaculty && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right text-blue-900 dark:text-blue-200">Name</label>
                <Input id="edit-name" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" defaultValue={editFaculty.name} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-email" className="text-right text-blue-900 dark:text-blue-200">Email</label>
                <Input id="edit-email" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" defaultValue={editFaculty.email} type="email" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-phone" className="text-right text-blue-900 dark:text-blue-200">Phone</label>
                <Input id="edit-phone" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" defaultValue={editFaculty.phone} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-department" className="text-right text-blue-900 dark:text-blue-200">Department</label>
                <Input id="edit-department" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" defaultValue={editFaculty.department} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-designation" className="text-right text-blue-900 dark:text-blue-200">Designation</label>
                <Input id="edit-designation" className="col-span-3 border-blue-200 focus:border-blue-900 dark:bg-gray-800/90 dark:border-blue-900/50 dark:text-blue-50 dark:focus:border-blue-700" defaultValue={editFaculty.designation} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditFaculty(null)}
              className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
              Cancel
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 