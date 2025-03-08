import { User } from '../user';
import { Department, Program, Status } from './common';

export interface SuperAdmin extends User {
  accessLevel: 'full' | 'restricted';
  managedInstitutions: Institution[];
  auditLog: AuditLogEntry[];
  systemPreferences: SystemPreferences;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  type: InstitutionType;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
    fax?: string;
  };
  departments: Department[];
  programs: Program[];
  status: Status;
  license: LicenseInfo;
  stats: InstitutionStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface InstitutionType {
  category: 'university' | 'college' | 'institute';
  accreditation: string[];
  affiliations: string[];
}

export interface LicenseInfo {
  licenseKey: string;
  validFrom: Date;
  validUntil: Date;
  features: string[];
  maxUsers: number;
  maxDepartments: number;
}

export interface InstitutionStats {
  totalStudents: number;
  totalFaculty: number;
  totalDepartments: number;
  totalPrograms: number;
  activeUsers: number;
  storageUsed: number;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  performedBy: string;
  targetType: string;
  targetId: string;
  changes: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

export interface SystemPreferences {
  maintenance: {
    enabled: boolean;
    scheduledTime?: Date;
    message?: string;
  };
  security: {
    maxLoginAttempts: number;
    passwordPolicy: PasswordPolicy;
    sessionTimeout: number;
  };
  backup: {
    frequency: 'daily' | 'weekly' | 'monthly';
    retention: number;
    lastBackup?: Date;
  };
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  expiryDays: number;
} 