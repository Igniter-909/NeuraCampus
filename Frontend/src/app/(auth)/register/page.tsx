'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    profile: {
      phone: '',
      gender: '',
      dateOfBirth: '',
      bio: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
      }
    },
    media: {
      avatar: null as File | null
    },
    collegeId: '',
    departmentId: '',
    status: 'pending'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('status', formData.status);

      // Add profile fields
      Object.entries(formData.profile).forEach(([key, value]) => {
        if (key === 'address') {
          Object.entries(value).forEach(([addressKey, addressValue]) => {
            formDataToSend.append(`profile[address][${addressKey}]`, String(addressValue));
          });
        } else {
          formDataToSend.append(`profile[${key}]`, String(value));
        }
      });

      // Add avatar if exists
      if (formData.media.avatar) {
        formDataToSend.append('avatar', formData.media.avatar);
      }

      // Add IDs if they exist
      if (formData.collegeId) formDataToSend.append('collegeId', formData.collegeId);
      if (formData.departmentId) formDataToSend.append('departmentId', formData.departmentId);

      await register(formDataToSend);
    } catch (error: any) {
      toast({
        title: 'Error',
        content: error.response?.data?.message || 'Registration failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="text-sm font-medium text-gray-700">
                Role
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.profile.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, phone: e.target.value }
                })}
                className="mt-1"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="gender" className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <Select
                value={formData.profile.gender}
                onValueChange={(value) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, gender: value }
                })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.profile.dateOfBirth}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, dateOfBirth: e.target.value }
                })}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="avatar" className="text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFormData({
                    ...formData,
                    profile: { ...formData.profile, avatar: file }
                  });
                }}
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 