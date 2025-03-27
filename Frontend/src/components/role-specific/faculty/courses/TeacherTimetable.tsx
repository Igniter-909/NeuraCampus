import { Calendar, Download } from "lucide-react"
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

interface TimeSlot {
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
}

const timeSlots: TimeSlot[] = [
  {
    time: "9:00 AM - 10:00 AM",
    monday: "Data Structures",
    tuesday: "Database Management",
    wednesday: "Data Structures",
    thursday: "Database Management",
    friday: "Data Structures",
    saturday: "Advanced Mathematics",
  },
  {
    time: "10:00 AM - 11:00 AM",
    monday: "Advanced Mathematics",
    tuesday: "Quantum Physics",
    wednesday: "Advanced Mathematics",
    thursday: "Quantum Physics",
    friday: "Advanced Mathematics",
    saturday: "Database Management",
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
    monday: "Database Management",
    tuesday: "Data Structures",
    wednesday: "Database Management",
    thursday: "Data Structures",
    friday: "Database Management",
    saturday: "Quantum Physics",
  },
  {
    time: "3:00 PM - 4:00 PM",
    monday: "Quantum Physics",
    tuesday: "Advanced Mathematics",
    wednesday: "Quantum Physics",
    thursday: "Advanced Mathematics",
    friday: "Quantum Physics",
    saturday: "Data Structures",
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
                <TableCell className={slot.monday === "Free Period" ? "text-muted-foreground" : ""}>
                  {slot.monday}
                </TableCell>
                <TableCell className={slot.tuesday === "Free Period" ? "text-muted-foreground" : ""}>
                  {slot.tuesday}
                </TableCell>
                <TableCell className={slot.wednesday === "Free Period" ? "text-muted-foreground" : ""}>
                  {slot.wednesday}
                </TableCell>
                <TableCell className={slot.thursday === "Free Period" ? "text-muted-foreground" : ""}>
                  {slot.thursday}
                </TableCell>
                <TableCell className={slot.friday === "Free Period" ? "text-muted-foreground" : ""}>
                  {slot.friday}
                </TableCell>
                <TableCell className={slot.saturday === "Free Period" ? "text-muted-foreground" : ""}>
                  {slot.saturday}
                </TableCell>
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