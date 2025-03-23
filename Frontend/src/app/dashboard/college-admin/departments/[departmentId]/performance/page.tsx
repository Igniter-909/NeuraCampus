import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BackgroundPattern } from "@/components/ui/background-pattern"

// Sample data for department performance
const performanceData = {
  department: "Computer Science",
  overallPassRate: 88,
  semesterData: [
    { semester: "Spring 2024", passRate: 90, averageGrade: 85 },
    { semester: "Fall 2023", passRate: 87, averageGrade: 82 },
    { semester: "Spring 2023", passRate: 89, averageGrade: 84 },
    { semester: "Fall 2022", passRate: 86, averageGrade: 81 },
  ],
  coursePerformance: [
    { name: "Data Structures", code: "CS202", passRate: 92, averageGrade: 87 },
    { name: "Algorithm Design", code: "CS303", passRate: 88, averageGrade: 83 },
    { name: "Database Systems", code: "CS401", passRate: 85, averageGrade: 80 },
    { name: "Computer Networks", code: "CS402", passRate: 87, averageGrade: 82 },
  ],
}

export default function DepartmentPerformance({ params }: { params: { departmentId: string } }) {
  return (
    <div className="relative min-h-screen p-6">
      <BackgroundPattern />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/departments/${params.departmentId}`} passHref>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{performanceData.department} Department Performance</h1>
            <p className="text-gray-500">Detailed performance metrics and analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold">{performanceData.overallPassRate}%</p>
                <p className="text-gray-500">Overall Pass Rate</p>
              </div>
              <Progress value={performanceData.overallPassRate} className="h-2 mb-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Semester Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.semesterData.map((semester, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{semester.semester}</span>
                      <span>
                        Pass Rate: {semester.passRate}% | Avg. Grade: {semester.averageGrade}%
                      </span>
                    </div>
                    <Progress value={semester.passRate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {performanceData.coursePerformance.map((course, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {course.name} ({course.code})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pass Rate:</span>
                          <span className="font-medium">{course.passRate}%</span>
                        </div>
                        <Progress value={course.passRate} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm">
                          <span>Average Grade:</span>
                          <span className="font-medium">{course.averageGrade}%</span>
                        </div>
                        <Progress value={course.averageGrade} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

