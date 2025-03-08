'use client'
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentApi } from '@/services/departments';
import { Department } from '@/types/department';
import { useToast } from '@/components/ui/use-toast';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import DepartmentManagement from "@/components/role-specific/college-admin/Department/department-management"
import { BackgroundPattern } from '@/components/ui/background-pattern';

const Departments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    totalSemesters: 8,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Queries
  const { data: departments, isLoading } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: async () => {
      const response = await departmentApi.getDepartments();
      return response.data;
    },
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: departmentApi.createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast({
        title: 'Success',
        content: 'Department created successfully',
      });
      handleCloseModal();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        content: 'Failed to create department',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => departmentApi.updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast({
        title: 'Success',
        content: 'Department updated successfully',
      });
      handleCloseModal();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        content: 'Failed to update department',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: departmentApi.deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast({
        title: 'Success',
        description: 'Department deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete department',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', code: '', totalSemesters: 8 });
    setEditingId(null);
  };

  if (isLoading) return <LoadingSkeleton height="lg" />;

  return (
    <div>
    <BackgroundPattern />
    <DepartmentManagement />
    </div>
    
  );
};

export default Departments;
