import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CourseFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  subjectFilter: string
  onSubjectChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  onExport: () => void
}

const statuses = ["All Status", "Ongoing", "Upcoming", "Completed"]
const subjects = ["All Subjects", "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"]
const sortOptions = [
  { value: "name", label: "Name" },
  { value: "students", label: "Student Count" },
  { value: "progress", label: "Progress" },
  { value: "lastActivity", label: "Last Activity" },
]

export function CourseFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  subjectFilter,
  onSubjectChange,
  sortBy,
  onSortChange,
  onExport,
}: CourseFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={subjectFilter} onValueChange={onSubjectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={sortBy === option.value ? "bg-blue-50 dark:bg-blue-950" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" onClick={onExport} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
} 