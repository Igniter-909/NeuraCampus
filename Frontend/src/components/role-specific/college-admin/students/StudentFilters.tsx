"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentFiltersProps {
  onFilterChange: (filters: {
    year: string
    semester: string
    department: string
    attendance: string
  }) => void
}

export default function StudentFilters({ onFilterChange }: StudentFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      year: key === "year" ? value : "all",
      semester: key === "semester" ? value : "all",
      department: key === "department" ? value : "all",
      attendance: key === "attendance" ? value : "all",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2 space-y-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Year</label>
            <Select onValueChange={(value) => handleFilterChange("year", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1st year">1st Year</SelectItem>
                <SelectItem value="2nd year">2nd Year</SelectItem>
                <SelectItem value="3rd year">3rd Year</SelectItem>
                <SelectItem value="4th year">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Semester</label>
            <Select onValueChange={(value) => handleFilterChange("semester", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1st semester">1st Semester</SelectItem>
                <SelectItem value="2nd semester">2nd Semester</SelectItem>
                <SelectItem value="3rd semester">3rd Semester</SelectItem>
                <SelectItem value="4th semester">4th Semester</SelectItem>
                <SelectItem value="5th semester">5th Semester</SelectItem>
                <SelectItem value="6th semester">6th Semester</SelectItem>
                <SelectItem value="7th semester">7th Semester</SelectItem>
                <SelectItem value="8th semester">8th Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Department</label>
            <Select onValueChange={(value) => handleFilterChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="computer science">Computer Science</SelectItem>
                <SelectItem value="electrical engineering">Electrical Engineering</SelectItem>
                <SelectItem value="mechanical engineering">Mechanical Engineering</SelectItem>
                <SelectItem value="chemical engineering">Chemical Engineering</SelectItem>
                <SelectItem value="civil engineering">Civil Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Attendance</label>
            <Select onValueChange={(value) => handleFilterChange("attendance", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Attendance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Attendance</SelectItem>
                <SelectItem value="above90">Above 90%</SelectItem>
                <SelectItem value="75to90">75% - 90%</SelectItem>
                <SelectItem value="below75">Below 75%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 