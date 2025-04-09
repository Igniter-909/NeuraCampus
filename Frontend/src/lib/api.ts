import axios from 'axios';
import cookieUtils from '@/lib/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cms-backend-kdb3.onrender.com/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = cookieUtils.get('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // Log token presence for debugging - remove in production
    console.log('Request with token:', config.url);
  } else {
    console.warn('No auth token available for request:', config.url);
  }
  
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        console.log('Auth error detected, attempting to refresh token');
        // Try to refresh token - implement your token refresh logic here
        // const refreshResponse = await apiClient.post('/auth/refresh-token');
        // if (refreshResponse.data.token) {
        //   cookieUtils.set('token', refreshResponse.data.token);
        //   originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
        //   return apiClient(originalRequest);
        // }
        
        // For now, just log out the user
        console.warn('Token refresh not implemented, logging out user');
        document.cookie = 'token=; Max-Age=0; path=/;';
        document.cookie = 'user=; Max-Age=0; path=/;';
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Clear cookies and redirect to login
        document.cookie = 'token=; Max-Age=0; path=/;';
        document.cookie = 'user=; Max-Age=0; path=/;';
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// API response types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// API endpoints object
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile/update',
    changePassword: '/users/change-password',
  },
  departments: {
    list: '/departments',
    create: '/departments',
    update: (id: string) => `/departments/${id}`,
    delete: (id: string) => `/departments/${id}`,
  },
  courses: {
    list: '/courses',
    create: '/courses',
    update: (id: string) => `/courses/${id}`,
    delete: (id: string) => `/courses/${id}`,
    enroll: (id: string) => `/courses/${id}/enroll`,
  },
  attendance: {
    mark: '/attendance/mark',
    report: '/attendance/report',
  },
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
  },
};

// Generic API methods
export const apiClientMethods = {
  async get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async post<T>(url: string, data?: object): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async put<T>(url: string, data?: object): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Error handling
function handleApiError(error: any): Error {
  if (axios.isAxiosError(error)) {
    const errorResponse = error.response?.data as ErrorResponse;
    if (errorResponse) {
      return new Error(errorResponse.message);
    }
    return new Error('An unexpected error occurred');
  }
  return error;
}
