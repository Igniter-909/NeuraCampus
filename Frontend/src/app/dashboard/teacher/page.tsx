"use client"

import { useState, useEffect } from "react"
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { redirect } from 'next/navigation';
import { useUser } from "@/hooks/auth/useUser";
import WelcomeBanner from '@/components/ui/WelcomeBanner';
import StatsCard from '@/components/ui/StatsCard';
import DaySchedule from '@/components/role-specific/faculty/DaySchedule';
import { EventCalendar } from '@/components/ui/EventCalender';

export default function FacultyDashboardPage() {
  const { user, loading, error } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after mounting to prevent hydration mismatch
  if (!mounted) {
    return <LoadingSkeleton height="lg" />;
  }

  if (loading) {
    return <LoadingSkeleton height="lg" />;
  }

  if (!user) {
    redirect('/login');
  }

  if (user?.role !== 'teacher') {
    redirect('/login');
  }

  return (
    <div className="w-full p-6 bg-white dark:bg-black">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <WelcomeBanner 
            title="Welcome back, Professor!" 
            description="Here's an overview of your classes and tasks" 
            buttonText="View Schedule" 
            onButtonClick={() => {}} 
            className="shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsCard
              icon="📚"
              value={12}
              title="Total Classes"
              trend={{ value: 1, isPositive: true }}
              className="bg-[#FB8892] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 dark:bg-[#FB8892]/80"
            />
            <StatsCard
              icon="👨‍🎓"
              value={248}
              title="Total Students"
              trend={{ value: 2.5, isPositive: true }}
              className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 dark:bg-[#5552AB]/80"
            />
            <StatsCard
              icon="🕒"
              value={5}
              title="Lectures Left"
              trend={{ value: 1, isPositive: false }}
              className="bg-[#A1A2D8] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 dark:bg-[#A1A2D8]/80"
            />
            <StatsCard
              icon="📊"
              value="86%"
              title="Average Attendance"
              trend={{ value: 2.5, isPositive: true }}
              className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 dark:bg-[#5552AB]/80"
            />
          </div>

          <DaySchedule />
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Event Calendar</h2>
            <EventCalendar 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow dark:bg-slate-800"
            />
          </div>
        </div>

      </div>
    </div>
  );
}