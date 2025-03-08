"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlacementNoticesProps {
  departmentId: string;
  batchYear: string;
}

export default function PlacementNotices({ departmentId, batchYear }: PlacementNoticesProps) {
    console.log(departmentId,batchYear);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Placement Notices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add placement notices here */}
          <p>No placement notices available</p>
        </div>
      </CardContent>
    </Card>
  );
} 