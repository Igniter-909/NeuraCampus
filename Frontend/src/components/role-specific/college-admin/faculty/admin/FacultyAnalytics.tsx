'use client';

import { 
  Download, UserCheck, Calendar, BookOpen, Star, Users2, 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Department {
  name: string;
  performance: number;
  count: number;
}

interface Role {
  name: string;
  count: number;
}

interface Activity {
  type: 'attendance' | 'leave' | 'course';
  title: string;
  description: string;
  time: string;
}

// Mock data
const departments: Department[] = [
  { name: "Computer Science", performance: 92, count: 45 },
  { name: "Electrical Engineering", performance: 88, count: 38 },
  { name: "Mechanical Engineering", performance: 85, count: 42 },
  { name: "Civil Engineering", performance: 90, count: 31 },
];

const roles: Role[] = [
  { name: "Professor", count: 42 },
  { name: "Associate Professor", count: 56 },
  { name: "Assistant Professor", count: 38 },
  { name: "Lecturer", count: 20 },
];

const activities: Activity[] = [
  {
    type: "attendance",
    title: "High Attendance Rate",
    description: "CS Department achieved 95% attendance this week",
    time: "2 hours ago"
  },
  {
    type: "leave",
    title: "Leave Requests Processed",
    description: "12 leave requests approved for next week",
    time: "4 hours ago"
  },
  {
    type: "course",
    title: "Course Coverage Update",
    description: "85% of courses completed their syllabus",
    time: "1 day ago"
  },
];

// Mock data - replace with actual data fetching in production
const topFaculty = [
  { 
    id: 1, 
    name: "Dr. Sarah Johnson", 
    department: "Computer Science",
    rating: 4.8,
    attendance: 98,
    publications: 12,
    studentPerformance: 87
  },
  { 
    id: 2, 
    name: "Prof. Michael Chen", 
    department: "Electrical Engineering",
    rating: 4.7,
    attendance: 96,
    publications: 15,
    studentPerformance: 85
  },
  { 
    id: 3, 
    name: "Dr. Rebecca Williams", 
    department: "Mathematics",
    rating: 4.6,
    attendance: 97,
    publications: 8,
    studentPerformance: 88
  }
];

export function FacultyAnalytics() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-900/5 dark:bg-gray-800/90">
        <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-50">Faculty Analytics</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-300">
                Performance metrics and insights
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" 
                className="border-blue-200 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-blue-900/20 dark:border-blue-900/50">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Select>
                <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-900/50 dark:bg-gray-800/90 dark:text-blue-50">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800/95 dark:border-blue-900/50">
                  <SelectItem value="week" className="dark:text-blue-50 dark:hover:bg-blue-950/30">This Week</SelectItem>
                  <SelectItem value="month" className="dark:text-blue-50 dark:hover:bg-blue-950/30">This Month</SelectItem>
                  <SelectItem value="semester" className="dark:text-blue-50 dark:hover:bg-blue-950/30">This Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-100 dark:border-blue-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-300">
                  Total Faculty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">156</div>
                  <Users2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  +12 from last semester
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 dark:border-blue-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-300">
                  Average Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">94.2%</div>
                  <UserCheck className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 dark:border-blue-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-300">
                  Course Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">87.5%</div>
                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  -2.4% from target
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 dark:border-blue-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-300">
                  Student Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">4.2/5</div>
                  <Star className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  Based on 2,456 reviews
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="border-blue-100 dark:border-blue-900/50">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-50">Department Performance</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-300">
                  Average metrics by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept.name} className="flex items-center">
                      <div className="w-1/3">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-50">{dept.name}</p>
                      </div>
                      <div className="w-2/3 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-blue-100 dark:bg-blue-950/50">
                          <div
                            className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                            style={{ width: `${dept.performance}%` }}
                          />
                        </div>
                        <span className="text-sm text-blue-600 dark:text-blue-300">{dept.performance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900/50">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-50">Faculty Distribution</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-300">
                  Faculty count by role and department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-3">By Role</h4>
                    <div className="space-y-2">
                      {roles.map((role) => (
                        <div key={role.name} className="flex justify-between items-center">
                          <span className="text-sm text-blue-900 dark:text-blue-50">{role.name}</span>
                          <Badge 
                            variant="outline" 
                            className="bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50"
                          >
                            {role.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-3">By Department</h4>
                    <div className="space-y-2">
                      {departments.map((dept) => (
                        <div key={dept.name} className="flex justify-between items-center">
                          <span className="text-sm text-blue-900 dark:text-blue-50">{dept.name}</span>
                          <Badge 
                            variant="outline" 
                            className="bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50"
                          >
                            {dept.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-blue-100 dark:border-blue-900/50">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-50">Recent Activities</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-300">
                  Latest faculty activities and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                      <div className={`p-2 rounded-full 
                        ${activity.type === 'attendance' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300' :
                          activity.type === 'leave' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300'
                        }`}
                      >
                        {activity.type === 'attendance' ? <UserCheck className="h-4 w-4" /> :
                         activity.type === 'leave' ? <Calendar className="h-4 w-4" /> :
                         <BookOpen className="h-4 w-4" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-50">{activity.title}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-300">{activity.description}</p>
                      </div>
                      <time className="text-xs text-blue-600 dark:text-blue-300">{activity.time}</time>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 