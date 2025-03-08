"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StudentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add student performance metrics here */}
          <p>No performance data available</p>
        </div>
      </CardContent>
    </Card>
  );
} 