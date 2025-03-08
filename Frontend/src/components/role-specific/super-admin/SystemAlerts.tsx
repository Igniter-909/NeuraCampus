"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SystemAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add system alerts here */}
          <p>No active system alerts</p>
        </div>
      </CardContent>
    </Card>
  );
} 