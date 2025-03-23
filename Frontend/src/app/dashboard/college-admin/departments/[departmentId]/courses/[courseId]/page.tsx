import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BackgroundPattern } from "@/components/ui/background-pattern"

// Sample data for a course
const courseData = {
  id: 1,
  code: "CS202",
  name: "Data Structures",
  department: "Computer Science",
  credits: 4,
  semester: 3,
  instructor: {
    name: "Dr. Jane Smith",
    image: "/placeholder.svg?height=40&width=40",
  },
  description:
    "This course covers fundamental data structures and their implementations in programming languages. Topics include arrays, linked lists, stacks, queues, trees, and graphs.",
  students: 45,
  averageGrade: 82,
  gradeDistribution: {
    A: 15,
    B: 20,
    C: 7,
    D: 2,
    F: 1,
  },
  topics: [
    "Introduction to Data Structures",
    "Arrays and Linked Lists",
    "Stacks and Queues",
    "Trees and Binary Search Trees",
    "Graphs and Graph Algorithms",
    "Hashing",
    "Sorting and Searching Algorithms",
  ],
}

export default function CourseDetails({ params }: { params: { departmentId: string; courseId: string } }) {
  return (
    <div className="p-6">
        <BackgroundPattern />
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/departments/${params.departmentId}`} passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {courseData.name} ({courseData.code})
          </h1>
          <p className="text-gray-500">
            {courseData.department} Department - Semester {courseData.semester}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Credits:</span>
                <span>{courseData.credits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Students Enrolled:</span>
                <span>{courseData.students}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Average Grade:</span>
                <span>{courseData.averageGrade}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Instructor:</span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={courseData.instructor.image} alt={courseData.instructor.name} />
                    <AvatarFallback>
                      {courseData.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{courseData.instructor.name}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{courseData.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(courseData.gradeDistribution).map(([grade, count]) => (
                <div key={grade}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{grade}</span>
                    <span>{count} students</span>
                  </div>
                  <Progress value={(count / courseData.students) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {courseData.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

