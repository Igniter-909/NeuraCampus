'use client';

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'status', header: 'Status' },
];

export default function UsersPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search users..."
          className="max-w-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={[]}
      />
    </div>
  );
}
