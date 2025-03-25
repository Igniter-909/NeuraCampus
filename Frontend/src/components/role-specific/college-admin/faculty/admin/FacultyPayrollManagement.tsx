'use client';

import { useState } from 'react';
import { 
  Search, Filter, Download, Plus, Edit, ChevronDown, 
  DollarSign, Calendar, FileText, MoreHorizontal, Eye, CreditCard, History
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

// Sample faculty data
const facultyList = [
  { 
    id: 1, 
    name: "Dr. Sarah Johnson", 
    department: "Computer Science", 
    joinDate: "2018-06-15",
    position: "Associate Professor",
    bankAccount: "XXXX-XXXX-1234",
    pfAccount: "PF987654321",
    taxId: "ABJCK4567D"
  },
  { 
    id: 2, 
    name: "Prof. Michael Chen", 
    department: "Electrical Engineering",
    joinDate: "2015-08-10",
    position: "Professor",
    bankAccount: "XXXX-XXXX-5678",
    pfAccount: "PF876543210", 
    taxId: "CDEFG7890H"
  },
  { 
    id: 3, 
    name: "Dr. Emily Rodriguez", 
    department: "Mechanical Engineering",
    joinDate: "2019-01-20",
    position: "Assistant Professor",
    bankAccount: "XXXX-XXXX-9012",
    pfAccount: "PF765432109",
    taxId: "HIJKL1234M"
  },
  { 
    id: 4, 
    name: "Prof. David Kim", 
    department: "Civil Engineering",
    joinDate: "2016-04-05",
    position: "Professor",
    bankAccount: "XXXX-XXXX-3456",
    pfAccount: "PF654321098",
    taxId: "MNOPQ5678R"
  },
  { 
    id: 5, 
    name: "Dr. Lisa Wang", 
    department: "Information Technology",
    joinDate: "2020-07-12",
    position: "Assistant Professor",
    bankAccount: "XXXX-XXXX-7890",
    pfAccount: "PF543210987",
    taxId: "RSTUV9012W"
  }
];

// Sample salary structure
const salarySlab = [
  { position: "Assistant Professor", basic: 75000, hra: 30000, da: 7500, ta: 5000, medical: 2500, pf: 9000 },
  { position: "Associate Professor", basic: 95000, hra: 38000, da: 9500, ta: 7000, medical: 3000, pf: 11400 },
  { position: "Professor", basic: 120000, hra: 48000, da: 12000, ta: 10000, medical: 5000, pf: 14400 }
];

// Sample salary history
const salaryHistory = [
  { 
    id: 1, 
    facultyId: 1, 
    month: "January", 
    year: 2024, 
    basic: 95000, 
    hra: 38000, 
    da: 9500, 
    ta: 7000, 
    medical: 3000, 
    pf: 11400,
    taxDeduction: 15000,
    otherDeductions: 2000,
    netSalary: 124100,
    status: "paid",
    paidOn: "2024-01-31",
    remarks: ""
  },
  { 
    id: 2, 
    facultyId: 1, 
    month: "February", 
    year: 2024, 
    basic: 95000, 
    hra: 38000, 
    da: 9500, 
    ta: 7000, 
    medical: 3000, 
    pf: 11400,
    taxDeduction: 15000,
    otherDeductions: 2000,
    netSalary: 124100,
    status: "paid",
    paidOn: "2024-02-28",
    remarks: ""
  },
  { 
    id: 3, 
    facultyId: 2, 
    month: "January", 
    year: 2024, 
    basic: 120000, 
    hra: 48000, 
    da: 12000, 
    ta: 10000, 
    medical: 5000, 
    pf: 14400,
    taxDeduction: 20000,
    otherDeductions: 3000,
    netSalary: 157600,
    status: "paid",
    paidOn: "2024-01-31",
    remarks: ""
  },
  { 
    id: 4, 
    facultyId: 3, 
    month: "January", 
    year: 2024, 
    basic: 75000, 
    hra: 30000, 
    da: 7500, 
    ta: 5000, 
    medical: 2500, 
    pf: 9000,
    taxDeduction: 8000,
    otherDeductions: 1500,
    netSalary: 101500,
    status: "paid",
    paidOn: "2024-01-31",
    remarks: ""
  },
  { 
    id: 5, 
    facultyId: 1, 
    month: "March", 
    year: 2024, 
    basic: 95000, 
    hra: 38000, 
    da: 9500, 
    ta: 7000, 
    medical: 3000, 
    pf: 11400,
    taxDeduction: 15000,
    otherDeductions: 2000,
    netSalary: 124100,
    status: "pending",
    paidOn: "",
    remarks: "Pending approval"
  }
];

interface SalaryRecord {
  id: number;
  facultyId: number;
  faculty: {
    name: string;
    department: string;
    email: string;
  };
  month: string;
  year: number;
  basic: number;
  hra: number;
  da: number;
  ta: number;
  medical: number;
  pf: number;
  taxDeduction: number;
  otherDeductions: number;
  netSalary: number;
  status: string;
  paidOn: string;
  remarks: string;
}

export function FacultyPayrollManagement() {
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showSalaryDetails, setShowSalaryDetails] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<any>(null);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get faculty details by ID
  const getFacultyById = (id: number) => {
    return facultyList.find(faculty => faculty.id === id);
  };

  // Get salary structure by position
  const getSalaryStructure = (position: string) => {
    return salarySlab.find(slab => slab.position === position);
  };

  // Filter salary records based on search query and active tab
  const getFilteredSalaryRecords = () => {
    return salaryHistory
      .filter(record => {
        // Filter by faculty if selected
        if (selectedFaculty && record.facultyId !== selectedFaculty) return false;
        
        // Filter by status if tab selected
        if (activeTab !== "all" && record.status !== activeTab) return false;
        
        // Filter by search query
        if (searchQuery) {
          const faculty = getFacultyById(record.facultyId);
          const searchText = (faculty?.name || "") + record.month + record.year.toString();
          return searchText.toLowerCase().includes(searchQuery.toLowerCase());
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by year and month (most recent first)
        if (a.year !== b.year) return b.year - a.year;
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
        return months.indexOf(b.month) - months.indexOf(a.month);
      });
  };

  // Handle viewing salary details
  const handleViewSalaryDetails = (salary: any) => {
    setSelectedSalary(salary);
    setShowSalaryDetails(true);
  };

  // Calculate total earnings
  const calculateTotalEarnings = (salary: any) => {
    return salary.basic + salary.hra + salary.da + salary.ta + salary.medical;
  };

  // Calculate total deductions
  const calculateTotalDeductions = (salary: any) => {
    return salary.pf + salary.taxDeduction + salary.otherDeductions;
  };

  const filteredSalaryRecords = getFilteredSalaryRecords();

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">Faculty Payroll</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">
                Manage faculty salaries and payment records
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" 
                className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Payment
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
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="paid" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Paid</SelectItem>
                  <SelectItem value="pending" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Pending</SelectItem>
                  <SelectItem value="processing" className="dark:text-blue-50 dark:hover:bg-blue-950/30">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50/50 dark:bg-blue-950/20">
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Faculty</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Department</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Salary</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Last Payment</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold">Status</TableHead>
                  <TableHead className="text-blue-900 dark:text-blue-50 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalaryRecords.map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-blue-900 text-white dark:bg-blue-800/90 dark:text-blue-50 font-medium">
                            {getFacultyById(item.facultyId)?.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                        </Avatar>
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-50">{getFacultyById(item.facultyId)?.name}</p>
                          <p className="text-sm text-blue-600 dark:text-blue-300">{getFacultyById(item.facultyId)?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">{getFacultyById(item.facultyId)?.department}</TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200">${item.netSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="text-blue-800 dark:text-blue-200">
                        <p>{item.paidOn ? new Date(item.paidOn).toLocaleDateString() : 'N/A'}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">Monthly</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          item.status === "paid"
                            ? "bg-green-50 text-green-900 border-green-300 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800/50"
                            : item.status === "pending"
                            ? "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50"
                            : "bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50"
                        }
                      >
                        {item.status}
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
                            <CreditCard className="mr-2 h-4 w-4" />
                            Process Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30">
                            <History className="mr-2 h-4 w-4" />
                            Payment History
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

      {/* New Payment Dialog */}
      <Dialog>
        <DialogContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
          <DialogHeader>
            <DialogTitle className="text-blue-900 dark:text-blue-50">Process New Payment</DialogTitle>
            <DialogDescription className="text-blue-600 dark:text-blue-300">
              Create a new payment record for faculty
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
              <label className="text-right text-blue-900 dark:text-blue-200">Amount</label>
              <Input 
                type="number" 
                placeholder="Enter amount" 
                className="col-span-3 border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-blue-900 dark:text-blue-200">Payment Date</label>
              <Input 
                type="date" 
                className="col-span-3 border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" 
              className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
              Cancel
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white">
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Salary Details Dialog */}
      <Dialog open={showSalaryDetails} onOpenChange={setShowSalaryDetails}>
        <DialogContent className="max-w-md">
          {selectedSalary && (
            <>
              <DialogHeader className="space-y-1">
                <DialogTitle>Salary Details</DialogTitle>
                <DialogDescription>
                  {selectedSalary.month} {selectedSalary.year} • {getFacultyById(selectedSalary.facultyId)?.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Status</div>
                  <div>
                    {selectedSalary.status === "paid" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Paid on {new Date(selectedSalary.paidOn).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Earnings</div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <div>Basic Salary</div>
                      <div>{formatCurrency(selectedSalary.basic)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>House Rent Allowance (HRA)</div>
                      <div>{formatCurrency(selectedSalary.hra)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Dearness Allowance (DA)</div>
                      <div>{formatCurrency(selectedSalary.da)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Travel Allowance (TA)</div>
                      <div>{formatCurrency(selectedSalary.ta)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Medical Allowance</div>
                      <div>{formatCurrency(selectedSalary.medical)}</div>
                    </div>
                    <div className="flex justify-between pt-2 font-medium border-t">
                      <div>Total Earnings</div>
                      <div>{formatCurrency(calculateTotalEarnings(selectedSalary))}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Deductions</div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <div>Provident Fund (PF)</div>
                      <div>{formatCurrency(selectedSalary.pf)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Tax Deduction</div>
                      <div>{formatCurrency(selectedSalary.taxDeduction)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Other Deductions</div>
                      <div>{formatCurrency(selectedSalary.otherDeductions)}</div>
                    </div>
                    <div className="flex justify-between pt-2 font-medium border-t">
                      <div>Total Deductions</div>
                      <div>{formatCurrency(calculateTotalDeductions(selectedSalary))}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <div>Net Salary</div>
                  <div>{formatCurrency(selectedSalary.netSalary)}</div>
                </div>
                
                {selectedSalary.remarks && (
                  <div>
                    <div className="text-sm font-medium mb-1">Remarks</div>
                    <div className="text-sm p-2 bg-gray-50 border rounded">
                      {selectedSalary.remarks}
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex space-x-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Slip
                </Button>
                {selectedSalary.status === "pending" && (
                  <Button>
                    Process Payment
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 