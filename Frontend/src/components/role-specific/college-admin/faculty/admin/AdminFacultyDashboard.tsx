'use client';

import { useState } from 'react';
import { 
  BarChart, Users, Layers, ShieldCheck 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacultyAnalytics } from "./FacultyAnalytics";
import { FacultyManagement } from "./FacultyManagement";
import { FacultyWorkloadManagement } from "./FacultyWorkloadManagement";

export function AdminFacultyDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Faculty Management Dashboard</h1>
        <p className="text-muted-foreground">
          Manage faculty information, analyze performance, and control workload
        </p>
      </div>

      <Tabs defaultValue="analytics" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="analytics">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="management">
            <Users className="mr-2 h-4 w-4" />
            Directory
          </TabsTrigger>
          <TabsTrigger value="workload">
            <Layers className="mr-2 h-4 w-4" />
            Workload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="mt-6">
          <FacultyAnalytics />
        </TabsContent>
        
        <TabsContent value="management" className="mt-6">
          <FacultyManagement />
        </TabsContent>
        
        <TabsContent value="workload" className="mt-6">
          <FacultyWorkloadManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Export a single default component that includes all faculty admin functionality
export default function FacultyAdminPage() {
  return <AdminFacultyDashboard />;
} 