export interface QuestionnaireData {
  organizationName: string;
  position: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  linkedInProfile: string;
  websiteUrl?: string;
  organizationType: 'educational' | 'corporate' | 'other';
  purpose: string;
  expectedUsage: string;
  additionalInfo?: string;
  submittedAt: Date;
}

export const ORGANIZATION_TYPES = [
  { value: 'educational', label: 'Educational Institution' },
  { value: 'corporate', label: 'Corporate Organization' },
  { value: 'other', label: 'Other' }
]; 