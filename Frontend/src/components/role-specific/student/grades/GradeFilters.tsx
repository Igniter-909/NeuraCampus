import { Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GradeFiltersProps {
  semesterFilter: string;
  setSemesterFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  onFilterChange: () => void;
}

export default function GradeFilters({
  semesterFilter,
  setSemesterFilter,
  yearFilter,
  setYearFilter,
  sortOption,
  setSortOption,
  onFilterChange,
}: GradeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap gap-3">
        <Select
          value={semesterFilter}
          onValueChange={(value) => {
            setSemesterFilter(value)
            onFilterChange()
          }}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
            <SelectValue placeholder="Filter by Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            <SelectItem value="1st Semester">1st Semester</SelectItem>
            <SelectItem value="2nd Semester">2nd Semester</SelectItem>
            <SelectItem value="3rd Semester">3rd Semester</SelectItem>
            <SelectItem value="4th Semester">4th Semester</SelectItem>
            <SelectItem value="5th Semester">5th Semester</SelectItem>
            <SelectItem value="6th Semester">6th Semester</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={yearFilter}
          onValueChange={(value) => {
            setYearFilter(value)
            onFilterChange()
          }}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="1st Year">1st Year</SelectItem>
            <SelectItem value="2nd Year">2nd Year</SelectItem>
            <SelectItem value="3rd Year">3rd Year</SelectItem>
            <SelectItem value="4th Year">4th Year</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10 bg-white dark:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  setSortOption("grade")
                  onFilterChange()
                }}
              >
                Grade (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortOption("credits")
                  onFilterChange()
                }}
              >
                Credits (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortOption("semester")
                  onFilterChange()
                }}
              >
                Semester (Newest First)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortOption("none")
                  onFilterChange()
                }}
              >
                Default Order
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button
        variant="outline"
        className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      >
        <Download className="h-4 w-4 mr-2" />
        Download Grade Report
      </Button>
    </div>
  )
} 