import { Card, CardContent } from "@/components/ui/card"

interface Student {
  name: string;
  rollNumber: string;
  department: string;
  program: string;
  year: string;
  semester: string;
  cgpa: number;
  profilePicture: string;
}

interface StudentOverviewProps {
  student: Student;
}

export default function StudentOverview({ student }: StudentOverviewProps) {
  return (
    <Card className="mb-8 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <img
              src={student.profilePicture || "/placeholder.svg"}
              alt={student.name}
              className="w-24 h-24 rounded-full border-4 border-blue-200 dark:border-blue-800"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{student.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Roll Number: {student.rollNumber}</p>
            <div className="flex flex-col sm:flex-row sm:gap-6 mt-2">
              <p className="text-gray-600 dark:text-gray-400">{student.department}</p>
              <p className="text-gray-600 dark:text-gray-400">{student.program}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {student.year} • {student.semester}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center min-w-[120px]">
            <p className="text-gray-600 dark:text-gray-400 text-sm">CGPA</p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{student.cgpa}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 