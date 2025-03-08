"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventsCalendarProps {
  collegeId: string;
  departmentId: string;
}

export default function EventsCalendar({ collegeId, departmentId }: EventsCalendarProps) {
    console.log(collegeId,departmentId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add calendar component here */}
          <p>No upcoming events</p>
        </div>
      </CardContent>
    </Card>
  );
} 