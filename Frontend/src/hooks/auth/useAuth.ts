'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import auth, { LoginCredentials, User } from '@/lib/auth';
import { ROLE_DASHBOARD_ROUTES, ROUTES, UserRole } from '@/constants/routes';
import { useToast } from '../ui/useToast';

type RegisterData = FormData | {
  name: string;
  email: string;
  password: string;
  role: string;
  profile?: {
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
  };
};

export const useAuth = () => {
  const router = useRouter();
  const { toast } = useToast();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await auth.login(credentials);
      
      // Get the dashboard route for the user's role
      const dashboardRoute = ROLE_DASHBOARD_ROUTES[response?.role as UserRole];
      if (!dashboardRoute) {
        throw new Error('Invalid user role');
      }
      console.log(dashboardRoute,"dashboardRoute");
      // Navigate to the appropriate dashboard
      router.push(dashboardRoute);
      
      return response;
    } catch (error: any) {
      toast({
        title: 'Error',
        content: error.message || 'Login failed',
        variant: 'destructive',
      });
      throw error;
    }
  }, [router, toast]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const result = await auth.register(data);
      router.push(ROUTES.AUTH.LOGIN);
      return result;
    } catch (error) {
      toast({
        title: 'Registration Failed',
        content: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    }
  }, [router, toast]);

  const logout = useCallback(async () => {
    try {
      await auth.logout();
      router.push(ROUTES.AUTH.LOGIN);
    } catch (error) {
      toast({
        title: 'Logout Failed',
        content: error instanceof Error ? error.message : 'An error occurred while logging out',
        variant: 'destructive',
      });
    }
  }, [router, toast]);

  const getUser = useCallback((): User | null => {
    return auth.getUser();
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return auth.isAuthenticated();
  }, []);

  return {
    login,
    register,
    logout,
    getUser,
    isAuthenticated,
  };
};
