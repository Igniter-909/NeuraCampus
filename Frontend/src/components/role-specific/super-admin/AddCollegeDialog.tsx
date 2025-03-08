"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { superadminApi } from '@/services/superadmin';

interface AddCollegeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const initialFormState = {
  name: '',
  code: '',
  emailDomain: '',
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  },
  contact: {
    email: '',
    phone: '',
    website: ''
  },
  logo: '',
  establishedYear: '',
  adminName: '',
  adminEmail: '',
  adminPassword: ''
};

const handleApiError = (error: any, toast: any) => {
  console.error('API Error:', error);
  
  // Handle specific error cases
  if (error.response?.data?.message) {
    toast({
      title: 'Error',
      content: error.response.data.message,
      variant: 'destructive',
    });
    return;
  }

  if (error.message === 'Network Error') {
    toast({
      title: 'Connection Error',
      content: 'Please check your internet connection',
      variant: 'destructive',
    });
    return;
  }

  // Default error message
  toast({
    title: 'Error',
    content: 'Something went wrong. Please try again.',
    variant: 'destructive',
  });
};

export default function AddCollegeDialog({ open, onOpenChange, onSuccess }: AddCollegeDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await superadminApi.createCollege(formData);
      toast({
        title: 'Success',
        content: 'College created successfully',
      });
      onSuccess();
      onOpenChange(false);
      setFormData(initialFormState);
    } catch (error) {
      handleApiError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New College</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>College Name</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label>College Code</label>
              <Input
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label>Email Domain</label>
            <Input
              required
              value={formData.emailDomain}
              onChange={(e) => setFormData({ ...formData, emailDomain: e.target.value })}
              placeholder="example.edu"
            />
          </div>

          <fieldset className="border p-4 rounded">
            <legend className="text-sm font-semibold">Address</legend>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label>Street</label>
                <Input
                  value={formData.address.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label>City</label>
                <Input
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label>State</label>
                <Input
                  value={formData.address.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label>Country</label>
                <Input
                  value={formData.address.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, country: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label>Pincode</label>
                <Input
                  value={formData.address.pincode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, pincode: e.target.value }
                  })}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border p-4 rounded">
            <legend className="text-sm font-semibold">Contact</legend>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label>Email</label>
                <Input
                  type="email"
                  required
                  value={formData.contact.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label>Phone</label>
                <Input
                  required
                  value={formData.contact.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label>Website</label>
                <Input
                  value={formData.contact.website}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, website: e.target.value }
                  })}
                />
              </div>
            </div>
          </fieldset>

          <div className="space-y-2">
            <label>Logo URL</label>
            <Input
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label>Established Year</label>
            <Input
              type="number"
              required
              value={formData.establishedYear}
              onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
            />
          </div>

          <fieldset className="border p-4 rounded">
            <legend className="text-sm font-semibold">Admin Details</legend>
            <div className="space-y-4">
              <div className="space-y-2">
                <label>Admin Name</label>
                <Input
                  required
                  value={formData.adminName}
                  onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Admin Email</label>
                <Input
                  type="email"
                  required
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Admin Password</label>
                <Input
                  type="password"
                  required
                  value={formData.adminPassword}
                  onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                />
              </div>
            </div>
          </fieldset>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create College'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 