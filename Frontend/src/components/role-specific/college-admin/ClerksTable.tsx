'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { collegeAdminApi } from '@/services/collegeAdmin';
import { useToast } from '@/components/ui/use-toast';

export default function ClerksTable() {
  const [clerks, setClerks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchClerks = async () => {
    try {
      const response = await collegeAdminApi.getClerks();
      setClerks(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch clerks',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClerks();
  }, []);

  const filteredClerks = clerks.filter(clerk => 
    clerk.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clerk.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clerks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClerks.map((clerk) => (
            <TableRow key={clerk._id}>
              <TableCell>{clerk.name}</TableCell>
              <TableCell>{clerk.email}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 