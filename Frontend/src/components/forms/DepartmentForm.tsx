// src/components/forms/DepartmentForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { departmentService, DepartmentInput } from '@/services/departments';
import { UserSelect } from '@/components/forms/UserSelect';

const departmentSchema = z.object({
  name: z.string().min(3, { message: 'Department name must be at least 3 characters' }),
  code: z.string().min(2, { message: 'Department code must be at least 2 characters' }),
  collegeId: z.string().uuid({ message: 'Invalid college ID' }),
  headId: z.string().uuid({ message: 'Invalid head ID' }).optional(),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface DepartmentFormProps {
  collegeId: string;
  initialData?: DepartmentInput & { id?: string };
  onSuccess: (department: any) => void;
  onCancel: () => void;
}

export default function DepartmentForm({ 
  collegeId, 
  initialData, 
  onSuccess, 
  onCancel 
}: DepartmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize the form with react-hook-form
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: initialData || {
      name: '',
      code: '',
      collegeId,
      headId: undefined,
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: DepartmentFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      let response;
      
      if (initialData?.id) {
        // Update existing department
        response = await departmentService.updateDepartment(initialData.id, data);
      } else {
        // Create new department
        response = await departmentService.createDepartment(data);
      }
      
      onSuccess(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {/* Department Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Department Name*
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.name ? 'border-red-300' : ''
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        
        {/* Department Code */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Department Code*
          </label>
          <input
            id="code"
            type="text"
            {...register('code')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.code ? 'border-red-300' : ''
            }`}
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
          )}
        </div>
        
        {/* Hidden College ID field */}
        <input type="hidden" {...register('collegeId')} value={collegeId} />
        
        {/* Department Head */}
        <div>
          <label htmlFor="headId" className="block text-sm font-medium text-gray-700">
            Department Head
          </label>
          <UserSelect
            name="headId"
            control={control}
            collegeId={collegeId}
            role="FACULTY"
            placeholder="Select department head"
            errorMessage={errors.headId?.message}
          />
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData?.id ? 'Update Department' : 'Create Department'}
        </button>
      </div>
    </form>
  );
}