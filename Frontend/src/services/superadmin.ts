import { api } from '@/lib/axios';

export const superadminApi = {
  // College Management
  getAllColleges: () => api.get('/super-admin/colleges/all'),
  getColleges: (params?: any) => api.get('/super-admin/colleges', { params }),
  createCollege: (data: any) => api.post('/super-admin/colleges', data),
  getCollegeById: (id: string) => api.get(`/super-admin/colleges/${id}`),
  updateCollege: (id: string, data: any) => api.put(`/super-admin/colleges/${id}`, data),
  deleteCollege: (id: string) => api.delete(`/super-admin/colleges/${id}`),
  updateCollegeStatus: (id: string, data: any) => 
    api.put(`/super-admin/colleges/${id}/status`, data),
  
  // Analytics
  getAnalytics: () => api.get('/super-admin/analytics'),
}; 