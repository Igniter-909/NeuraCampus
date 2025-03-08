import { useState, useCallback } from 'react';
import {apiClient} from '@/lib/api';
import { useToast } from '../ui/useToast';

interface MutationOptions<T, V> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  transform?: (variables: V) => any;
}

interface MutationResult<T, V> {
  mutate: (variables: V) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export function useMutation<T = any, V = any>(
  url: string,
  method: 'post' | 'put' | 'delete' = 'post',
  options: MutationOptions<T, V> = {}
): MutationResult<T, V> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  const mutate = useCallback(async (variables: V): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = options.transform ? options.transform(variables) : variables;
      let response;

      switch (method) {
        case 'post':
          response = await apiClient.post<T>(url, data);
          break;
        case 'put':
          response = await apiClient.put<T>(url, data);
          break;
        case 'delete':
          response = await apiClient.delete<T>(url);
          break;
      }

      options.onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      toast({
        title: 'Error',
        content: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
      options.onSettled?.();
    }
  }, [url, method, options, toast]);

  return {
    mutate,
    isLoading,
    error,
    reset,
  };
} 