// Base Course Interface
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  semester: number;
  type: CourseType;
  prerequisites?: string[];
  capacity: number;
  enrolled: number;
  syllabus: SyllabusItem[];
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CourseType = 'core' | 'elective' | 'lab' | 'project';
export type CourseStatus = 'active' | 'inactive' | 'archived';

// Syllabus Structure
export interface SyllabusItem {
  unit: number;
  title: string;
  topics: string[];
  duration: number; // in hours
  resources?: LearningResource[];
}

export interface LearningResource {
  type: ResourceType;
  title: string;
  url?: string;
  description?: string;
  fileType?: string;
  size?: number;
}

export type ResourceType = 'document' | 'video' | 'link' | 'assignment';

// Assessment Types
export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  type: AssessmentType;
  totalMarks: number;
  weightage: number;
  dueDate: Date;
  instructions?: string;
  status: AssessmentStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AssessmentType = 
  | 'assignment'
  | 'quiz'
  | 'mid_term'
  | 'final_exam'
  | 'project'
  | 'presentation';

export type AssessmentStatus = 
  | 'draft'
  | 'published'
  | 'in_progress'
  | 'completed'
  | 'graded';

// Department Structure
export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  hodId: string;
  facultyCount: number;
  studentCount: number;
  courses: string[]; // Course IDs
  programs: Program[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  type: ProgramType;
  duration: number; // in years
  totalCredits: number;
  departments: string[]; // Department IDs
  status: ProgramStatus;
}

export type ProgramType = 'undergraduate' | 'postgraduate' | 'doctorate';
export type ProgramStatus = 'active' | 'inactive' | 'discontinued';

// Timetable Types
export interface TimeSlot {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  courseId: string;
  facultyId: string;
  type: SlotType;
}

export type DayOfWeek = 
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export type SlotType = 'lecture' | 'lab' | 'tutorial';

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  recipientId: string;
  recipientRole: string;
  read: boolean;
  priority: NotificationPriority;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export type NotificationType = 
  | 'announcement'
  | 'assignment'
  | 'grade'
  | 'attendance'
  | 'event'
  | 'reminder';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

// Academic Calendar
export interface AcademicCalendar {
  id: string;
  academicYear: string;
  events: AcademicEvent[];
  terms: AcademicTerm[];
}

export interface AcademicEvent {
  id: string;
  title: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  description?: string;
  location?: string;
  departments?: string[]; // Department IDs
}

export interface AcademicTerm {
  id: string;
  name: string;
  type: TermType;
  startDate: Date;
  endDate: Date;
  events: AcademicEvent[];
}

export type EventType = 
  | 'holiday'
  | 'exam'
  | 'registration'
  | 'result'
  | 'event'
  | 'workshop';

export type TermType = 'semester' | 'trimester' | 'quarter';

// Common Status Types
export type Status = 'active' | 'inactive' | 'pending' | 'blocked';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

// Common Response Types
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

export interface FileUpload {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
} 