import { ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundPattern } from "@/components/ui/background-pattern"

// Sample data for a teacher
const teacherData = {
  id: 1,
  name: "Dr. Jane Smith",
  image: "/placeholder.svg?height=128&width=128",
  department: "Computer Science",
  position: "Associate Professor",
  email: "jane.smith@university.edu",
  phone: "+1 (555) 123-4567",
  specialization: "Data Structures and Algorithms",
  courses: [
    { name: "Data Structures", code: "CS202", students: 45 },
    { name: "Algorithm Design", code: "CS303", students: 38 },
    { name: "Advanced Programming", code: "CS401", students: 30 },
  ],
  publications: [
    { title: "Efficient Graph Algorithms for Big Data", year: 2023 },
    { title: "Machine Learning Approaches in Data Structures", year: 2022 },
    { title: "Optimizing Search Algorithms for Modern Computing", year: 2021 },
  ],
}

export default function TeacherProfile({ params }: { params: { departmentId: string; teacherId: string } }) {
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
          <h1 className="text-2xl font-bold">{teacherData.name}</h1>
          <p className="text-gray-500">
            {teacherData.position} - {teacherData.department} Department
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={teacherData.image} alt={teacherData.name} />
                <AvatarFallback>
                  {teacherData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-2">{teacherData.name}</h2>
              <p className="text-gray-500 mb-4">{teacherData.specialization}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>{teacherData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span>{teacherData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Department:</span>
                <span>{teacherData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Position:</span>
                <span>{teacherData.position}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {teacherData.courses.map((course, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {course.name} ({course.code})
                  </span>
                  <span className="text-gray-500">{course.students} students</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {teacherData.publications.map((pub, index) => (
                <li key={index} className="flex justify-between">
                  <span>{pub.title}</span>
                  <span className="text-gray-500">{pub.year}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

