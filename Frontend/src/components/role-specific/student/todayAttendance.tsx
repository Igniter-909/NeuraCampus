"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Mic, CheckCircle2, AlertCircle, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// Mock data for today's schedule
const todaySchedule = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    time: "09:00 - 10:30",
    professor: "Dr. Emily Chen",
    room: "A-101",
    status: "present",
  },
  {
    id: 2,
    subject: "Data Structures",
    time: "11:00 - 12:30",
    professor: "Prof. Michael Brown",
    room: "B-205",
    status: "present",
  },
  {
    id: 3,
    subject: "Computer Networks",
    time: "14:00 - 15:30",
    professor: "Dr. Sarah Johnson",
    room: "C-310",
    status: "upcoming",
  },
  {
    id: 4,
    subject: "Software Engineering",
    time: "16:00 - 17:30",
    professor: "Prof. David Wilson",
    room: "D-405",
    status: "upcoming",
  },
]

export default function TodayAttendance() {
  const [isListening, setIsListening] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [currentSubject, setCurrentSubject] = useState<(typeof todaySchedule)[0] | null>(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleListen = (subject: (typeof todaySchedule)[0]) => {
    setCurrentSubject(subject)
    setIsListening(true)
    setProgress(0)

    // Simulate audio processing with progress
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          setIsListening(false)
          setShowSuccessDialog(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const stopListening = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsListening(false)
  }

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false)
  }

  // Group classes by time of day
  const morningClasses = todaySchedule.filter((subject) => {
    const hour = Number.parseInt(subject.time.split(":")[0])
    return hour < 12
  })

  const afternoonClasses = todaySchedule.filter((subject) => {
    const hour = Number.parseInt(subject.time.split(":")[0])
    return hour >= 12
  })

  const renderSubjectCard = (subject: (typeof todaySchedule)[0]) => (
    <Card key={subject.id} className="bg-white dark:bg-slate-800 border-none shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-10 rounded-full ${
                  subject.status === "present"
                    ? "bg-green-500"
                    : subject.status === "absent"
                      ? "bg-red-500"
                      : "bg-blue-500"
                }`}
              ></div>
              <div>
                <h3 className="font-semibold text-lg">{subject.subject}</h3>
                <p className="text-sm text-muted-foreground">{subject.professor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {subject.time}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                Room {subject.room}
              </div>
            </div>
          </div>
          <div>
            {subject.status === "present" ? (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Present
              </Badge>
            ) : subject.status === "absent" ? (
              <Badge
                variant="destructive"
                className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border-none"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Absent
              </Badge>
            ) : (
              <Button
                size="sm"
                onClick={() => handleListen(subject)}
                disabled={isListening}
                className="gap-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Mic className="h-3 w-3" />
                Mark Attendance
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Timeline view */}
      <div className="relative">
        <div className="absolute left-[26px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-600 z-0"></div>

        {/* Morning section */}
        {morningClasses.length > 0 && (
          <div className="relative z-10 mb-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <span className="text-xs font-bold">AM</span>
              </div>
              <h2 className="ml-4 text-lg font-bold">Morning</h2>
            </div>
            <div className="ml-7 space-y-4">{morningClasses.map(renderSubjectCard)}</div>
          </div>
        )}

        {/* Afternoon section */}
        {afternoonClasses.length > 0 && (
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <span className="text-xs font-bold">PM</span>
              </div>
              <h2 className="ml-4 text-lg font-bold">Afternoon</h2>
            </div>
            <div className="ml-7 space-y-4">{afternoonClasses.map(renderSubjectCard)}</div>
          </div>
        )}
      </div>

      {/* Sound Recognition Dialog */}
      <Dialog open={isListening} onOpenChange={stopListening}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 border-none shadow-xl">
          <DialogHeader>
            <DialogTitle>Listening for Attendance Code</DialogTitle>
            <DialogDescription>
              Please wait while we listen for the attendance code from your professor.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping"></div>
              <div className="absolute inset-3 rounded-full bg-blue-500/20 animate-pulse"></div>
              <Mic className="h-10 w-10 text-blue-600 dark:text-blue-400 relative z-10 animate-pulse" />
            </div>
            <Progress value={progress} className="w-full" indicatorClassName="bg-blue-600" />
            <p className="text-sm text-muted-foreground">
              {currentSubject?.subject} - {currentSubject?.time}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={closeSuccessDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 border-none shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600 dark:text-green-400">
              Attendance Marked Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-center">
              Your attendance has been successfully recorded for:
              <br />
              <span className="font-semibold">{currentSubject?.subject}</span>
            </p>
            <Button onClick={closeSuccessDialog} className="mt-4 bg-green-600 hover:bg-green-700">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

