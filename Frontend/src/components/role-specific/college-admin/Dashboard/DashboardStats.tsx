import StatsCard from '@/components/ui/StatsCard';
import { UsersIcon, BookOpenIcon, AcademicCapIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { DashboardStatsInterface } from '@/types/role-specific/college-admin';

export default function DashboardStats({ stats }: { stats: DashboardStatsInterface }) {
  console.log(stats,"stats");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Students"
        value={stats?.stats?.totalStudents || 0}
        icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
        iconClassName="bg-blue-50"
        className=" "
        trend={{
          value: 2.5,
          isPositive: true
        }}
      />

      <StatsCard
        title="Total Teachers"
        value={stats?.stats?.totalTeachers || 0}
        icon={<AcademicCapIcon className="w-6 h-6 text-purple-600" />}
        iconClassName="bg-purple-50"
        trend={{
          value: 1.2,
          isPositive: false
        }}
      />

      <StatsCard
        title="Departments"
        value={stats?.stats?.totalBranches || 0}
        icon={<BookOpenIcon className="w-6 h-6 text-green-600" />}
        iconClassName="bg-green-50"
      />

      <StatsCard
        title="Recent Users"
        value={stats?.recentUsers?.length || 0}
        icon={<DocumentIcon className="w-6 h-6 text-orange-600" />}
        iconClassName="bg-orange-50"
        onClick={() => console.log('Card clicked')}
      />
    </div>
  );
} 