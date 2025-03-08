// components/role-specific/student/CourseEnrollment.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CalendarDays,  Search, BookOpen } from "lucide-react";

const availableCourses = [
  {
    id: 1,
    code: "CS401",
    name: "Advanced Database Systems",
    credits: 4,
    instructor: "Dr. Sharma",
    schedule: "Mon, Wed 10:00 - 11:30 AM",
    capacity: 45,
    enrolled: 32,
    type: "Elective",
    prerequisite: "CS301"
  },
  {
    id: 2,
    code: "CS402",
    name: "Machine Learning",
    credits: 4,
    instructor: "Dr. Gupta",
    schedule: "Tue, Thu 1:00 - 2:30 PM",
    capacity: 40,
    enrolled: 38,
    type: "Elective",
    prerequisite: "CS302"
  },
  {
    id: 3,
    code: "CS403",
    name: "Computer Vision",
    credits: 3,
    instructor: "Dr. Patel",
    schedule: "Mon, Fri 3:00 - 4:30 PM",
    capacity: 35,
    enrolled: 20,
    type: "Elective",
    prerequisite: "CS303"
  },
  {
    id: 4,
    code: "CS404",
    name: "Cloud Computing",
    credits: 3,
    instructor: "Prof. Singh",
    schedule: "Wed, Fri 11:00 - 12:30 PM",
    capacity: 50,
    enrolled: 28,
    type: "Elective",
    prerequisite: "CS304"
  }
];

const enrolledCourses = [
  {
    id: 101,
    code: "CS301",
    name: "Database Management Systems",
    credits: 4,
    instructor: "Prof. Kumar",
    schedule: "Mon, Wed 8:30 - 10:00 AM",
    status: "In Progress",
    grade: null
  },
  {
    id: 102,
    code: "CS302",
    name: "Data Mining",
    credits: 3,
    instructor: "Dr. Verma",
    schedule: "Tue, Thu 10:00 - 11:30 AM",
    status: "In Progress",
    grade: null
  },
  {
    id: 103,
    code: "CS303",
    name: "Web Technologies",
    credits: 3,
    instructor: "Prof. Reddy",
    schedule: "Wed, Fri 1:00 - 2:30 PM",
    status: "In Progress",
    grade: null
  },
  {
    id: 104,
    code: "CS304",
    name: "Computer Networks",
    credits: 4,
    instructor: "Dr. Shah",
    schedule: "Mon, Fri 4:00 - 5:30 PM",
    status: "In Progress",
    grade: null
  }
];

export function CourseEnrollment({ studentId }: { studentId: string }) {
  console.log(studentId);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCourses = availableCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Course Enrollment</CardTitle>
        <CardDescription>
          Manage your current courses and enroll in new ones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enrolled">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="available">Available Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrolled" className="space-y-4 pt-4">
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div 
                  key={course.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{course.name}</h4>
                      <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {course.code}
                      </Badge>
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                        {course.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {course.instructor}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                        {course.schedule}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5 mr-1" />
                        {course.credits} Credits
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="available" className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{course.name}</h4>
                      <Badge className="ml-2">{course.code}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {course.instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}