import { User } from '../user';

export interface Recruiter extends User {
  company: Company;
  jobPostings: JobPosting[];
  hiringHistory: HiringRecord[];
  preferences: RecruiterPreferences;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  website: string;
  size: string;
  locations: string[];
  logo?: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'internship';
  location: string[];
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: SalaryRange;
  benefits: string[];
  skills: string[];
  experience: ExperienceRequirement;
  deadline: Date;
  status: 'draft' | 'active' | 'closed';
  applications: JobApplication[];
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'yearly' | 'monthly';
}

export interface ExperienceRequirement {
  minimum: number;
  preferred: number;
  level: 'entry' | 'mid' | 'senior' | 'lead';
}

export interface JobApplication {
  id: string;
  studentId: string;
  jobId: string;
  status: ApplicationStatus;
  appliedDate: Date;
  resume: string;
  coverLetter?: string;
  screeningScore?: number;
  interviews?: Interview[];
}

export type ApplicationStatus = 
  | 'applied'
  | 'screening'
  | 'shortlisted'
  | 'interviewing'
  | 'offered'
  | 'accepted'
  | 'rejected';

export interface Interview {
  id: string;
  type: 'technical' | 'hr' | 'final';
  scheduledDate: Date;
  duration: number;
  mode: 'online' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: InterviewFeedback;
}

export interface InterviewFeedback {
  rating: number;
  strengths: string[];
  weaknesses: string[];
  comments: string;
  recommendation: 'hire' | 'reject' | 'hold';
}

export interface HiringRecord {
  year: number;
  positions: number;
  hired: number;
  departments: string[];
  averageSalary: number;
}

export interface RecruiterPreferences {
  preferredDepartments: string[];
  minimumCGPA: number;
  preferredSkills: string[];
  notificationSettings: {
    applicationUpdates: boolean;
    interviewReminders: boolean;
    candidateResponses: boolean;
  };
} 