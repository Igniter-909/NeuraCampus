import { Role } from './roles';

// Base User Interface
export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  media: {
    avatar: {
      url: string;
    };
  };
  profile: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
    };
    bio: string;
    phone: string;
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  };
  verificationStatus: {
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  lastLogin: string | null;
  createdAt: string;
}

// User Profile
export interface UserProfile extends User {
  phone?: string;
  address?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  preferences?: UserPreferences;
}

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  timezone: string;
}

// User Settings
export interface UserSettings {
  id: string;
  userId: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  security: SecuritySettings;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  notificationTypes: {
    announcements: boolean;
    messages: boolean;
    updates: boolean;
    reminders: boolean;
  };
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showOnlineStatus: boolean;
  showLastSeen: boolean;
  showEmail: boolean;
  showPhone: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: Date;
  activeSessions: number;
  loginAlerts: boolean;
}
