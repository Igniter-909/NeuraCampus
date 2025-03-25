'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { MdClass, MdAccessTime, MdRoom, MdPeople, MdMoreVert, MdEdit, MdSchedule, MdAssignment, MdPlayArrow, MdPause, MdStop, MdPersonAdd } from 'react-icons/md'
import { playSound } from '@/utils/playSound'

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  isPresent: boolean;
}

interface ClassSession {
  id: string
  subject: string
  section: string
  room: string
  startTime: string
  endTime: string
  status: 'upcoming' | 'ongoing' | 'completed'
  attendanceMarked: boolean
  totalStudents: number
  presentStudents?: number
  attendanceStatus?: 'paused' | 'active' | 'completed'
  students?: Student[]
  frequency?: number
}

interface ModalState {
  type: 'add' | 'edit' | 'reschedule' | 'attendance' | 'absentList' | null
  classId?: string
}

// Mock student data generator
const generateMockStudents = (count: number): Student[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `student-${i + 1}`,
    name: `Student ${i + 1}`,
    rollNumber: `2024${String(i + 1).padStart(3, '0')}`,
    isPresent: false
  }));
};

// Generate random frequency between 1000-8000 Hz
const generateFrequency = () => {
  return Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000;
};

export default function DaySchedule() {
  const [selectedDate] = useState(new Date())
  const [classes, setClasses] = useState<ClassSession[]>([
    {
      id: '1',
      subject: 'Data Structures',
      section: 'CSE-A',
      room: '301',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      status: 'ongoing',
      attendanceMarked: false,
      totalStudents: 45,
    },
    {
      id: '2',
      subject: 'Algorithms',
      section: 'CSE-B',
      room: '302',
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      status: 'upcoming',
      attendanceMarked: false,
      totalStudents: 40,
    },
    {
      id: '3',
      subject: 'Programming',
      section: 'CSE-C',
      room: '303',
      startTime: '8:30 AM',
      endTime: '10:00 AM',
      status: 'completed',
      attendanceMarked: true,
      totalStudents: 42,
      presentStudents: 38,
    },
  ])
  const [modalState, setModalState] = useState<ModalState>({ type: null })
  const [formData, setFormData] = useState({
    subject: '',
    section: '',
    room: '',
    startTime: '',
    endTime: '',
    totalStudents: ''
  })
  const [attendanceSession, setAttendanceSession] = useState<{
    classId: string;
    startTime: Date;
    status: 'paused' | 'active' | 'completed';
    presentCount: number;
  } | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleAttendanceAction = async (action: 'start' | 'pause' | 'resume' | 'stop') => {
    if (!attendanceSession) return;

    const currentClass = classes.find(c => c.id === attendanceSession.classId);
    if (!currentClass?.frequency) return;

    console.log(`Frequency: ${currentClass.frequency} Hz`);

    switch (action) {
      case 'start':
      case 'resume':
        setIsPlaying(true);
        setAttendanceSession(curr => curr ? { ...curr, status: 'active' } : null);
        await playSound([currentClass.frequency]);
        setIsPlaying(false);
        break;
      case 'pause':
        setIsPlaying(false);
        setAttendanceSession(curr => curr ? { ...curr, status: 'paused' } : null);
        break;
      case 'stop':
        setIsPlaying(false);
        const finalCount = currentClass.students?.filter(student => student.isPresent).length || 0;
        setClasses(prev => prev.map(cls => 
          cls.id === attendanceSession.classId 
            ? { 
                ...cls, 
                attendanceMarked: true, 
                presentStudents: finalCount,
                attendanceStatus: 'completed'
              }
            : cls
        ));
        setModalState({ type: 'absentList', classId: attendanceSession.classId });
        setAttendanceSession(null);
        break;
    }
  }

  const handleTakeAttendance = (sessionId: string) => {
    const classSession = classes.find(c => c.id === sessionId);
    if (!classSession) return;

    // Generate random frequency if not already set
    const frequency = classSession.frequency || generateFrequency();
    
    // Generate mock students if not already set
    const students = classSession.students || generateMockStudents(classSession.totalStudents);

    setClasses(prev => prev.map(cls => 
      cls.id === sessionId 
        ? { ...cls, frequency, students }
        : cls
    ));

    setAttendanceSession({
      classId: sessionId,
      startTime: new Date(),
      status: 'active',
      presentCount: 0
    });
    setModalState({ type: 'attendance', classId: sessionId });
  }

  const handleTakeAllAttendance = () => {
    const pendingClass = classes.find(cls => cls.status === 'ongoing' && !cls.attendanceMarked);
    if (pendingClass) {
      handleTakeAttendance(pendingClass.id);
    }
  }

  const getPendingAttendanceCount = () => {
    return classes.filter(cls => cls.status === 'ongoing' && !cls.attendanceMarked).length
  }

  const handleModalOpen = (type: ModalState['type'], classId?: string) => {
    setModalState({ type, classId })
    if (type === 'edit' || type === 'reschedule') {
      const classToEdit = classes.find(c => c.id === classId)
      if (classToEdit) {
        setFormData({
          subject: classToEdit.subject,
          section: classToEdit.section,
          room: classToEdit.room,
          startTime: classToEdit.startTime,
          endTime: classToEdit.endTime,
          totalStudents: classToEdit.totalStudents.toString()
        })
      }
    } else {
      setFormData({
        subject: '',
        section: '',
        room: '',
        startTime: '',
        endTime: '',
        totalStudents: ''
      })
    }
  }

  const handleModalClose = () => {
    setModalState({ type: null })
    setFormData({
      subject: '',
      section: '',
      room: '',
      startTime: '',
      endTime: '',
      totalStudents: ''
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (modalState.type === 'add') {
      const newClass: ClassSession = {
        id: Date.now().toString(),
        ...formData,
        totalStudents: parseInt(formData.totalStudents),
        status: 'upcoming',
        attendanceMarked: false
      }
      setClasses(prev => [...prev, newClass])
    } else if (modalState.type === 'edit' || modalState.type === 'reschedule') {
      setClasses(prev => prev.map(cls => 
        cls.id === modalState.classId 
          ? { 
              ...cls, 
              ...formData,
              totalStudents: parseInt(formData.totalStudents)
            }
          : cls
      ))
    }
    handleModalClose()
  }

  const getBadgeVariant = (status: ClassSession['status']) => {
    switch (status) {
      case 'ongoing':
        return 'default'
      case 'completed':
        return 'secondary'
      case 'upcoming':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getBackgroundColor = (status: ClassSession['status']) => {
    switch (status) {
      case 'ongoing':
        return 'bg-gradient-to-r from-blue-500/10 to-blue-500/5'
      case 'upcoming':
        return 'bg-gradient-to-r from-purple-500/10 to-purple-500/5'
      case 'completed':
        return 'bg-gradient-to-r from-green-500/10 to-green-500/5'
      default:
        return 'bg-gray-50'
    }
  }

  const handleMarkStudentPresent = (classId: string, studentId: string) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId 
        ? {
            ...cls,
            students: cls.students?.map(student => 
              student.id === studentId 
                ? { ...student, isPresent: true }
                : student
            ),
            presentStudents: (cls.presentStudents || 0) + 1
          }
        : cls
    ));
  };

  return (
    <Card className="bg-white dark:bg-slate-900">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <MdClass className="text-blue-500" />
            Today&apos;s Schedule
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            {getPendingAttendanceCount() > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={handleTakeAllAttendance}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
              >
                <MdAssignment className="w-4 h-4" />
                Take All Attendance ({getPendingAttendanceCount()})
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleModalOpen('add')}
              className="flex items-center gap-2"
            >
              <MdSchedule className="w-4 h-4" />
              Add Class
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {classes.map((session) => (
            <div
              key={session.id}
              className={cn(
                "p-4 rounded-lg border transition-all",
                getBackgroundColor(session.status),
                session.status === 'ongoing' && "border-blue-200 dark:border-blue-800",
                session.status === 'upcoming' && "border-purple-200 dark:border-purple-800",
                session.status === 'completed' && "border-green-200 dark:border-green-800",
                session.attendanceMarked && session.status === 'ongoing' && "border-green-200 dark:border-green-800"
              )}
            >
              <div className="flex flex-col sm:flex-row items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{session.subject}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.section}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Badge 
                    variant={getBadgeVariant(session.status)}
                    className="capitalize"
                  >
                    {session.status}
                  </Badge>
                  {session.status === 'ongoing' && (
                    <Badge 
                      variant={session.attendanceMarked ? "secondary" : "destructive"}
                      className={cn(
                        "capitalize",
                        session.attendanceMarked && "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
                      )}
                    >
                      {session.attendanceMarked ? "Attendance Taken" : "Pending"}
                    </Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MdMoreVert className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleModalOpen('edit', session.id)}>
                        <MdEdit className="mr-2 h-4 w-4" />
                        Edit Class
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleModalOpen('reschedule', session.id)}>
                        <MdSchedule className="mr-2 h-4 w-4" />
                        Reschedule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <MdRoom className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  {session.room}
                </span>
                <span className="flex items-center gap-1.5">
                  <MdAccessTime className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  {session.startTime} - {session.endTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <MdPeople className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  {session.presentStudents || 0}/{session.totalStudents} Students
                </span>
              </div>
              {session.status === 'ongoing' && !session.attendanceMarked && (
                <Button 
                  size="sm" 
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleTakeAttendance(session.id)}
                >
                  Take Attendance
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={modalState.type !== null} onOpenChange={() => handleModalClose()}>
        <DialogContent className={cn(
          "sm:max-w-[600px] p-0",
          modalState.type === 'attendance' || modalState.type === 'absentList' ? "bg-white dark:bg-slate-900 rounded-xl" : ""
        )}>
          {modalState.type === 'attendance' ? (
            <div className="p-6 space-y-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Take Attendance
                </DialogTitle>
                <div className="mt-2">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                    {classes.find(c => c.id === attendanceSession?.classId)?.subject}
                  </h3>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {classes.find(c => c.id === attendanceSession?.classId)?.section}
                  </p>
                </div>
              </DialogHeader>

              <div className="flex items-center justify-end">
                <Badge 
                  variant="default"
                  className={cn(
                    "text-base px-4 py-1 rounded-full capitalize",
                    attendanceSession?.status === 'active' ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                  )}
                >
                  {attendanceSession?.status || 'Active'}
                </Badge>
              </div>

              {attendanceSession && (
                <div className="space-y-8">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-blue-50 dark:bg-blue-900"></div>
                      <Button
                        variant="outline"
                        size="lg"
                        className={cn(
                          "h-32 w-32 rounded-full relative",
                          "border-4 transition-all duration-200",
                          isPlaying
                            ? "border-blue-500 hover:border-blue-600" 
                            : "border-green-500 hover:border-green-600"
                        )}
                        onClick={() => handleAttendanceAction(
                          isPlaying ? 'pause' : 'resume'
                        )}
                        disabled={!attendanceSession}
                      >
                        {isPlaying ? (
                          <MdPause className="h-16 w-16 text-blue-500" />
                        ) : (
                          <MdPlayArrow className="h-16 w-16 text-green-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-6 border-t dark:border-gray-700">
                    <Button
                      variant="destructive"
                      size="lg"
                      className="flex-1 h-14 text-lg bg-red-500 hover:bg-red-600"
                      onClick={() => handleAttendanceAction('stop')}
                    >
                      <MdStop className="mr-2 h-6 w-6" />
                      End Session
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : modalState.type === 'absentList' ? (
            <div className="p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Absent Students List
                </DialogTitle>
                <p className="text-gray-500 dark:text-gray-400">
                  {classes.find(c => c.id === modalState.classId)?.subject} - {classes.find(c => c.id === modalState.classId)?.section}
                </p>
              </DialogHeader>
              
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Present: {classes.find(c => c.id === modalState.classId)?.presentStudents} / {classes.find(c => c.id === modalState.classId)?.totalStudents}
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {classes.find(c => c.id === modalState.classId)?.students
                  ?.filter(student => !student.isPresent)
                  .map(student => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border-b dark:border-gray-700"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{student.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.rollNumber}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkStudentPresent(modalState.classId!, student.id)}
                        className="flex items-center gap-2"
                      >
                        <MdPersonAdd className="h-4 w-4" />
                        Mark Present
                      </Button>
                    </div>
                  ))}
              </div>

              <DialogFooter>
                <Button
                  variant="default"
                  onClick={handleModalClose}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100">
                  {modalState.type === 'add' ? 'Add New Class' : 
                   modalState.type === 'edit' ? 'Edit Class' : 
                   'Reschedule Class'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">Subject</Label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">Section</Label>
                    <Input
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      placeholder="Enter section"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">Start Time</Label>
                    <Input
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">End Time</Label>
                    <Input
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 11:30 AM"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">Room</Label>
                    <Input
                      name="room"
                      value={formData.room}
                      onChange={handleInputChange}
                      placeholder="Enter room number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">Total Students</Label>
                    <Input
                      name="totalStudents"
                      type="number"
                      value={formData.totalStudents}
                      onChange={handleInputChange}
                      placeholder="Enter total students"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleModalClose} className="text-gray-900 dark:text-gray-100">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
                  {modalState.type === 'add' ? 'Add Class' : 
                   modalState.type === 'edit' ? 'Save Changes' : 
                   'Reschedule'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
} 