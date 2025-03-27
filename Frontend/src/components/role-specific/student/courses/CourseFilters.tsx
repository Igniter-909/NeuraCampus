import { Filter, Grid3X3, List } from "lucide-react"
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

interface CourseFiltersProps {
  viewMode: "table" | "card";
  setViewMode: (mode: "table" | "card") => void;
  semesterFilter: string;
  setSemesterFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  onFilterChange: () => void;
}

export default function CourseFilters({
  viewMode,
  setViewMode,
  semesterFilter,
  setSemesterFilter,
  typeFilter,
  setTypeFilter,
  sortOption,
  setSortOption,
  onFilterChange,
}: CourseFiltersProps) {
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
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value)
            onFilterChange()
          }}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Core">Core</SelectItem>
            <SelectItem value="Elective">Elective</SelectItem>
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
                  setSortOption("attendance")
                  onFilterChange()
                }}
              >
                Attendance (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortOption("credits")
                  onFilterChange()
                }}
              >
                Credit Hours (High to Low)
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

      <div className="flex items-center gap-3 ml-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode("table")}
          className={`${viewMode === "table" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : ""}`}
        >
          <List className="h-4 w-4 mr-2" />
          Table
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode("card")}
          className={`${viewMode === "card" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : ""}`}
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          Cards
        </Button>
      </div>
    </div>
  )
} 