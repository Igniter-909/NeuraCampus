// src/services/auth.ts
import axios from 'axios';
import { ErrorResponse, SuccessResponse } from '@/types/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<SuccessResponse<AuthResponse> | ErrorResponse> {
    try {
      const response = await axios.post<SuccessResponse<AuthResponse>>(`${API_URL}/auth/login`, credentials);
      if (response.data.success && response.data.data) {
        return response.data;
      }
      return {
        success: false,
        error: 'Invalid response from server',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      };
    }
  },
  
  async register(data: RegisterData): Promise<SuccessResponse<AuthResponse> | ErrorResponse> {
    try {
      const response = await axios.post<SuccessResponse<AuthResponse>>(`${API_URL}/auth/register`, data);
      if (response.data.success && response.data.data) {
        return response.data;
      }
      return {
        success: false,
        error: 'Invalid response from server',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during registration',
      };
    }
  },
  
  async logout(): Promise<SuccessResponse | ErrorResponse> {
    try {
      const response = await axios.post<SuccessResponse>(`${API_URL}/auth/logout`);
      if (response.data.success) {
        return response.data;
      }
      return {
        success: false,
        error: 'Invalid response from server',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during logout',
      };
    }
  },
  
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  },
  
  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      password,
    });
    return response.data;
  },
  
  async getCurrentUser(): Promise<SuccessResponse<User> | ErrorResponse> {
    try {
      const response = await axios.get<SuccessResponse<User>>(`${API_URL}/auth/me`);
      if (response.data.success && response.data.data) {
        return response.data;
      }
      return {
        success: false,
        error: 'Invalid response from server',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while fetching user data',
      };
    }
  }
};

// src/hooks/auth/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { authService } from '@/services/auth';
import cookieUtils  from '@/lib/cookies';
import { ROLE_DASHBOARD_ROUTES } from '@/constants/routes';

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  // Get current user on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData.user);
      } catch (error: Error | unknown) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  // Login function
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      
      // Set token in cookie
      cookieUtils.set('token', response.token, { maxAge: 7 * 24 * 60 * 60, path: '/' });
      
      // Set user data
      setUser(response.user);
      
      // Redirect to role-specific dashboard
      router.push(ROLE_DASHBOARD_ROUTES[response.user.role as keyof typeof ROLE_DASHBOARD_ROUTES] || '/');
      
      return response.user;
    } catch (error: any | unknown) {
      setError(error?.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Register function
  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(data);
      
      // Set token in cookie
      cookieUtils.set('token', response.token, { maxAge: 7 * 24 * 60 * 60, path: '/' });
      
      // Set user data
      setUser(response.user);
      
      // Redirect to role-specific dashboard
      router.push(ROLE_DASHBOARD_ROUTES[response.user.role as keyof typeof ROLE_DASHBOARD_ROUTES] || '/');
      
      return response.user;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      const response = await authService.logout();
      if (response.success) {
        // Delete token cookie
        cookieUtils.remove('token');
        
        // Clear user state
        setUser(null);
        
        // Redirect to login
        router.push('/login');
      } else {
        console.error('Logout API error:', response.error);
      }
    } catch (err) {
      console.error('Logout API error:', err);
    }
  };
  
  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};