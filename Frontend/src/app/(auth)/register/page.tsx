'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth/useAuth';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import loginImage from '../../../../public/login.png';
import logo from '../../../../public/logo11.png';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { RegistrationQuestionnaire } from '@/components/common/RegistrationQuestionnaire';
import { QuestionnaireData } from '@/types/questionnaire';
import { FaUserGraduate, FaChalkboardTeacher, FaBriefcase, FaUserShield, FaUserTie } from 'react-icons/fa';
import { BsPersonBadgeFill } from 'react-icons/bs';
import { questionnaireApi } from '@/services/api/questionnaire';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  avatar: z.any().optional(), // For file upload
  company: z.string().optional(), // For recruiter
  designation: z.string().optional(), // For recruiter
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("student");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      
      // Add all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'avatar' && value[0]) {
          formData.append(key, value[0]); // Append the file
        } else if (value && key !== 'avatar') {
          formData.append(key, value);
        }
      });

      await registerUser(formData);
      
      toast({
        title: 'Success',
        content: 'Registration successful! Please check your email for verification.',
        variant: 'default'
      });

      router.push('/login');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast({
        title: 'Error',
        content: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = () => {
    if (userType === 'recruiter' || userType === 'admin'|| userType === 'alumni'|| userType === 'student'|| userType === 'faculty') {
      setShowQuestionnaire(true);
    }
  };

  const handleQuestionnaireSubmit = async (data: QuestionnaireData) => {
    try {
      setIsLoading(true);
      await questionnaireApi.submit(data);
      // Here you would typically submit the questionnaire data to your backend
      console.log('Questionnaire data:', data);
      setShowQuestionnaire(false);
      toast({
        title: 'Success',
        content: 'Thank you for providing additional information.',
        variant: 'default'
      });
    } catch (error) {
      console.error('Questionnaire submission error:', error);
      toast({
        title: 'Error',
        content: 'Failed to submit questionnaire. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    {
      id: "student",
      title: "Student",
      description: "Student portal",
      icon: <FaUserGraduate className="w-5 h-5" />,
    },
    {
      id: "faculty",
      title: "Faculty",
      description: "Teaching staff",
      icon: <FaChalkboardTeacher className="w-5 h-5" />,
    },
    {
      id: "recruiter",
      title: "Recruiter",
      description: "Company hiring",
      icon: <FaBriefcase className="w-5 h-5" />,
    },
    {
      id: "admin",
      title: "Admin",
      description: "School admin",
      icon: <FaUserShield className="w-5 h-5" />,
    },
    {
      id: "alumni",
      title: "Alumni",
      description: "Former students",
      icon: <FaUserTie className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative overflow-hidden h-screen flex">
      <AnimatedBackground />
      
      {showQuestionnaire && (
        <RegistrationQuestionnaire
          userType={userType}
          email={getValues('email')}
          onSubmit={handleQuestionnaireSubmit}
          onCancel={() => setShowQuestionnaire(false)}
          isLoading={isLoading}
        />
      )}

      {/* Left Section - Registration Form */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="fixed top-8 left-8 p-2 text-white hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-blue-50/50 group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 transform group-hover:translate-x-[-2px] transition-transform" />
          </button>

          <div className="bg-white/95 backdrop-blur-sm rounded-[30px] p-8 shadow-2xl">
            {/* Header with Logo and Avatar Upload */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Image
                  src={logo}
                  alt="NeuraCampus Logo"
                  width={100}
                  height={35}
                  className="h-10 w-auto"
                />
                <span className="ml-2 text-lg font-bold text-blue-500">
                  Neura<span className="text-gray-800">Campus</span>
                </span>
              </div>
              
              {/* Profile Image Upload */}
              <div className="relative">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30 group">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                      <BsPersonBadgeFill className="w-8 h-8 text-blue-300" />
                    </div>
                  )}
                  <label 
                    htmlFor="avatar" 
                    className="absolute inset-0 bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <span className="text-blue-600 text-xs font-medium">Upload</span>
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register('avatar')}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Select your role</p>
              <div className="grid grid-cols-3 gap-2">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${
                      userType === type.id
                        ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${
                      userType === type.id ? "bg-white/20" : "bg-white"
                    }`}>
                      {type.icon}
                    </div>
                    <span className="text-xs font-medium">{type.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-4"
              autoComplete="off"
            >
              <input
                type="text"
                {...register('name')}
                placeholder="Full Name"
                onFocus={handleInputFocus}
                autoComplete="off"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}

              <input
                type="email"
                {...register('email')}
                placeholder="Email address"
                onFocus={handleInputFocus}
                autoComplete="off"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Password"
                  onFocus={handleInputFocus}
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 shadow-sm text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="Phone Number"
                  onFocus={handleInputFocus}
                  autoComplete="off"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
                />

                <select
                  {...register('gender')}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  onFocus={handleInputFocus}
                  autoComplete="off"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
                />

                <input
                  type="hidden"
                  {...register('role')}
                  value={userType}
                />

                {userType === 'recruiter' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      {...register('company')}
                      placeholder="Company Name"
                      onFocus={handleInputFocus}
                      autoComplete="off"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
                    />
                    <input
                      type="text"
                      {...register('designation')}
                      placeholder="Designation"
                      onFocus={handleInputFocus}
                      autoComplete="off"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <Link 
                      href="/login" 
                      className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      Already have an account?
                    </Link>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium 
                hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
                shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="relative md:my-10 z-10 hidden md:flex w-1/2 items-center justify-center p-12">
        <div className="text-center">
          <h1 className="text-5xl mt-10 font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Join Our <br />
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Educational Community
            </span>
          </h1>
          
          <p className="text-lg dark:text-white/80 text-blue-950/90 mb-8 leading-relaxed drop-shadow max-w-lg mx-auto">
            Start your journey with us and experience a new way of learning. Connect with peers, access resources, and grow together.
          </p>
          <div className="mt-8">
            <Image
              src={loginImage}
              alt="Education Illustration"
              width={500}
              height={390}
              className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
} 