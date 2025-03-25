// src/app/(auth)/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth/useAuth';
import { ROLE_DASHBOARD_ROUTES, UserRole } from '@/constants/routes';
import cookieUtils from '@/lib/cookies';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import loginImage from '../../../../public/login.png';
import logo from '../../../../public/logo11.png';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { FaUserGraduate, FaChalkboardTeacher, FaBriefcase, FaUserShield, FaUserTie } from 'react-icons/fa';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { getUser, login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== 'undefined') {
      const remembered = localStorage.getItem('rememberMe');
      return remembered === 'true';
    }
    return false;
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Load remembered email on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail && rememberMe) {
        setValue('email', rememberedEmail);
      }
    }
  }, [setValue, rememberMe]);

  // Check if user is already logged in
  useEffect(() => {
    const token = cookieUtils.get('token');
    const user = getUser();
    if (token && user?.role) {
      const redirectPath = ROLE_DASHBOARD_ROUTES[user.role as UserRole];
      if (redirectPath) {
        router.replace(redirectPath);
      }
    }
  }, [router, getUser]);

  const onSubmit = async (formData: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await login({
        email: formData.email,
        password: formData.password,
        // role: userType
      });

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberedEmail');
      }

      toast({
        title: "Success!",
        content: "Successfully logged in",
        variant: "default",
      });

      const redirectPath = ROLE_DASHBOARD_ROUTES[response.role as UserRole];
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        content: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = '/api/auth/google';
  // };

  // If already authenticated, show loading state
  if (getUser() && cookieUtils.get('token')) {
    return <div>Loading...</div>;
  }

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
      description: "Faculty access",
      icon: <FaChalkboardTeacher className="w-5 h-5" />,
    },
    {
      id: "recruiter",
      title: "Recruiter",
      description: "Placement",
      icon: <FaBriefcase className="w-5 h-5" />,
    },
    {
      id: "admin",
      title: "Admin",
      description: "Administration",
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
      
      {showComingSoon && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowComingSoon(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-[30px] shadow-2xl transform transition-all duration-300 animate-in fade-in zoom-in">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4 text-center">
              Coming Soon
            </h2>
            <p className="text-gray-600 text-center text-lg mb-6">
              We&apos;re working hard to bring you an amazing experience!
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl 
                hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Left Section - Login Form */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-8 left-8 p-2 text-white hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-blue-50/50 group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 transform group-hover:translate-x-[-2px] transition-transform" />
          </button>

          <div className="bg-white/95 backdrop-blur-sm rounded-[30px] p-8 shadow-2xl">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center">
                <Image
                  src={logo}
                  alt="NeuraCampus Logo"
                  width={120}
                  height={40}
                  className="h-12 w-auto mb-4"
                />
                <span className="ml-2 text-xl font-bold text-blue-500">
                  Neura<span className="text-gray-800">Campus</span>
                </span>
              </div>
              <Link 
                href="/register" 
                className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
              >
                ? I do not have an account yet
              </Link>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 text-center mb-4 font-medium">I am</p>
              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    className={`group p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] ${
                      userType === type.id
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/50"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-md hover:shadow-lg hover:shadow-gray-200/50"
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${
                      userType === type.id ? "bg-white/20" : "bg-gray-50"
                    }`}>
                      {type.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{type.title}</div>
                      <div className={`text-xs transition-all duration-300 ${
                        userType === type.id 
                          ? "opacity-90 max-h-8 mt-0.5" 
                          : "opacity-0 max-h-0"
                      }`}>
                        {type.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 shadow-sm"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Forgot password?
                </button>
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
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
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
            Transform Your <br />
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Educational Management
            </span>
          </h1>
          
          <p className="text-lg dark:text-white/80 text-blue-950/90 mb-8 leading-relaxed drop-shadow max-w-lg mx-auto">
            Streamline your academic processes, enhance collaboration, and make data-driven decisions with our comprehensive school management platform.
          </p>
          <div className="mt-8">
            <Image
              src={loginImage}
              alt="Management Illustration"
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