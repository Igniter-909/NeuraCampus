"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PendingAssignments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add pending assignments list here */}
          <p>No pending assignments</p>
        </div>
      </CardContent>
    </Card>
  );
} 