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
  userId: string;
  role: string;
  iat: number;
  exp: number;
  collegeId?: string;
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
    const response = await apiClient.post(endpoints.auth.login, credentials);
    const { token, user } = response.data as { token: string; user: User };
    
    // Store token and user data
    cookieUtils.set('token', token);
    cookieUtils.set('user', JSON.stringify(user));
    
    return user;
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
    const userStr = cookieUtils.get('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    const token = cookieUtils.get('token');
    if (!token) return false;

    try {
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
