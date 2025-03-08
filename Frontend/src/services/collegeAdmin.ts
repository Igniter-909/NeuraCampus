import { apiClient } from "@/lib/api";

export const collegeAdminApi = {
  // Dashboard
  getDashboardStats: () => apiClient.get('/college-admin/dashboard'),

  // Users
  getUsers: (params?: any) => apiClient.get('/college-admin/users', { params }),
  getUser: (userId: string) => apiClient.get(`/college-admin/users/${userId}`),
  getStudents: () => apiClient.get('/college-admin/students'),
  getTeachers: () => apiClient.get('/college-admin/teachers'),
  getClerks: () => apiClient.get('/college-admin/clerks'),
  updateUser: (userId: string, data: any) => apiClient.put(`/college-admin/users/${userId}`, data),
  deleteUser: (userId: string) => apiClient.delete(`/college-admin/users/${userId}`),

  // Departments
  getDepartments: () => apiClient.get('/college-admin/departments'),
  addDepartment: (data: any) => apiClient.post('/college-admin/departments', data),
  updateDepartment: (id: string, data: any) => apiClient.put(`/college-admin/departments/${id}`, data),
  deleteDepartment: (id: string) => apiClient.delete(`/college-admin/departments/${id}`)
}; 