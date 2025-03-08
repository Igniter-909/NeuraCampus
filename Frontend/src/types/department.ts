import { User } from './user';
import { Batch } from './batch';
import { College } from './college';

export interface Department {
  _id: string;
  name: string;
  code: string;
  collegeId: string | College;
  hodId?: string | User;
  batches: string[] | Batch[];
  totalSemesters: number;
  createdAt: Date;
}

export interface DepartmentStats {
  totalStudents: number;
  totalTeachers: number;
  activeBatches: number;
  // Add more stats as needed
} 