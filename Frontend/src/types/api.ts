// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse {
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface ErrorResponse extends ApiResponse {
  success: false;
  error: string;
}

export interface SuccessResponse<T = unknown> extends ApiResponse {
  success: true;
  data: T;
}

// API Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  stack?: string;
}

// API Request Types
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Common API Endpoints
export interface ApiEndpoints {
  base: string;
  create: string;
  update: (id: string) => string;
  delete: (id: string) => string;
  getOne: (id: string) => string;
  getAll: string;
}

// API Methods
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API Headers
export interface ApiHeaders {
  Authorization?: string;
  'Content-Type': string;
  Accept: string;
  [key: string]: string | undefined;
}
