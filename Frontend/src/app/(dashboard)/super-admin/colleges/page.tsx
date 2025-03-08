"use client";

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Role, ROLES } from '@/constants/roles';
import { ROLE_DASHBOARD_ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CollegesTable from '@/components/role-specific/super-admin/CollegesTable';
import AddCollegeDialog from '@/components/role-specific/super-admin/AddCollegeDialog';
import { superadminApi } from '@/services/superadmin';
import { useToast } from '@/components/ui/use-toast';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { useUser } from '@/hooks/auth/useUser';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function CollegesPage() {
  const { user } = useUser();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  
  // Use React Query for efficient data fetching and caching
  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      try {
        const response = await superadminApi.getColleges();
        // Check if response.data.college exists, if not return empty array
        if (!response.data.college) {
          console.warn('No college data received from API');
          return [];
        }
        return response.data.college; // Changed from colleges to college to match API response
      } catch (error) {
        console.error('Error fetching colleges:', error);
        toast({
          title: 'Error',
          content: 'Failed to fetch colleges',
          variant: 'destructive',
        });
        return [];
      }
    },
    enabled: user?.role === ROLES.superadmin,
    refetchOnMount: true,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // Handle successful addition of new college
  const handleAddSuccess = () => {
    // Invalidate and refetch colleges query
    queryClient.invalidateQueries({ queryKey: ['colleges'] });
    setIsAddDialogOpen(false);
  };

  if (isLoading) {
    return <LoadingSkeleton height="lg" />;
  }

  return (
    <div className="p-6 space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Colleges</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add College
        </Button>
      </div>

      <CollegesTable colleges={colleges} />

      <AddCollegeDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
