// src/app/(dashboard)/college-admin/page.tsx
'use client'

import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/auth/useUser';
import { redirect } from 'next/navigation';
import { Role, ROLES } from '@/constants/roles';
import { ROLE_DASHBOARD_ROUTES } from '@/constants/routes';
import { useToast } from '@/components/ui/use-toast';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { collegeAdminApi } from '@/services/collegeAdmin';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardStatsInterface } from '@/types/role-specific/college-admin';
import { useState, useEffect } from 'react'
import AddEventModal, { EventType } from '@/components/ui/AddEventModal'

// Components
import WelcomeBanner from '@/components/ui/WelcomeBanner';
import FinanceChart from '@/components/role-specific/college-admin/Dashboard/FinanceChart';
import PerformanceChart from '@/components/role-specific/college-admin/Dashboard/PerformanceChart';
import StatsCard from '@/components/ui/StatsCard';
import{ EventCalendar }from '@/components/ui/EventCalender';
import UpcomingEvents from '@/components/ui/UpcomingEvents';

const statsData = [
  {
    icon: "👨‍🎓",
    value: 8998,
    label: "Total Students",
    trend: { value: 0.5, isPositive: true }
  },
  {
    icon: "👨‍🏫",
    value: 854,
    label: "Total Teachers",
    trend: { value: 5, isPositive: false }
  },
  {
    icon: "📅",
    value: 520,
    label: "Events",
    trend: { value: 6, isPositive: true }
  },
  {
    icon: "📄",
    value: 2235,
    label: "Invoice Status",
    trend: { value: 0.2, isPositive: true }
  }
];

const financeData = [
  { date: 'Mon', invoices: 20000, expenses: 15000 },
  { date: 'Tue', invoices: 32000, expenses: 20000 },
  { date: 'Wed', invoices: 28000, expenses: 25000 },
  { date: 'Thu', invoices: 35000, expenses: 18000 },
  { date: 'Fri', invoices: 30000, expenses: 22000 },
  { date: 'Sat', invoices: 25000, expenses: 16000 }
];

const performanceData = Array.from({ length: 10 }, (_, i) => ({
  week: `Week ${String(i + 1).padStart(2, '0')}`,
  students: Math.floor(Math.random() * 40) + 20,
  teachers: Math.floor(Math.random() * 30) + 10
}));

const calendarEvents = [
  { date: new Date(2025, 1, 3), count: 2 },
  { date: new Date(2025, 1, 5), count: 1 },
  { date: new Date(2025, 1, 15), count: 3 },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'School Live Concert cashier',
    date: new Date(2024, 1, 3),
    type: 'ticket-sale',
    ticketsSold: 200,
    totalTickets: 300,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'School Live Concert Event 2022',
    date: new Date(2024, 1, 5),
    time: '14:00 - 16:00',
    location: 'Main Auditorium',
    type: 'event',
    status: 'upcoming'
  },
  // Add more events as needed
];

export default function CollegeAdminDashboard() {
  // User-related hooks
  const { user, loading: userLoading, error: userError } = useUser()
  const { toast } = useToast()

  // Modified state hooks
  const [events, setEvents] = useState<EventType[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("events")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  
  // Query hooks
  const { data: stats, isLoading } = useQuery<DashboardStatsInterface>({
    queryKey: ['dashboardStats', user?._id],
    queryFn: async () => {
      const response = await collegeAdminApi.getDashboardStats()
      return response.data
    },
    enabled: user?.role === ROLES.college_admin,
    refetchOnMount: true,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  // Effects
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]')
    setEvents(savedEvents)
  }, [])

  useEffect(() => {
    if (!userLoading && user?.role !== ROLES?.college_admin) {
      redirect(ROLE_DASHBOARD_ROUTES[user?.role as Role] || '/login')
    }
  }, [user, userLoading])

  // Modified event handler
  const handleEventAdd = (newEvent: EventType) => {
    setEvents(prev => [...prev, newEvent])
    // Save to localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]')
    localStorage.setItem('events', JSON.stringify([...existingEvents, newEvent]))
    toast({
      title: "Event added successfully",
      content: "Your new event has been added to the calendar",
    })
  }

  if (userLoading || isLoading) return <LoadingSkeleton height="lg" />

  return (
    <>
      {/* Add SVG Pattern Definition */}
      <svg className="fixed inset-0 -z-10 h-full w-full">
        <defs>
          <pattern 
            id="pattern-26" 
            patternUnits="userSpaceOnUse" 
            width="12" 
            height="12"
            className="opacity-[0.05]"
          >
            <rect 
              width="2" 
              height="2" 
              x="0" 
              y="0" 
              fill="currentColor"
              className="text-slate-400 dark:text-slate-950"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-26)" />
      </svg>

      <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-transparent">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
            <WelcomeBanner 
              title="Welcome to your dashboard" 
              description="Here you can manage your college and see your stats" 
              buttonText="View Stats" 
              onButtonClick={() => {}} 
              className="shadow-lg rounded-xl bg-gradient-to-r from-purple-800 to-amber-500"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className='w-full sm:w-1/2'>
                <div className="grid grid-cols-2 gap-6">
                  <StatsCard
                    icon="👨‍🎓"
                    value={8998}
                    title="Total Students"
                    trend={{ value: 0.5, isPositive: true }}
                    className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                  <StatsCard
                    icon="👨‍🏫"
                    value={854}
                    title="Total Teachers"
                    trend={{ value: 5, isPositive: false }}
                    className="bg-[#FB8892] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                  <StatsCard
                    icon="📅"
                    value={520}
                    title="Events"
                    trend={{ value: 6, isPositive: true }}
                    className="bg-[#A1A2D8] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                  <StatsCard
                    icon="📄"
                    value={2235}
                    title="Invoice Status"
                    trend={{ value: 0.2, isPositive: true }}
                    className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                </div>
              </div>
              
              <div className='w-full md:w-1/2'>
                <FinanceChart
                  data={financeData}
                  period="Weekly"
                  totalInvoices={352586.00}
                  totalExpenses={10528}
                  className="shadow-lg rounded-xl hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <PerformanceChart
                data={performanceData}
                period="Monthly"
                onPeriodChange={(value) => console.log('Period changed:', value)}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
            <Card className="p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow">
              <Select defaultValue="period-1">
                <SelectTrigger className="shadow-sm hover:shadow transition-shadow">
                  <SelectValue placeholder="Jan 20th - Feb 28th 2022" />
                </SelectTrigger>
                <SelectContent className="shadow-lg">
                  <SelectItem value="period-1">Jan 20th - Feb 28th 2022</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            <div className="flex justify-between items-center">
              <AddEventModal 
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onEventAdd={handleEventAdd}
                initialDate={selectedDate}
                className="shadow-2xl"
              />
            </div>
            
            <EventCalendar 
              eventsList={events}
              onDateSelect={(date: Date) => {
                setSelectedDate(date)
                setIsAddModalOpen(true)
              }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            />

            <UpcomingEvents 
              events={events}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>
      </div>
    </>
  );
}