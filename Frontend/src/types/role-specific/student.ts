import { User } from '../user';
import { Course } from './common';

export interface Student extends User {
  rollNumber: string;
  batch: string;
  department: string;
  semester: number;
  program: string;
  cgpa: number;
  enrolledCourses: EnrolledCourse[];
  attendance: AttendanceRecord[];
  academicHistory: AcademicRecord[];
}

export interface EnrolledCourse extends Course {
  grade?: string;
  attendance: number;
  assignments: AssignmentSubmission[];
  exams: ExamResult[];
}

export interface AttendanceRecord {
  courseId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface AcademicRecord {
  semester: number;
  gpa: number;
  courses: CourseGrade[];
  status: 'completed' | 'ongoing' | 'upcoming';
}

export interface CourseGrade {
  courseId: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

export interface AssignmentSubmission {
  assignmentId: string;
  submittedAt: Date;
  status: 'submitted' | 'late' | 'not_submitted';
  score?: number;
  feedback?: string;
}

export interface ExamResult {
  examId: string;
  score: number;
  maxScore: number;
  status: 'passed' | 'failed';
  remarks?: string;
} 