'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import cookieUtils from '@/lib/cookies';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error: any) => {
          // Don't retry on 401/403 auth errors
          if (error?.response?.status === 401 || error?.response?.status === 403) {
            console.error('Authentication error in query:', error);
            // Could implement token refresh here if needed
            return false;
          }
          // Otherwise retry up to 2 times
          return failureCount < 2;
        },
        // Default staleTime to reduce excessive refetching
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
      mutations: {
        // Handle auth errors in mutations
        onError: (error: any) => {
          if (error?.response?.status === 401 || error?.response?.status === 403) {
            console.error('Authentication error in mutation:', error);
            // Refresh token or redirect to login if needed
          }
        }
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 