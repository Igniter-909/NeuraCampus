// components/role-specific/hod/DepartmentOverview.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {  BookOpen, UserCheck, AlertCircle } from "lucide-react";

export function DepartmentOverview() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
        <CardDescription>
          Computer Science Department performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="faculty">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          <TabsContent value="faculty" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Total Faculty</span>
                <span className="text-2xl font-bold">24</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Present Today</span>
                <span className="text-2xl font-bold">21</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Classes Today</span>
                <span className="text-2xl font-bold">36</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Avg. Rating</span>
                <span className="text-2xl font-bold">4.2/5</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Faculty Workload</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dr. Sharma</span>
                  <span className="text-sm font-medium">18 hrs/week</span>
                </div>
                <Progress value={90} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prof. Gupta</span>
                  <span className="text-sm font-medium">16 hrs/week</span>
                </div>
                <Progress value={80} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prof. Patel</span>
                  <span className="text-sm font-medium">14 hrs/week</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Active Courses</span>
                <span className="text-2xl font-bold">18</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Labs</span>
                <span className="text-2xl font-bold">8</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Avg. Attendance</span>
                <span className="text-2xl font-bold">86%</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Avg. Performance</span>
                <span className="text-2xl font-bold">B+</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Course Performance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Data Structures</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">High</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Computer Networks</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">High</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Compiler Design</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Medium</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Operating Systems</span>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700">Low</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="students" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Total Students</span>
                <span className="text-2xl font-bold">820</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Attendance Today</span>
                <span className="text-2xl font-bold">89%</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">CGPA -- 8.0</span>
                <span className="text-2xl font-bold">42%</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Placed</span>
                <span className="text-2xl font-bold">78%</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Batch-wise Performance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">CSE 2023</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">240 students</Badge>
                    <span className="text-sm font-medium">7.8 Avg CGPA</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">CSE 2022</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">228 students</Badge>
                    <span className="text-sm font-medium">8.1 Avg CGPA</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">CSE 2021</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">215 students</Badge>
                    <span className="text-sm font-medium">7.9 Avg CGPA</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-sm">At-risk Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700">48 students</Badge>
                    <a href="#" className="text-sm text-blue-600 hover:underline">View List</a>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}