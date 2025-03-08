"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CollegeMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>College Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Add college metrics here */}
          <p>No metrics available</p>
        </div>
      </CardContent>
    </Card>
  );
} 