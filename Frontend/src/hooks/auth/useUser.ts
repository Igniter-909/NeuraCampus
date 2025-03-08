'use client'
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { apiClient } from '@/lib/api';
import auth from '@/lib/auth';
import cookieUtils from '@/lib/cookies';

interface TokenData {
  userId: string;
  role: string;
  status: string;
  lastLogin: Date;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { verifyToken } = auth;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // First get token data
        const token = cookieUtils.get('token');
        if (!token) {
          throw new Error('No token found');
        }
        const tokenData = await verifyToken(token) as TokenData;
        // console.log(tokenData,"tokenData");
        // Then fetch complete user details
        const response = await apiClient.get(`auth/user/${tokenData.userId}`);
        // console.log(response,"response");
        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [verifyToken]);

  return { user, loading, error };
}; 