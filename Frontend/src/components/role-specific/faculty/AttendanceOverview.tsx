"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AttendanceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add attendance overview data here */}
          <p>No attendance data available</p>
        </div>
      </CardContent>
    </Card>
  );
} 