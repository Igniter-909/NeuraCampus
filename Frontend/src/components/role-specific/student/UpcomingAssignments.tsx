"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UpcomingAssignmentsProps {
  studentId: string;
}

export default function UpcomingAssignments({ studentId }: UpcomingAssignmentsProps) {
    console.log(studentId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add upcoming assignments list here */}
          <p>No upcoming assignments</p>
        </div>
      </CardContent>
    </Card>
  );
} 