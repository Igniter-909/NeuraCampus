import { jwtDecode } from 'jwt-decode';
import cookieUtils from './cookies';
import {apiClient,  endpoints } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department?: string;
  avatar?: string;
  batchYear?: string;
  collegeId: string;
}

interface TokenPayload {
  exp: number;
  userId: string;
  role: string;
}

interface TokenData {
  userId: string;
  role: string;
  status: string;
  lastLogin: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  department?: string;
}

export const auth = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await apiClient.post(endpoints.auth.login, credentials);
      const { token, user } = response.data as { token: string; user: User };
      
      // Store token and user data with expiration based on rememberMe
      const maxAge = credentials.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
      
      // Set cookies with proper options
      cookieUtils.set('token', token, { 
        maxAge,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      cookieUtils.set('user', JSON.stringify(user), { 
        maxAge,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(data: RegisterData) {
    const response = await apiClient.post(endpoints.auth.register, data);
    return response.data;
  },

  async logout() {
    try {
      await apiClient.post(endpoints.auth.logout);
    } finally {
      cookieUtils.remove('token');
      cookieUtils.remove('user');
    }
  },

  getUser(): User | null {
    try {
      const userStr = cookieUtils.get('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    try {
      const token = cookieUtils.get('token');
      if (!token) return false;
      const payload = jwtDecode<TokenPayload>(token);
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  hasRole(requiredRole: string | string[]): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  },

  async updateProfile(data: Partial<User>) {
    const response = await apiClient.put(endpoints.users.updateProfile, data);
    const updatedUser = response.data;
    
    // Update stored user data
    cookieUtils.set('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    return apiClient.post(endpoints.users.changePassword, {
      currentPassword,
      newPassword,
    });
  },

  async forgotPassword(email: string) {
    return apiClient.post(endpoints.auth.forgotPassword, { email });
  },

  async resetPassword(token: string, newPassword: string) {
    return apiClient.post(endpoints.auth.resetPassword, {
      token,
      newPassword,
    });
  },

  async verifyToken(token: string): Promise<TokenData> {
    try {
      const decoded = jwtDecode<TokenData>(token);
      return {
        userId: decoded.userId,
        role: decoded.role,
        status: decoded.status,
        lastLogin: new Date(decoded.lastLogin)
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  // Add separate method for fetching full user details
  async getUserDetails(userId: string, role: string) {
    const endpoint = role === 'super_admin' 
      ? '/super-admin/users'
      : '/college-admin/users';

    const response = await apiClient.get(`${endpoint}/${userId}`);
    return response.data.user;
  }
};

export default auth;
