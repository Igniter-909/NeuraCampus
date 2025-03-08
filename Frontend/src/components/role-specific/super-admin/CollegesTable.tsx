import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

interface College {
  _id: string;
  name: string;
  code: string;
  emailDomain: string;
  status: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  address: {
    city: string;
    state: string;
  };
  establishedYear: string;
}

export default function CollegesTable({ colleges }: { colleges: College[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.emailDomain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, code, or email domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Basic Info</TableHead>
              <TableHead>Contact Details</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Verification Settings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredColleges.map((college) => (
              <TableRow key={college._id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{college.name}</div>
                    <div className="text-sm text-muted-foreground">Code: {college.code}</div>
                    <div className="text-sm text-muted-foreground">Domain: {college.emailDomain}</div>
                    <div className="text-sm text-muted-foreground">Est: {college.establishedYear}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">Email:</span> {college.contact.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {college.contact.phone}
                    </div>
                    {college.contact.website && (
                      <div>
                        <span className="font-medium">Web:</span>{' '}
                        <a 
                          href={college.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit
                        </a>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    {college.address.street && (
                      <div>{college.address.street}</div>
                    )}
                    <div>
                      {college.address.city}, {college.address.state}
                    </div>
                    {college.address.country && (
                      <div>{college.address.country}</div>
                    )}
                    {college.address.pincode && (
                      <div>PIN: {college.address.pincode}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">Auto Verify:</span>{' '}
                      {college.verificationSettings?.autoVerifyCollegeEmail ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <span className="font-medium">Alumni Registration:</span>{' '}
                      {college.verificationSettings?.allowAlumniRegistration ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <span className="font-medium">Verification:</span>{' '}
                      {college.verificationSettings?.alumniVerificationProcess || 'Manual'}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    college.status === 'active' ? 'bg-green-100 text-green-800' :
                    college.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {college.status.charAt(0).toUpperCase() + college.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.location.href = `/super-admin/colleges/${college._id}`}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.location.href = `/super-admin/colleges/${college._id}/edit`}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 