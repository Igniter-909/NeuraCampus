import { User } from '../user';

export interface Clerk extends User {
  department: string;
  responsibilities: ClerkResponsibilities;
  accessRights: AccessRights;
  handledDocuments: DocumentType[];
}

export interface ClerkResponsibilities {
  studentRecords: boolean;
  admissions: boolean;
  fees: boolean;
  certificates: boolean;
  attendance: boolean;
  general: boolean;
}

export interface AccessRights {
  readAccess: string[];
  writeAccess: string[];
  approvalRights: string[];
}

export interface DocumentType {
  type: string;
  canCreate: boolean;
  canModify: boolean;
  canApprove: boolean;
  template?: string;
}

export interface DocumentRequest {
  id: string;
  type: string;
  requestedBy: string;
  requestedDate: Date;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  notes?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  amount: number;
  type: 'tuition' | 'exam' | 'library' | 'other';
  semester: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paidDate?: Date;
  transactionId?: string;
}

export interface Certificate {
  id: string;
  type: 'provisional' | 'degree' | 'transcript' | 'bonafide';
  studentId: string;
  issueDate: Date;
  validUntil?: Date;
  serialNumber: string;
  status: 'draft' | 'issued' | 'verified';
} 