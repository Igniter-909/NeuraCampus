import { Role } from './roles';

// Authentication Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  avatar?: string;
  department?: string;
  lastLogin?: Date;
}

// Registration Types
export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  department?: string;
}

// Password Reset Types
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// Session Types
export interface Session {
  user: AuthUser;
  expires: string;
}
