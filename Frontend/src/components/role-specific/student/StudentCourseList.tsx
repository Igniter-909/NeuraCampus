"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentCourseListProps {
  studentId: string;
}

export default function StudentCourseList({ studentId }: StudentCourseListProps) {
    console.log(studentId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add course list here */}
          <p>No courses enrolled</p>
        </div>
      </CardContent>
    </Card>
  );
} 