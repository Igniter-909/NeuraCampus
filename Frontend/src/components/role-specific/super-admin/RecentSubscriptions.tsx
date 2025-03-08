"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentSubscriptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add recent subscriptions list here */}
          <p>No recent subscriptions</p>
        </div>
      </CardContent>
    </Card>
  );
} 