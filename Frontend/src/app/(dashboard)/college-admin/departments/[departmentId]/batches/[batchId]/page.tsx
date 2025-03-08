import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BackgroundPattern } from "@/components/ui/background-pattern"

// Sample data for a batch
const batchData = {
  id: 1,
  name: "Batch 2023-A",
  department: "Computer Science",
  semester: 2,
  students: 45,
  averageGrade: 85,
  courses: [
    { name: "Introduction to Programming", grade: 88 },
    { name: "Data Structures", grade: 82 },
    { name: "Computer Architecture", grade: 85 },
  ],
  topPerformers: [
    { name: "John Doe", grade: 95 },
    { name: "Jane Smith", grade: 93 },
    { name: "Bob Johnson", grade: 91 },
  ],
}

export default function BatchDetails({ params }: { params: { departmentId: string; batchId: string } }) {
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
          <h1 className="text-2xl font-bold">{batchData.name}</h1>
          <p className="text-gray-500">
            {batchData.department} Department - Semester {batchData.semester}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Batch Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Students:</span>
                <span className="font-medium">{batchData.students}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Average Grade:</span>
                <span className="font-medium">{batchData.averageGrade}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Courses:</span>
                <span className="font-medium">{batchData.courses.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {batchData.courses.map((course, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{course.name}</span>
                    <span className="font-medium">{course.grade}%</span>
                  </div>
                  <Progress value={course.grade} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {batchData.topPerformers.map((student, index) => (
                <div key={index} className="flex justify-between">
                  <span>{student.name}</span>
                  <span className="font-medium">{student.grade}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add more sections as needed, such as a list of all students, detailed course breakdowns, etc. */}
    </div>
  )
}

