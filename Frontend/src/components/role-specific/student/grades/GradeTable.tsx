import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Grade {
  id: number;
  courseCode: string;
  courseName: string;
  semester: string;
  year: string;
  credits: number;
  grade: string;
  gradePoints: number;
  status: string;
}

interface GradeTableProps {
  grades: Grade[];
}

export default function GradeTable({ grades }: GradeTableProps) {
  const getGradeColor = (grade: string) => {
    if (grade === "A+" || grade === "A") return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
    if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
    if (grade === "C+" || grade === "C") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
    if (grade === "D") return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
    if (grade === "F") return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
    return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
  }

  const getStatusColor = (status: string) => {
    if (status === "Pass") return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
    if (status === "Fail") return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Grade Points</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades.map((grade) => (
            <TableRow key={grade.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">{grade.courseCode}</TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100">{grade.courseName}</TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">{grade.semester}</TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">{grade.year}</TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100">{grade.credits}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getGradeColor(grade.grade)}>
                  {grade.grade}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100">{grade.gradePoints}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getStatusColor(grade.status)}>
                  {grade.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 