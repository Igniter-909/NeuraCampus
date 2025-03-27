import { Calendar, Download, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface ClassDetails {
  name: string
  room: string
  semester: string
}

interface TimeSlot {
  time: string
  monday: ClassDetails | string
  tuesday: ClassDetails | string
  wednesday: ClassDetails | string
  thursday: ClassDetails | string
  friday: ClassDetails | string
  saturday: ClassDetails | string
}

const timeSlots: TimeSlot[] = [
  {
    time: "9:00 AM - 10:00 AM",
    monday: {
      name: "Data Structures",
      room: "Room 301",
      semester: "3rd Semester",
    },
    tuesday: {
      name: "Database Management",
      room: "Room 302",
      semester: "3rd Semester",
    },
    wednesday: {
      name: "Data Structures",
      room: "Room 301",
      semester: "3rd Semester",
    },
    thursday: {
      name: "Database Management",
      room: "Room 302",
      semester: "3rd Semester",
    },
    friday: {
      name: "Data Structures",
      room: "Room 301",
      semester: "3rd Semester",
    },
    saturday: {
      name: "Advanced Mathematics",
      room: "Room 303",
      semester: "5th Semester",
    },
  },
  {
    time: "10:00 AM - 11:00 AM",
    monday: {
      name: "Advanced Mathematics",
      room: "Room 303",
      semester: "5th Semester",
    },
    tuesday: {
      name: "Quantum Physics",
      room: "Room 304",
      semester: "7th Semester",
    },
    wednesday: {
      name: "Advanced Mathematics",
      room: "Room 303",
      semester: "5th Semester",
    },
    thursday: {
      name: "Quantum Physics",
      room: "Room 304",
      semester: "7th Semester",
    },
    friday: {
      name: "Advanced Mathematics",
      room: "Room 303",
      semester: "5th Semester",
    },
    saturday: {
      name: "Database Management",
      room: "Room 302",
      semester: "3rd Semester",
    },
  },
  {
    time: "11:00 AM - 12:00 PM",
    monday: "Office Hours",
    tuesday: "Office Hours",
    wednesday: "Office Hours",
    thursday: "Office Hours",
    friday: "Office Hours",
    saturday: "Office Hours",
  },
  {
    time: "12:00 PM - 1:00 PM",
    monday: "Lunch Break",
    tuesday: "Lunch Break",
    wednesday: "Lunch Break",
    thursday: "Lunch Break",
    friday: "Lunch Break",
    saturday: "Lunch Break",
  },
  {
    time: "1:00 PM - 2:00 PM",
    monday: "Free Period",
    tuesday: "Free Period",
    wednesday: "Free Period",
    thursday: "Free Period",
    friday: "Free Period",
    saturday: "Free Period",
  },
  {
    time: "2:00 PM - 3:00 PM",
    monday: {
      name: "Database Management",
      room: "Room 302",
      semester: "3rd Semester",
    },
    tuesday: {
      name: "Data Structures",
      room: "Room 301",
      semester: "3rd Semester",
    },
    wednesday: {
      name: "Database Management",
      room: "Room 302",
      semester: "3rd Semester",
    },
    thursday: {
      name: "Data Structures",
      room: "Room 301",
      semester: "3rd Semester",
    },
    friday: {
      name: "Database Management",
      room: "Room 302",
      semester: "3rd Semester",
    },
    saturday: {
      name: "Quantum Physics",
      room: "Room 304",
      semester: "7th Semester",
    },
  },
  {
    time: "3:00 PM - 4:00 PM",
    monday: {
      name: "Quantum Physics",
      room: "Room 304",
      semester: "7th Semester",
    },
    tuesday: {
      name: "Advanced Mathematics",
      room: "Room 303",
      semester: "5th Semester",
    },
    wednesday: {
      name: "Quantum Physics",
      room: "Room 304",
      semester: "7th Semester",
    },
    thursday: {
      name: "Advanced Mathematics",
      room: "Room 303",
      semester: "5th Semester",
    },
    friday: {
      name: "Quantum Physics",
      room: "Room 304",
      semester: "7th Semester",
    },
    saturday: {
      name: "Data Structures",
      room: "Room 301",
      semester: "3rd Semester",
    },
  },
]

export function TeacherTimetable() {
  const { toast } = useToast()

  const handleDownloadTimetable = () => {
    toast({
      title: "Download Started",
      variant: "default",
    })
  }

  const getSubjectColor = (subjectName: string) => {
    switch (subjectName) {
      case "Data Structures":
        return "bg-blue-50 dark:bg-blue-950/30"
      case "Database Management":
        return "bg-blue-100 dark:bg-blue-950/40"
      case "Advanced Mathematics":
        return "bg-blue-200 dark:bg-blue-950/50"
      case "Quantum Physics":
        return "bg-blue-300 dark:bg-blue-950/60"
      default:
        return ""
    }
  }

  const renderCell = (content: ClassDetails | string) => {
    if (typeof content === "string") {
      return (
        <div className={`p-2 rounded-md ${content === "Free Period" ? "text-muted-foreground" : ""}`}>
          {content}
        </div>
      )
    }

    return (
      <div className={`p-3 rounded-md ${getSubjectColor(content.name)}`}>
        <div className="font-medium">{content.name}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-3 w-3" />
          <span>{content.room}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="secondary" className="text-xs">
            {content.semester}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold">Weekly Schedule</h2>
        </div>
        <Button
          variant="outline"
          className="border-blue-200 dark:border-blue-800"
          onClick={handleDownloadTimetable}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Timetable
        </Button>
      </div>
      <div className="rounded-md border border-blue-200 dark:border-blue-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Time</TableHead>
              <TableHead>Monday</TableHead>
              <TableHead>Tuesday</TableHead>
              <TableHead>Wednesday</TableHead>
              <TableHead>Thursday</TableHead>
              <TableHead>Friday</TableHead>
              <TableHead>Saturday</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeSlots.map((slot, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{slot.time}</TableCell>
                <TableCell>{renderCell(slot.monday)}</TableCell>
                <TableCell>{renderCell(slot.tuesday)}</TableCell>
                <TableCell>{renderCell(slot.wednesday)}</TableCell>
                <TableCell>{renderCell(slot.thursday)}</TableCell>
                <TableCell>{renderCell(slot.friday)}</TableCell>
                <TableCell>{renderCell(slot.saturday)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>Note: Office hours are available for student consultations and support.</p>
        <p>Free periods are available for preparation and administrative work.</p>
      </div>
    </div>
  )
} 