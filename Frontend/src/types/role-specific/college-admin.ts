import { User } from '../user';
import { Department } from './common';

export interface MaintenanceRecord {
  id: string;
  date: Date;
  description: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export interface CollegeAdmin extends User {
  institution: string;
  departments: Department[];
  responsibilities: string[];
  managedResources: ManagedResources;
  reports: ReportAccess[];
}

export interface ManagedResources {
  facilities: Facility[];
  inventory: InventoryItem[];
  staffing: StaffingInfo;
  budget: BudgetInfo;
}

export interface Facility {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'office' | 'library' | 'cafeteria';
  capacity: number;
  location: string;
  schedule: FacilitySchedule[];
  maintenance: MaintenanceRecord[];
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
}

export interface FacilitySchedule {
  day: string;
  timeSlots: {
    startTime: string;
    endTime: string;
    purpose: string;
    bookedBy: string;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  lastUpdated: Date;
  status: 'available' | 'low' | 'out_of_stock';
}

export interface StaffingInfo {
  departments: {
    departmentId: string;
    allocatedPositions: number;
    filledPositions: number;
    vacancies: number;
  }[];
  totalStaff: number;
  onLeave: number;
  newHires: number;
}

export interface BudgetInfo {
  fiscalYear: string;
  departments: DepartmentBudget[];
  totalBudget: number;
  allocated: number;
  remaining: number;
}

export interface DepartmentBudget {
  departmentId: string;
  allocated: number;
  spent: number;
  remaining: number;
  categories: {
    category: string;
    amount: number;
    spent: number;
  }[];
}

export interface ReportAccess {
  type: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastGenerated?: Date;
  recipients: string[];
}

export interface DashboardStatsInterface {
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalBranches: number;
  };
  recentUsers: any[];
  branchStats: any[];
} 