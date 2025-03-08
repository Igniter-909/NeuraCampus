// src/services/departments.ts
import {apiClient} from '@/lib/api';
import { Department } from '@/types/department';

export interface CreateDepartmentDTO {
  name: string;
  code: string;
  totalSemesters: number;
  hodId?: string;
}

export interface UpdateDepartmentDTO {
  name?: string;
  code?: string;
  totalSemesters?: number;
  hodId?: string;
}

export const departmentApi = {
  // Get all departments for the college
  getDepartments: async () => {
    return apiClient.get<Department[]>('college-admin/departments');
  },

  // Get a single department by ID
  getDepartment: async (id: string) => {
    return apiClient.get<Department>(`college-admin/departments/${id}`);
  },

  // Create a new department
  createDepartment: async (data: CreateDepartmentDTO) => {
    console.log(data,"ddd");
    return apiClient.post<Department>('college-admin/departments', data);
  },

  // Update a department
  updateDepartment: async (id: string, data: UpdateDepartmentDTO) => {
    return apiClient.put<Department>(`college-admin/departments/${id}`, data);
  },

  // Delete a department
  deleteDepartment: async (id: string) => {
    return apiClient.delete(`college-admin/departments/${id}`);
  },

  // Get department statistics
  getDepartmentStats: async (id: string) => {
    return apiClient.get(`college-admin/departments/${id}/stats`);
  }
};
