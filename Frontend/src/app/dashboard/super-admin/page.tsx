// src/app/(dashboard)/super-admin/page.tsx
'use client';

import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Role, ROLES } from '@/constants/roles';
import { ROLE_DASHBOARD_ROUTES } from '@/constants/routes';
import { useUser } from '@/hooks/auth/useUser';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import CollegeMetrics from '@/components/role-specific/super-admin/CollegeMetrics';
import UserGrowthChart from '@/components/role-specific/super-admin/UserGrowthChart';
import RecentSubscriptions from '@/components/role-specific/super-admin/RecentSubscriptions';
import SystemAlerts from '@/components/role-specific/super-admin/SystemAlerts';

export default function SuperAdminDashboard() {
  const { user, loading } = useUser();
  // console.log(user,"user");
  // console.log(loading,"loading");
  // console.log(error,"error");

  if(!loading){
  // console.log(user,"user");

    if ( !user) {
      redirect('/login');
    }
  
   
    if (user?.role !== ROLES?.superadmin) {
      redirect(ROLE_DASHBOARD_ROUTES[user?.role as Role] || '/login');
    }

  }
  if (loading) return <LoadingSkeleton height="lg" />;
  
  // if(loading){
  //   return <LoadingSkeleton height="lg" />;
  // }

  return (
    <div className="space-y-6 p-6 text-[#2D3748]">
      <h1 className="text-8xl text-[#2D3748] font-thin">Super Admin Dashboard</h1>
      
      <Suspense fallback={<LoadingSkeleton height="lg" />}>
        <CollegeMetrics />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingSkeleton height="lg" />}>
            <UserGrowthChart />
          </Suspense>
        </div>
        
        {/* System Alerts */}
        <div className="lg:col-span-1">
          <Suspense fallback={<LoadingSkeleton height="lg" />}>
            <SystemAlerts />
          </Suspense>
        </div>
      </div>
      
      {/* Recent Subscriptions */}
      <Suspense fallback={<LoadingSkeleton height="lg" />}>
        <RecentSubscriptions />
      </Suspense>
    </div>
  );
}