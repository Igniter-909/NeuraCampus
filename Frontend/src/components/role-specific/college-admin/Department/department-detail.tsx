import { ArrowLeft, Book, Calendar, Mail, Phone, PieChart, Users } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample data for department details
const batches = [
  { id: 1, name: "Batch 2023-A", students: 45, semester: 2 },
  { id: 2, name: "Batch 2023-B", students: 42, semester: 2 },
  { id: 3, name: "Batch 2022-A", students: 40, semester: 4 },
  { id: 4, name: "Batch 2022-B", students: 38, semester: 4 },
]

const teachers = [
  { id: 1, name: "Dr. Jane Smith", subject: "Data Structures", image: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Prof. John Davis", subject: "Algorithms", image: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Dr. Emily Johnson", subject: "Database Systems", image: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Prof. Michael Brown", subject: "Computer Networks", image: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Dr. Sarah Wilson", subject: "Operating Systems", image: "/placeholder.svg?height=40&width=40" },
]

const courses = [
  { id: 1, code: "CS101", name: "Introduction to Programming", credits: 4, semester: 1 },
  { id: 2, code: "CS102", name: "Data Structures", credits: 4, semester: 2 },
  { id: 3, code: "CS201", name: "Algorithms", credits: 3, semester: 3 },
  { id: 4, code: "CS202", name: "Database Systems", credits: 4, semester: 3 },
  { id: 5, code: "CS301", name: "Computer Networks", credits: 3, semester: 4 },
  { id: 6, code: "CS302", name: "Operating Systems", credits: 4, semester: 4 },
]

const performanceData = [
  { semester: "Sem 1", passRate: 95 },
  { semester: "Sem 2", passRate: 92 },
  { semester: "Sem 3", passRate: 88 },
  { semester: "Sem 4", passRate: 90 },
  { semester: "Sem 5", passRate: 85 },
  { semester: "Sem 6", passRate: 87 },
]

interface DepartmentDetailProps {
  department: {
    id: number
    name: string
    hod: string
    hodImage: string
    curriculum: string
    batches: number
    teachers: number
    students: number
    passRate: number
    color: string
  }
  onBack: () => void
}

export default function DepartmentDetail({ department, onBack }: DepartmentDetailProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{department.name}</h1>
          <p className="text-gray-500">Department details and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* HOD Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Head of Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={department.hodImage} alt={department.hod} />
                <AvatarFallback>
                  {department.hod
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{department.hod}</h3>
              <p className="text-gray-500 mb-4">{department.name}</p>
              <div className="flex gap-4 w-full justify-center">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">{department.batches}</p>
                <p className="text-xs text-gray-500">Batches</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-teal-600" />
                <p className="text-2xl font-bold">{department.teachers}</p>
                <p className="text-xs text-gray-500">Teachers</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <Book className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-xs text-gray-500">Courses</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 text-center">
                <PieChart className="h-6 w-6 mx-auto mb-2 text-pink-600" />
                <p className="text-2xl font-bold">{department.passRate}%</p>
                <p className="text-xs text-gray-500">Pass Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Curriculum Overview</CardTitle>
            <CardDescription>{department.curriculum}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Semesters</h4>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <Badge key={sem} variant="outline" className="bg-slate-50">
                      Semester {sem}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Total Credits</h4>
                <p className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.credits, 0)}</p>
              </div>
              <Button variant="outline" className="w-full">
                View Full Curriculum
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="batches">
        <TabsList className="mb-4">
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="batches">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <Card key={batch.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{batch.name}</CardTitle>
                    <Badge>Semester {batch.semester}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="text-2xl font-bold">{batch.students}</p>
                    </div>
                    <Link href={`/departments/${department.id}/batches/${batch.id}`} passHref>
                      <Button variant="outline" size="sm" as="a">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teachers">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={teacher.image} alt={teacher.name} />
                        <AvatarFallback>
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-gray-500">{teacher.subject}</p>
                      </div>
                    </div>
                    <Link href={`/departments/${department.id}/teachers/${teacher.id}`} passHref>
                      <Button variant="ghost" size="sm" as="a">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Code</th>
                    <th className="text-left p-4">Course Name</th>
                    <th className="text-left p-4">Credits</th>
                    <th className="text-left p-4">Semester</th>
                    <th className="text-right p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b last:border-0">
                      <td className="p-4 font-medium">{course.code}</td>
                      <td className="p-4">{course.name}</td>
                      <td className="p-4">{course.credits}</td>
                      <td className="p-4">Semester {course.semester}</td>
                      <td className="p-4 text-right">
                        <Link href={`/departments/${department.id}/courses/${course.id}`} passHref>
                          <Button variant="ghost" size="sm" as="a">
                            Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Performance</CardTitle>
              <CardDescription>Pass rate by semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end gap-4 pt-10">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-purple-600 rounded-t-md"
                      style={{ height: `${data.passRate * 0.7}%` }}
                    ></div>
                    <span className="text-sm font-medium">{data.passRate}%</span>
                    <span className="text-xs text-gray-500">{data.semester}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/departments/${department.id}/performance`} passHref>
                <Button variant="outline" as="a" className="w-full">
                  View Detailed Performance
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

