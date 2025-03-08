import { User } from '../user';
import { Faculty } from './faculty';
import { Course, Department } from './common';

export interface HOD extends Omit<User, 'department'> {
  department: Department;
  faculty: Faculty[];
  managedCourses: Course[];
  responsibilities: HODResponsibilities;
  performance: DepartmentPerformance;
}

export interface HODResponsibilities {
  academicPlanning: boolean;
  facultyManagement: boolean;
  studentGuidance: boolean;
  resourceAllocation: boolean;
  qualityAssurance: boolean;
  researchCoordination: boolean;
}

export interface DepartmentPerformance {
  academicMetrics: AcademicMetrics;
  facultyMetrics: FacultyMetrics;
  researchMetrics: ResearchMetrics;
  studentMetrics: StudentMetrics;
}

export interface AcademicMetrics {
  averageGPA: number;
  passRate: number;
  courseCompletionRate: number;
  studentFeedbackScore: number;
}

export interface FacultyMetrics {
  teachingLoad: number;
  researchOutput: number;
  studentFeedback: number;
  professionalDevelopment: number;
}

export interface ResearchMetrics {
  publications: number;
  projects: number;
  funding: number;
  collaborations: number;
}

export interface StudentMetrics {
  enrollment: number;
  retention: number;
  placement: number;
  achievements: number;
} 