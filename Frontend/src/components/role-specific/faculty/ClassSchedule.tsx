// components/role-specific/faculty/ClassSchedule.tsx
'use client'
import {  Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const classes = [
  {
    id: 1,
    subject: "Data Structures",
    time: "09:00 AM - 10:30 AM",
    room: "B-201",
    batch: "CSE 2023",
    students: 42,
    status: "upcoming"
  },
  {
    id: 2,
    subject: "Database Management",
    time: "11:00 AM - 12:30 PM",
    room: "A-105",
    batch: "CSE 2023",
    students: 38,
    status: "upcoming"
  },
  {
    id: 3,
    subject: "Computer Networks",
    time: "02:00 PM - 03:30 PM",
    room: "C-302",
    batch: "CSE 2022",
    students: 45,
    status: "upcoming"
  },
  {
    id: 4,
    subject: "Algorithms Lab",
    time: "04:00 PM - 05:30 PM",
    room: "Lab-3",
    batch: "CSE 2023",
    students: 35,
    status: "upcoming"
  }
];

export function ClassSchedule() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Today s Classes</CardTitle>
        <CardDescription>
          Your scheduled classes for today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((classItem) => (
            <div 
              key={classItem.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div>
                <div className="font-medium">{classItem.subject}</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="mr-1 h-4 w-4" />
                  {classItem.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Users className="mr-1 h-4 w-4" />
                  {classItem.batch} • {classItem.students} students
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge 
                  variant="outline" 
                  className="mb-2 bg-blue-50 text-blue-700 hover:bg-blue-50"
                >
                  Room {classItem.room}
                </Badge>
                <a 
                  href="#" 
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}