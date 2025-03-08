import { User } from '../user';
import { Course } from './common';

export interface Faculty extends User {
  department: string;
  designation: string;
  specialization: string[];
  courses: Course[];
  experience: number;
  qualifications: Qualification[];
  publications?: Publication[];
  officeHours: OfficeHours[];
}

export interface Qualification {
  degree: string;
  field: string;
  institution: string;
  year: number;
  grade?: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: number;
  doi?: string;
  authors: string[];
  abstract?: string;
}

export interface OfficeHours {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

export interface FacultyWorkload {
  facultyId: string;
  semester: string;
  totalHours: number;
  courses: CourseLoad[];
}

export interface CourseLoad {
  courseId: string;
  courseName: string;
  hoursPerWeek: number;
  studentCount: number;
  schedule: ClassSchedule[];
}

export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
} 