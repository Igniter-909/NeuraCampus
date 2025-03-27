'use client'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  MapPin, 
  User, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Info,
  Play,
  Pause,
  Square,
  Clock8,
  Sparkles,
  UserCheck
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

// Define types
interface Student {
  id: number;
  name: string;
  rollNumber: string;
  profileImage: string;
  fallbackImage: string;
  attendancePercentage: number;
  leaveStatus: string | null;
  leaveReason: string | null;
  marked: boolean;
}

interface ClassSession {
  id: number;
  subject: string;
  section: string;
  time: string;
  endTime: string;
  room: string;
  students: number;
  present: number;
  currentStatus: 'upcoming' | 'ongoing' | 'completed';
}

// Mock data for classes
const mockClasses: ClassSession[] = [
  {
    id: 1,
    subject: "Data Structures & Algorithms",
    section: "CSE-A",
    time: "09:30",
    endTime: "11:00",
    room: "Room 101",
    students: 45,
    present: 0,
    currentStatus: "upcoming" // upcoming, ongoing, completed
  },
  {
    id: 2,
    subject: "Object Oriented Programming",
    section: "CSE-B",
    time: "11:15",
    endTime: "12:45",
    room: "Room 102",
    students: 42,
    present: 0,
    currentStatus: "upcoming"
  },
  {
    id: 3,
    subject: "Database Management Systems",
    section: "CSE-C",
    time: "13:30",
    endTime: "15:00",
    room: "Lab 201",
    students: 38,
    present: 0,
    currentStatus: "upcoming"
  },
  {
    id: 4,
    subject: "Computer Networks",
    section: "CSE-D",
    time: "15:15",
    endTime: "16:45",
    room: "Room 103",
    students: 40,
    present: 0,
    currentStatus: "upcoming"
  },
  {
    id: 5,
    subject: "Machine Learning",
    section: "AI-A",
    time: "10:00",
    endTime: "11:30",
    room: "AI Lab 301",
    students: 35,
    present: 0,
    currentStatus: "upcoming"
  },
  {
    id: 6,
    subject: "Software Engineering",
    section: "IT-A",
    time: "14:00",
    endTime: "15:30",
    room: "Room 203",
    students: 40,
    present: 0,
    currentStatus: "upcoming"
  }
];

// Mock student names
const firstNames = [
  "Aarav", "Aditi", "Arjun", "Ananya", "Dhruv", "Diya", "Ishaan", "Isha",
  "Kabir", "Kavya", "Lakshya", "Mira", "Neha", "Nikhil", "Pranav", "Priya",
  "Rahul", "Riya", "Rohan", "Saanvi", "Sahil", "Sanya", "Vihaan", "Zara",
  "Aditya", "Akshay", "Anjali", "Deepak", "Gaurav", "Jaya", "Kiran", "Manish",
  "Nisha", "Pooja", "Rajat", "Shreya", "Tanvi", "Varun", "Vidya", "Yash"
];

const lastNames = [
  "Sharma", "Patel", "Singh", "Gupta", "Joshi", "Kumar", "Mehta", "Verma",
  "Agarwal", "Bhat", "Chauhan", "Desai", "Iyer", "Kapoor", "Malhotra", "Nair",
  "Reddy", "Saxena", "Trivedi", "Yadav", "Banerjee", "Chatterjee", "Das", "Khanna",
  "Mishra", "Pandey", "Rao", "Sen", "Tiwari", "Venkatesh", "Bhatia", "Chopra",
  "Gandhi", "Jain", "Khan", "Mukherjee", "Nayak", "Pillai", "Rajan", "Suri"
];

// Mock leave reasons
const leaveReasons = [
  "Medical emergency - Admitted to hospital for two days",
  "Family function - Sister's wedding",
  "Covid-19 symptoms - Self-isolation as per guidelines",
  "Transport issues - Train strike affecting commute",
  "Technical conference - Representing college at IEEE summit",
  "Sports event - Participating in inter-college tournament",
  "Visa appointment - Study abroad program document verification"
];

// Mock data for students
const generateMockStudents = (count: number): Student[] => {
  return Array.from({ length: count }, (_, index) => {
    const hasLeave = Math.random() > 0.9;
    // Generate a random seed for consistent but unique avatars
    const seed = Math.floor(Math.random() * 10000).toString();
    
    // Generate a random full name
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    // Get initials for the fallback avatar
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    
    // Using DiceBear's latest API (v7) with more realistic avatars
    // Options:
    //  - 'avataaars' - cartoon style avatars
    //  - 'micah' - simple, colorful avatars 
    //  - 'thumbs' - thumbnail style photos
    //  - 'personas' - more realistic looking avatars
    const primaryAvatar = `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    
    // Fallback Avatar URL (using UI Avatars for initials-based avatar)
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${initials}&background=random&size=128&seed=${seed}`;
    
    return {
      id: index + 1,
      name: fullName,
      rollNumber: `CSE${String(2025000 + index).slice(-4)}`,
      profileImage: primaryAvatar,
      fallbackImage: fallbackAvatar,
      attendancePercentage: Math.floor(Math.random() * 31) + 70, // 70-100%
      leaveStatus: hasLeave ? 'Applied' : null,
      leaveReason: hasLeave ? leaveReasons[Math.floor(Math.random() * leaveReasons.length)] : null,
      marked: false
    };
  });
};

// Image component with fallback
function StudentAvatar({ student, size }: { student: Student, size: 'small' | 'medium' }) {
  const [imgSrc, setImgSrc] = useState(student.profileImage);
  
  const sizeClasses = {
    small: "w-8 h-8", // For the marked students table
    medium: "w-10 h-10" // For the main students table
  };
  
  const imageSizes = {
    small: 32,
    medium: 40
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 dark:bg-slate-700`}>
      <Image
        src={imgSrc}
        alt={student.name}
        width={imageSizes[size]}
        height={imageSizes[size]}
        onError={() => setImgSrc(student.fallbackImage)}
      />
    </div>
  );
}

function AttendancePage() {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [remainingStudents, setRemainingStudents] = useState<Student[]>([]);
  const [markedStudents, setMarkedStudents] = useState<Student[]>([]);
  const [currentDate] = useState(new Date());
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  
  // Digital attendance session states
  const [isDigitalSessionActive, setIsDigitalSessionActive] = useState(false);
  const [digitalSessionStatus, setDigitalSessionStatus] = useState<'idle' | 'active' | 'paused'>('idle');
  const [digitalSessionTime, setDigitalSessionTime] = useState(0);
  const [digitalSessionInterval, setDigitalSessionInterval] = useState<NodeJS.Timeout | null>(null);
  const [showDigitalControls, setShowDigitalControls] = useState(false);
  const [digitalAttendanceCount, setDigitalAttendanceCount] = useState(0);
  const [autoMarkEnabled, setAutoMarkEnabled] = useState(false);
  
  // Handle starting digital attendance session
  const startDigitalSession = () => {
    setDigitalSessionStatus('active');
    setIsDigitalSessionActive(true);
    
    const interval = setInterval(() => {
      setDigitalSessionTime(prev => prev + 1);
    }, 1000);
    
    setDigitalSessionInterval(interval);
    setShowDigitalControls(false);
    
    // Auto-mark some students when session starts (for demonstration)
    if (autoMarkEnabled && remainingStudents.length > 0) {
      // Mark automatically 20% of students
      const autoMarkCount = Math.min(Math.ceil(remainingStudents.length * 0.2), remainingStudents.length);
      setDigitalAttendanceCount(autoMarkCount);
      
      const studentsToMark = [...remainingStudents].slice(0, autoMarkCount);
      
      // Mark students with delay for realistic effect
      let markIndex = 0;
      const markingInterval = setInterval(() => {
        if (markIndex < studentsToMark.length) {
          handleMarkAttendance(studentsToMark[markIndex]);
          markIndex++;
        } else {
          clearInterval(markingInterval);
        }
      }, 800);
    }
  };
  
  // Handle pausing digital attendance session
  const pauseDigitalSession = () => {
    setDigitalSessionStatus('paused');
    if (digitalSessionInterval) {
      clearInterval(digitalSessionInterval);
      setDigitalSessionInterval(null);
    }
  };
  
  // Handle resuming digital attendance session
  const resumeDigitalSession = () => {
    setDigitalSessionStatus('active');
    
    const interval = setInterval(() => {
      setDigitalSessionTime(prev => prev + 1);
    }, 1000);
    
    setDigitalSessionInterval(interval);
    
    // Auto-mark additional students when resuming (for demonstration)
    if (autoMarkEnabled && remainingStudents.length > 0) {
      // Mark automatically 10% more students
      const autoMarkCount = Math.min(Math.ceil(remainingStudents.length * 0.1), remainingStudents.length);
      setDigitalAttendanceCount(prev => prev + autoMarkCount);
      
      const studentsToMark = [...remainingStudents].slice(0, autoMarkCount);
      
      // Mark students with delay for realistic effect
      let markIndex = 0;
      const markingInterval = setInterval(() => {
        if (markIndex < studentsToMark.length) {
          handleMarkAttendance(studentsToMark[markIndex]);
          markIndex++;
        } else {
          clearInterval(markingInterval);
        }
      }, 1000);
    }
  };
  
  // Handle ending digital attendance session
  const endDigitalSession = () => {
    setDigitalSessionStatus('idle');
    setIsDigitalSessionActive(false);
    if (digitalSessionInterval) {
      clearInterval(digitalSessionInterval);
      setDigitalSessionInterval(null);
    }
    setDigitalSessionTime(0);
    setDigitalAttendanceCount(0);
    setShowDigitalControls(false);
  };
  
  // Toggle auto-marking feature
  const toggleAutoMark = () => {
    setAutoMarkEnabled(prev => !prev);
  };
  
  // Format time for display (mm:ss)
  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (digitalSessionInterval) {
        clearInterval(digitalSessionInterval);
      }
    };
  }, [digitalSessionInterval]);

  // Initialize classes with correct status based on current time
  useEffect(() => {
    const currentTimeString = format(new Date(), 'HH:mm');
    
    const updatedClasses = mockClasses.map(cls => {
      let status: 'upcoming' | 'ongoing' | 'completed' = "upcoming";
      if (cls.time <= currentTimeString && cls.endTime > currentTimeString) {
        status = "ongoing";
      } else if (cls.endTime <= currentTimeString) {
        status = "completed";
      }
      return {...cls, currentStatus: status};
    });
    
    // Sort by time
    updatedClasses.sort((a, b) => {
      if (a.currentStatus === "ongoing" && b.currentStatus !== "ongoing") return -1;
      if (a.currentStatus !== "ongoing" && b.currentStatus === "ongoing") return 1;
      if (a.currentStatus === "upcoming" && b.currentStatus === "completed") return -1;
      if (a.currentStatus === "completed" && b.currentStatus === "upcoming") return 1;
      return a.time.localeCompare(b.time);
    });
    
    setClasses(updatedClasses);
  }, []);

  const handleClassSelect = (cls: ClassSession) => {
    setSelectedClass(cls);
    const studentsForClass = generateMockStudents(cls.students);
    setRemainingStudents(studentsForClass);
    setMarkedStudents([]);
    setIsMarkingComplete(false);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
  };

  const handleMarkAttendance = (student: Student) => {
    // Add to marked list
    setMarkedStudents(prev => [...prev, {...student, marked: true}]);
    
    // Remove from remaining list
    setRemainingStudents(prev => prev.filter(s => s.id !== student.id));

    // Update class present count
    setClasses(prev => 
      prev.map(cls => 
        cls.id === selectedClass?.id 
          ? {...cls, present: cls.present + 1}
          : cls
      )
    );

    // Update selected class present count
    if (selectedClass) {
      setSelectedClass({
        ...selectedClass,
        present: selectedClass.present + 1
      });
    }
  };

  const handleUndo = () => {
    if (markedStudents.length === 0) return;
    
    // Get the last marked student
    const lastMarked = markedStudents[markedStudents.length - 1];
    
    // Remove from marked list
    setMarkedStudents(prev => prev.slice(0, -1));
    
    // Add back to remaining list
    setRemainingStudents(prev => [...prev, {...lastMarked, marked: false}]);

    // Update class present count
    setClasses(prev => 
      prev.map(cls => 
        cls.id === selectedClass?.id 
          ? {...cls, present: cls.present - 1}
          : cls
      )
    );

    // Update selected class present count
    if (selectedClass) {
      setSelectedClass({
        ...selectedClass,
        present: selectedClass.present - 1
      });
    }
  };

  const handleCompleteMarking = () => {
    setIsMarkingComplete(true);
  };

  const getStatusBadgeProps = (status: 'upcoming' | 'ongoing' | 'completed') => {
    switch(status) {
      case 'ongoing':
        return { variant: "default" as const, className: "bg-green-500 text-white" };
      case 'upcoming':
        return { variant: "outline" as const, className: "border-blue-500 text-blue-500" };
      case 'completed':
        return { variant: "secondary" as const, className: "bg-gray-200 text-gray-700" };
      default:
        return { variant: "outline" as const };
    }
  };
  
  // Get badge text based on status
  const getStatusText = (status: string) => {
    switch(status) {
      case 'ongoing': return 'Active Now';
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  // Mock upcoming events for the calendar
  const upcomingEvents = [
    {
      id: 1,
      title: "Faculty Meeting",
      date: "Mar 5",
      time: "10:00 AM",
      location: "Conference Hall A"
    },
    {
      id: 2,
      title: "Curriculum Review",
      date: "Mar 8",
      time: "2:00 PM",
      location: "Dean's Office"
    },
    {
      id: 3,
      title: "Student Orientation",
      date: "Mar 12",
      time: "9:00 AM",
      location: "Main Auditorium"
    },
    {
      id: 4,
      title: "Department Heads Meeting",
      date: "Mar 15",
      time: "11:00 AM",
      location: "Conference Hall B"
    }
  ];

  return (
    <div className="p-6 w-full bg-blue-50/30 dark:bg-slate-950">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-800 dark:text-white">Attendance Management</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(currentDate, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isDigitalSessionActive && (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full border ${
                digitalSessionStatus === 'active' 
                  ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400' 
                  : 'bg-yellow-100 border-yellow-300 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-400'
              }`}>
                {digitalSessionStatus === 'active' ? (
                  <Clock8 className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
                <span className="font-medium">{formatSessionTime(digitalSessionTime)}</span>
              </div>
            )}
            
            {selectedClass && (
              <Dialog open={showDigitalControls} onOpenChange={setShowDigitalControls}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-md hover:shadow-lg transition-all group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all"></div>
                    <div className="absolute -inset-1 animate-pulse opacity-30 group-hover:opacity-40 bg-blue-400 blur-md"></div>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Digital Attendance
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-none shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold text-blue-800 dark:text-white">
                      {selectedClass.subject} - {selectedClass.section}
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
                      {isDigitalSessionActive 
                        ? 'Manage your ongoing attendance session.' 
                        : 'Start a new digital attendance session for this class.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center py-6">
                    {isDigitalSessionActive ? (
                      <>
                        <div className="text-5xl font-bold mb-6 text-blue-800 dark:text-blue-400">
                          {formatSessionTime(digitalSessionTime)}
                        </div>
                        
                        <div className="mb-6 text-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Auto-marked students:
                          </span>
                          <span className="ml-2 font-semibold text-blue-700 dark:text-blue-400">
                            {digitalAttendanceCount} of {selectedClass.students}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {digitalSessionStatus === 'active' ? (
                            <Button 
                              variant="outline" 
                              className="border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                              onClick={pauseDigitalSession}
                            >
                              <Pause className="mr-2 h-4 w-4" />
                              Pause Session
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                              onClick={resumeDigitalSession}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Resume Session
                            </Button>
                          )}
                          <Button 
                            variant="outline"
                            className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                            onClick={endDigitalSession}
                          >
                            <Square className="mr-2 h-4 w-4" />
                            End Session
                          </Button>
                        </div>
                        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                          Session duration will be recorded for {selectedClass.subject}.
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
                          <UserCheck className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        </div>
                        
                        <div className="flex items-center mb-6 gap-2">
                          <Checkbox 
                            id="auto-mark" 
                            checked={autoMarkEnabled}
                            onCheckedChange={toggleAutoMark}
                            className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 dark:border-blue-700"
                          />
                          <label 
                            htmlFor="auto-mark" 
                            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                          >
                            Auto-mark students who join digitally
                          </label>
                        </div>
                        
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                          onClick={startDigitalSession}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start Attendance Session
                        </Button>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                          Start a timed attendance session for {selectedClass.subject}.
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            {!selectedClass && (
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400">
                <Clock className="mr-2 h-4 w-4" />
                View All Classes
              </Button>
            )}
          </div>
        </div>

        {!selectedClass ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {classes.map(cls => (
                  <Card 
                    key={cls.id} 
                    className={`
                      bg-white hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-slate-800 
                      dark:border-slate-700 hover:shadow-md transition-all cursor-pointer
                      ${cls.currentStatus === 'ongoing' ? 'border-l-4 border-l-green-500' : 
                        cls.currentStatus === 'upcoming' ? 'border-l-4 border-l-blue-500' : 
                        'border-l-4 border-l-gray-300 dark:border-l-gray-600'}
                    `}
                    onClick={() => handleClassSelect(cls)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge {...getStatusBadgeProps(cls.currentStatus)}>
                            {getStatusText(cls.currentStatus)}
                          </Badge>
                          <CardTitle className="mt-2 text-xl text-blue-800 dark:text-white">{cls.subject}</CardTitle>
                        </div>
                        <div className="bg-blue-100 dark:bg-slate-800 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600 dark:text-gray-400" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1.5">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-800">
                              {cls.section}
                            </Badge>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {cls.time} - {cls.endTime}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm">
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-gray-400" />
                            {cls.room}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <User className="h-4 w-4 text-blue-600 dark:text-gray-400" />
                            <span className="font-medium text-blue-800 dark:text-white">{cls.present}/{cls.students}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/4">
              <Card className="bg-white dark:bg-slate-900 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-blue-800 dark:text-white">Event Calendar</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Upcoming events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg text-center min-w-14">
                          <div className="text-xs font-medium">
                            {event.date}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-white">{event.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {event.time} • {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400">
                      View All Events
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                className="gap-2 text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20" 
                onClick={handleBackToClasses}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Classes
              </Button>
            </div>

            <Card className="bg-blue-950 dark:bg-slate-900 border-none shadow-lg overflow-hidden">
              <div className="p-6 pb-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                    {selectedClass.section}
                  </Badge>
                  <Badge className={`
                    ${selectedClass.currentStatus === 'ongoing' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : selectedClass.currentStatus === 'upcoming' 
                        ? 'bg-blue-400 hover:bg-blue-500' 
                        : 'bg-gray-500 hover:bg-gray-600'
                    }
                  `}>
                    {getStatusText(selectedClass.currentStatus)}
                  </Badge>
                  {isDigitalSessionActive && (
                    <Badge className={`
                      ${digitalSessionStatus === 'active'
                        ? 'bg-green-400 hover:bg-green-500'
                        : 'bg-yellow-400 hover:bg-yellow-500'
                      }
                    `}>
                      {digitalSessionStatus === 'active' ? 'Recording' : 'Paused'} ({formatSessionTime(digitalSessionTime)})
                    </Badge>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-1">{selectedClass.subject}</h2>
                <p className="text-blue-100 dark:text-blue-200">
                  {format(currentDate, 'EEEE, MMMM d')} • {selectedClass.time} - {selectedClass.endTime} • {selectedClass.room}
                </p>
                
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <div className="bg-blue-800/50 text-white px-4 py-2 rounded-full flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-200" />
                    <span className="font-medium">
                      {selectedClass.present}/{selectedClass.students}
                    </span>
                  </div>
                  
                  {isDigitalSessionActive ? (
                    <Button 
                      variant="outline" 
                      className="border-white/50 text-white hover:bg-blue-700 flex items-center"
                      onClick={() => setShowDigitalControls(true)}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${digitalSessionStatus === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                      {digitalSessionStatus === 'active' ? 'Digital Session Active' : 'Digital Session Paused'}
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="bg-gradient-to-r from-violet-600 to-purple-800 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 shadow-teal-400-600"
                      onClick={() => setShowDigitalControls(true)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Digital Attendance
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="bg-gradient-to-r from-violet-600 to-purple-800 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 shadow-teal-400-600"
                    onClick={handleUndo}
                    disabled={markedStudents.length === 0}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Undo Last
                  </Button>
                  
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleCompleteMarking}
                    disabled={isMarkingComplete || (remainingStudents.length === 0 && !isMarkingComplete)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Complete
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6 bg-white dark:bg-slate-900">
                {isMarkingComplete ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-blue-800 dark:text-white">Attendance Completed!</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                      You have marked {selectedClass.present} out of {selectedClass.students} students present for today&apos;s class.
                    </p>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleBackToClasses}
                    >
                      Return to Classes
                    </Button>
                  </div>
                ) : remainingStudents.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-blue-800 dark:text-white">All Students Marked!</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                      You have successfully marked all {selectedClass.students} students for today&apos;s class.
                    </p>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleCompleteMarking}
                    >
                      Complete Attendance
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-blue-800 dark:text-white">Student List</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {remainingStudents.length} students remaining
                      </div>
                    </div>
                    
                    <div className="border dark:border-slate-700 rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-blue-50 dark:bg-slate-800 dark:border-slate-700">
                            <TableHead className="w-12 text-blue-800 dark:text-gray-400 font-medium">Mark</TableHead>
                            <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Student</TableHead>
                            <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Roll Number</TableHead>
                            <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Overall Attendance</TableHead>
                            {isDigitalSessionActive && (
                              <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Digital Status</TableHead>
                            )}
                            <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Leave Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {remainingStudents.map((student, index) => {
                            // For demo purposes, simulate some students having digital attendance
                            const hasDigitalAttendance = isDigitalSessionActive && 
                              (student.id % 5 === 0 || student.id % 7 === 0 || index < digitalAttendanceCount);
                            
                            return (
                              <TableRow key={student.id} className="border-blue-100 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800/50">
                                <TableCell>
                                  <Checkbox
                                    checked={student.marked}
                                    onCheckedChange={() => handleMarkAttendance(student)}
                                    className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 dark:border-gray-600"
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <StudentAvatar student={student} size="medium" />
                                    <div className="text-blue-800 dark:text-white font-medium">{student.name}</div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-blue-700 dark:text-gray-300">{student.rollNumber}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={`
                                      ${student.attendancePercentage >= 90 ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 
                                        student.attendancePercentage >= 80 ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800' : 
                                        'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'}
                                    `}
                                  >
                                    {student.attendancePercentage}%
                                  </Badge>
                                </TableCell>
                                {isDigitalSessionActive && (
                                  <TableCell>
                                    {hasDigitalAttendance ? (
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-green-600 dark:text-green-400 text-sm">Online</span>
                                      </div>
                                    ) : (
                                      <span className="text-gray-500 dark:text-gray-400 text-sm">Not connected</span>
                                    )}
                                  </TableCell>
                                )}
                                <TableCell>
                                  {student.leaveStatus ? (
                                    <div className="flex items-center gap-1.5">
                                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                                        {student.leaveStatus}
                                      </Badge>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20">
                                              <Info className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent className="max-w-xs">
                                            <p>{student.leaveReason}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  ) : (
                                    <span className="text-gray-500 dark:text-gray-400">-</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    {markedStudents.length > 0 && (
                      <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-blue-800 dark:text-white">Recently Marked Present</h3>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                            {markedStudents.length} students
                          </Badge>
                        </div>
                        
                        <div className="border border-blue-100 dark:border-slate-700 rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-blue-50 dark:bg-slate-800 dark:border-slate-700">
                                <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Student</TableHead>
                                <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Roll Number</TableHead>
                                <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Marked At</TableHead>
                                {isDigitalSessionActive && (
                                  <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Digital Status</TableHead>
                                )}
                                <TableHead className="text-blue-800 dark:text-gray-400 font-medium">Leave Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {markedStudents.slice().reverse().map((student, index) => {
                                // For demo purposes, simulate some marked students having been marked digitally
                                const hasDigitalAttendance = isDigitalSessionActive && 
                                  (student.id % 5 === 0 || student.id % 7 === 0 || index < digitalAttendanceCount);
                                
                                return (
                                  <TableRow key={`marked-${student.id}`} className="border-blue-100 dark:border-slate-700">
                                    <TableCell>
                                      <div className="flex items-center gap-3">
                                        <StudentAvatar student={student} size="small" />
                                        <div className="text-blue-800 dark:text-white">{student.name}</div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-blue-700 dark:text-gray-300">{student.rollNumber}</TableCell>
                                    <TableCell className="text-gray-500 dark:text-gray-400">{format(new Date(), 'HH:mm:ss')}</TableCell>
                                    {isDigitalSessionActive && (
                                      <TableCell>
                                        {hasDigitalAttendance ? (
                                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">Digital</span>
                                        ) : (
                                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">Manual</span>
                                        )}
                                      </TableCell>
                                    )}
                                    <TableCell>
                                      {student.leaveStatus ? (
                                        <div className="flex items-center gap-1.5">
                                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                                            {student.leaveStatus}
                                          </Badge>
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20">
                                                  <Info className="h-4 w-4" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent className="max-w-xs">
                                                <p>{student.leaveReason}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      ) : (
                                        <span className="text-gray-500 dark:text-gray-400">-</span>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendancePage
