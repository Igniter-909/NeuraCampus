// src/app/(dashboard)/college-admin/page.tsx
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/hooks/auth/useUser';
import { redirect } from 'next/navigation';
import { Role, ROLES } from '@/constants/roles';
import { ROLE_DASHBOARD_ROUTES } from '@/constants/routes';
import { useToast } from '@/components/ui/use-toast';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { collegeAdminApi } from '@/services/collegeAdmin';
import { eventApi } from '@/services/event';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardStatsInterface } from '@/types/role-specific/college-admin';
import { useState, useEffect } from 'react'
import AddEventModal from '@/components/ui/AddEventModal'
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';
import { format } from 'date-fns';

// Components
import WelcomeBanner from '@/components/ui/WelcomeBanner';
import FinanceChart from '@/components/role-specific/college-admin/Dashboard/FinanceChart';
import PerformanceChart from '@/components/role-specific/college-admin/Dashboard/PerformanceChart';
import StatsCard from '@/components/ui/StatsCard';
import { EventCalendar } from '@/components/ui/EventCalender';
import UpcomingEvents from '@/components/ui/UpcomingEvents';

interface Event {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  ticketInfo?: {
    isPaid: boolean;
    soldTickets: number;
    totalTickets: number;
  };
}

interface FormattedEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  type: 'ticket-sale' | 'event';
  ticketsSold: number;
  totalTickets: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface ApiError extends Error {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

// Generate realistic finance data 
const generateFinanceData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(date => {
    const invoices = Math.floor(10000 + Math.random() * 30000);
    const expenses = Math.floor(8000 + Math.random() * 20000);
    return { 
      date, 
      invoices, 
      expenses 
    };
  });
};

// Generate realistic performance data
const generatePerformanceData = (students: number, teachers: number) => {
  return Array.from({ length: 10 }, (_, i) => ({
    week: `Week ${String(i + 1).padStart(2, '0')}`,
    students: Math.floor((students / 10) * (0.8 + Math.random() * 0.4)),
    teachers: Math.floor((teachers / 10) * (0.8 + Math.random() * 0.4))
  }));
};

export default function CollegeAdminDashboard() {
  // User-related hooks
  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State hooks
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState('period-1');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Get college ID safely
  const collegeId = user?.college || '';
  
  // Query for dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStatsInterface>({
    queryKey: ['dashboardStats', collegeId],
    queryFn: async () => {
      if (!collegeId) throw new Error('No college ID found');
      const response = await collegeAdminApi.getDashboardStats(collegeId);
      return response.data.data;
    },
    enabled: !!collegeId && user?.role === ROLES.college_admin,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Query for events
  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ['events', collegeId],
    queryFn: async () => {
      if (!collegeId) return { data: [] };
      try {
        console.log('Fetching events for college ID:', collegeId);
        const response = await eventApi.getEvents(collegeId, {
          limit: 10,
          status: 'upcoming'
        });
        console.log('Events data:', response.data);
        return response.data;
      } catch (error: unknown) {
        const apiError = error as ApiError;
        console.error('Error fetching events:', apiError);
        if (apiError?.response?.status === 401) {
          console.log('Auth error detected, attempting to refresh session...');
          if (typeof window !== 'undefined') {
            // Implement token refresh mechanism here if needed
          }
        }
        return { data: [] };
      }
    },
    enabled: !!collegeId && user?.role === ROLES.college_admin,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1, // Only retry once to avoid hanging on auth errors
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: (newEvent: Omit<FormattedEvent, 'id'>) => {
      if (!collegeId) throw new Error('No college ID found');
      return eventApi.createEvent(collegeId, {
        title: newEvent.title,
        description: newEvent.description,
        eventDate: format(newEvent.date, 'yyyy-MM-dd'),
        startTime: newEvent.time.split(' - ')[0],
        endTime: newEvent.time.split(' - ')[1],
        location: newEvent.location,
        ticketInfo: {
          isPaid: newEvent.type === 'ticket-sale',
          totalTickets: newEvent.totalTickets
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', collegeId] });
      setIsAddModalOpen(false);
      toast({
        title: 'Success',
        content: 'Event created successfully',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast({
        title: 'Error',
        content: apiError?.response?.data?.message || 'Failed to create event',
        variant: 'destructive',
      });
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: ({ eventId, eventData }: { eventId: string, eventData: Record<string, any> }) => {
      return eventApi.updateEvent(eventId, eventData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', collegeId] });
      toast({
        title: 'Success',
        content: 'Event updated successfully',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast({
        title: 'Error',
        content: apiError?.response?.data?.message || 'Failed to update event',
        variant: 'destructive',
      });
    },
  });

  // Generate finance and performance data based on stats
  const financeData = stats?.subscription?.pricing?.amount 
    ? generateFinanceData()
    : Array.from({ length: 7 }, (_, i) => ({ 
        date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], 
        invoices: 0, 
        expenses: 0 
      }));
  
  const performanceData = stats?.stats
    ? generatePerformanceData(stats.stats.students.total, stats.stats.teachers.total)
    : Array.from({ length: 10 }, (_, i) => ({
        week: `Week ${String(i + 1).padStart(2, '0')}`,
        students: 0,
        teachers: 0
      }));

  // Format events for the calendar
  const formattedEvents: FormattedEvent[] = eventsData?.data?.map((event: Event) => ({
    id: event._id,
    title: event.title,
    date: new Date(event.eventDate),
    time: `${event.startTime} - ${event.endTime}`,
    location: event.location,
    description: event.description,
    type: event.ticketInfo?.isPaid ? 'ticket-sale' : 'event',
    ticketsSold: event.ticketInfo?.soldTickets || 0,
    totalTickets: event.ticketInfo?.totalTickets || 0,
    status: event.status
  })) || [];

  // Add finance-related state variables
  const [financePeriod] = useState('Weekly');
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Update useEffect to set finance totals
  useEffect(() => {
    if (stats?.stats?.invoices?.value) {
      setTotalInvoices(stats.stats.invoices.value);
      setTotalExpenses(Math.round(stats.stats.invoices.value * 0.7));
    }
  }, [stats]);

  // Handle event update
  const handleEventUpdate = (event: any) => {
    if (!event._id) {
      toast({
        title: 'Error',
        content: 'Event ID not found',
        variant: 'destructive',
      });
      return;
    }

    // Convert the event to the format expected by the API
    const eventData: any = {
      title: event.title,
      description: event.description,
      eventDate: event.eventDate || event.date,
      startTime: event.startTime || (event.time?.split(' - ')[0]),
      endTime: event.endTime || (event.time?.split(' - ')[1]),
      location: event.location,
      status: event.status,
      ticketInfo: event.ticketInfo
    };

    updateEventMutation.mutate({ eventId: event._id, eventData });
    
    // Invalidate the events query to refresh the data
    queryClient.invalidateQueries({ queryKey: ['events'] });
  };

  // Update handleEventAdd to include the required date property
  const handleEventAdd = (eventData: {
    title: string;
    type: 'academic' | 'cultural' | 'sports' | 'placement' | 'seminar' | 'workshop' | 'other';
    location: string;
    description: string;
    eventDate: Date;
    startTime: string;
    endTime: string;
    organizer: {
      name: string;
      email: string;
      phone: string;
    };
    isPublic: boolean;
    media?: {
      gallery: string[];
      coverImage?: string;
    };
  }) => {
    const newEvent: Omit<FormattedEvent, 'id'> = {
      title: eventData.title,
      date: eventData.eventDate,
      time: `${eventData.startTime} - ${eventData.endTime}`,
      location: eventData.location,
      description: eventData.description,
      type: 'event',
      ticketsSold: 0,
      totalTickets: 0,
      status: 'upcoming'
    };
    createEventMutation.mutate(newEvent);
  };

  // Redirect non-admin users
  useEffect(() => {
    if (!userLoading && user?.role !== ROLES?.college_admin) {
      redirect(ROLE_DASHBOARD_ROUTES[user?.role as Role] || '/login');
    }
  }, [user, userLoading]);

  // Set initial load state with proper data dependencies
  useEffect(() => {
    if (!userLoading && !statsLoading) {
      // Show content immediately once the main data is loaded
      // Even if events are still loading
      const timer = setTimeout(() => setIsInitialLoad(false), 50);
      return () => clearTimeout(timer);
    }
  }, [userLoading, statsLoading]);

  // Add debug information in development - MOVED ABOVE the conditional loading check
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dashboard render stats:', {
        userLoading,
        statsLoading,
        eventsLoading,
        hasUser: !!user,
        hasStats: !!stats,
        hasEvents: !!(eventsData?.data?.length > 0),
        collegeId
      });
    }
  }, [userLoading, statsLoading, eventsLoading, user, stats, eventsData, collegeId]);

  // Show a lightweight loading skeleton only during initial load
  if (isInitialLoad) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl"></div>
        <div className="flex flex-wrap gap-4">
          <div className="h-32 w-64 bg-gray-200 animate-pulse rounded-xl"></div>
          <div className="h-32 w-64 bg-gray-200 animate-pulse rounded-xl"></div>
        </div>
      </div>
    );
  }

  const loading = userLoading || statsLoading || eventsLoading;
  if (loading) {
    return <LoadingSkeleton />;
  }

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
              title={`Welcome, ${user?.name || 'Admin'}`}
              description={`Manage ${stats?.collegeInfo?.name || 'your college'} and view analytics`}
              buttonText="View Stats" 
              onButtonClick={() => {}} 
              className="shadow-lg rounded-xl bg-gradient-to-r from-purple-800 to-amber-500"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className='w-full sm:w-1/2'>
                <div className="grid grid-cols-2 gap-6">
                  <StatsCard
                    icon="👨‍🎓"
                    value={stats?.stats?.students?.total || 0}
                    title="Total Students"
                    trend={stats?.stats?.students?.trend || { value: 0, isPositive: true }}
                    className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                  <StatsCard
                    icon="👨‍🏫"
                    value={stats?.stats?.teachers?.total || 0}
                    title="Total Teachers"
                    trend={stats?.stats?.teachers?.trend || { value: 0, isPositive: true }}
                    className="bg-[#FB8892] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                  <StatsCard
                    icon="📅"
                    value={stats?.stats?.events?.total || 0}
                    title="Events"
                    trend={stats?.stats?.events?.trend || { value: 0, isPositive: true }}
                    className="bg-[#A1A2D8] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                  <StatsCard
                    icon="📄"
                    value={stats?.stats?.invoices?.total || 0}
                    title="Invoices"
                    trend={stats?.stats?.invoices?.trend || { value: 0, isPositive: true }}
                    className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
                  />
                </div>
              </div>
              
              <div className='w-full md:w-1/2'>
                <FinanceChart
                  data={financeData}
                  period={financePeriod}
                  totalInvoices={totalInvoices}
                  totalExpenses={totalExpenses}
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
            <Card className="p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow flex justify-between items-center">
              <Select 
                value={dateRange} 
                onValueChange={setDateRange}
              >
                <SelectTrigger className="shadow-sm hover:shadow transition-shadow w-[240px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="shadow-lg">
                  <SelectItem value="period-1">{format(new Date(), 'MMM dd')} - {format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'MMM dd, yyyy')}</SelectItem>
                  <SelectItem value="period-2">Last 30 days</SelectItem>
                  <SelectItem value="period-3">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                size="sm" 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CalendarPlus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </Card>

            <AddEventModal 
              open={isAddModalOpen}
              onOpenChange={setIsAddModalOpen}
              onEventAdded={(newEvent) => {
                // After successful event creation, invalidate the events query to refresh the data
                queryClient.invalidateQueries({ queryKey: ['events'] });
                // Call the original handler if needed
                handleEventAdd(newEvent);
              }}
            />
            <EventCalendar 
              events={formattedEvents.map(event => ({
                ...event,
                date: event.date.toISOString() // Convert Date to string
              }))}
              disableDateClick={true} 
              onDateSelect={(date) => {
                // This won't be called if disableDateClick is true
                console.log("Selected date:", date);
              }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            />

            <UpcomingEvents 
              events={formattedEvents}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              onViewMore={() => {}}
              onAddEvent={() => setIsAddModalOpen(true)}
              onEventClick={(event) => {
                // Handle event click - could open a details modal
                console.log('Event clicked:', event);
              }}
              onEditEvent={(event) => {
                // Handle edit event - could open the edit modal with pre-filled data
                console.log('Edit event:', event);
                // TODO: Implement edit functionality
              }}
              onDeleteEvent={() => {
                // After successful deletion, invalidate the events query to refresh the data
                queryClient.invalidateQueries({ queryKey: ['events'] });
              }}
              onEventUpdated={handleEventUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
}