'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { useUser } from '@/hooks/auth/useUser';
import { format, addMonths, subMonths } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageProgress {
  language: string;
  progress: number;
  color: string;
}

interface Activity {
  time: string;
  title: string;
  startTime: string;
  endTime: string;
  backgroundColor: string;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

const RightSidebar: FC = () => {
  const { user, loading } = useUser();
  const [activeTab, setActiveTab] = useState<'activities' | 'goals'>('activities');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample data - replace with API calls in production
  const languageProgress: LanguageProgress[] = [
    { language: 'French', progress: 45, color: '#36A2EB' },
    { language: 'Spanish', progress: 60, color: '#FF6384' },
    { language: 'Italian', progress: 35, color: '#FFCE56' }
  ];

  const dailyActivities: Activity[] = [
    {
      time: '12:00',
      title: 'Introduction to Spanish',
      startTime: '12:40',
      endTime: '13:30',
      backgroundColor: '#FFF9E5'
    },
    {
      time: '14:00',
      title: 'English for travel',
      startTime: '14:00',
      endTime: '15:30',
      backgroundColor: '#E5F3FF'
    }
  ];

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Complete Spanish B1',
      progress: 65,
      dueDate: '2024-03-30',
      priority: 'high'
    },
    {
      id: '2',
      title: 'French Vocabulary',
      progress: 40,
      dueDate: '2024-04-15',
      priority: 'medium'
    }
  ];

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  if (loading) {
    return (
      <div className="w-80 bg-white p-6 rounded-xl shadow-sm">
        <motion.div
          className="w-full h-40 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 text-[#2D3748] rounded-xl  bg-white shadow-xl flex flex-col h-full relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(45deg, #4F46E5 0%, #10B981 100%)',
          backgroundSize: '400% 400%'
        }}
        variants={backgroundVariants}
        animate="animate"
      />

      {/* Upper Section - User Profile & Calendar */}
      <div className="p-6 border-b relative">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Image with Animation */}
          <motion.div 
            className="relative w-20 h-20 mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full h-full rounded-full bg-blue-500 overflow-hidden">
              <Image
                src={user.media?.avatar?.url || '/default-avatar.png'}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.h3 
            className="text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {user.name}
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-500 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {`${user.role}${user.grade ? ` / Grade ${user.grade}` : ''}`}
          </motion.p>

          {/* Calendar Section with Animation */}
          <motion.div 
            className="w-full bg-white rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.span 
                className="text-sm font-medium"
                key={currentDate.toString()}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {format(currentDate, 'MMMM yyyy')}
              </motion.span>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Calendar Grid */}
            <motion.div 
              className="grid grid-cols-7 gap-1 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* ... keep existing calendar grid code ... */}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Lower Section with Tabs */}
      <motion.div 
        className="flex-1 p-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="mt-4">
            <div className="flex items-center mb-4">
              <h4 className="text-lg font-semibold">Daily activity</h4>
              <span className="ml-2 text-sm text-gray-500">
                {format(new Date(), "d MMMM")}
              </span>
            </div>
            
            <div className="space-y-4">
              {dailyActivities.map((activity, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                  <div 
                    className="mt-1 p-3 rounded-lg"
                    style={{ backgroundColor: activity.backgroundColor }}
                  >
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-gray-600">
                      {`${activity.startTime}-${activity.endTime}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="mt-4">
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="shadow-md shadow-blue-200 border-0 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{goal.title}</h5>
                    <span className={`text-xs px-2 py-1 rounded ${
                      goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                      goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {goal.priority}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Due: {format(new Date(goal.dueDate), "d MMM yyyy")}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default RightSidebar;
