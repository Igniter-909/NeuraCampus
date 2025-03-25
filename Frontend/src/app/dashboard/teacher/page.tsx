
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { redirect } from 'next/navigation';
import { useUser } from "@/hooks/auth/useUser";
import WelcomeBanner from '@/components/ui/WelcomeBanner';
import StatsCard from '@/components/ui/StatsCard';
import DaySchedule from '@/components/role-specific/faculty/DaySchedule';
import { EventCalendar } from '@/components/ui/EventCalender';


export default function FacultyDashboardPage() {
  const { user, loading, error } = useUser();
  console.log(user,"user");
  console.log(loading,"loading");
  console.log(error,"error");

  if (loading) return <LoadingSkeleton height="lg" />;
  if ( !user) {
    redirect('/login');
  }

  if (user?.role !== 'teacher') {
    redirect('/login');
  }
  if(loading){
    return <LoadingSkeleton height="lg" />;
  }



  return (
    <div className="w-full p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <WelcomeBanner 
            title="Welcome back, Professor!" 
            description="Here's an overview of your classes and tasks" 
            buttonText="View Schedule" 
            onButtonClick={() => {}} 
            className="shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsCard
              icon="📚"
              value={12}
              title="Total Classes"
              trend={{ value: 1, isPositive: true }}
              className="bg-[#FB8892] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4"
            />
            <StatsCard
              icon="👨‍🎓"
              value={248}
              title="Total Students"
              trend={{ value: 2.5, isPositive: true }}
              className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4"
            />
            <StatsCard
              icon="🕒"
              value={5}
              title="Lectures Left"
              trend={{ value: 1, isPositive: false }}
              className="bg-[#A1A2D8] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4"
            />
            <StatsCard
              icon="📊"
              value="86%"
              title="Average Attendance"
              trend={{ value: 2.5, isPositive: true }}
              className="bg-[#5552AB] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4"
            />
          </div>

          <DaySchedule />
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Event Calendar</h2>
            <EventCalendar 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>

      </div>
    </div>
  );
}