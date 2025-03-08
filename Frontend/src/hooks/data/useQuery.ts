import { useState, useEffect, useCallback } from 'react';
import {apiClient } from '@/lib/api';
import { useToast } from '../ui/useToast';

interface QueryOptions<T> {
  enabled?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuery<T>(
  url: string,
  options: QueryOptions<T> = {}
): QueryResult<T> {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.get<T>(url);
      setData(response.data);
      options.onSuccess?.(response.data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      toast({
        title: 'Error',
        content: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [url, options, toast]);

  useEffect(() => {
    if (options.enabled !== false) {
      fetchData();
    }
  }, [fetchData, options.enabled]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
} 