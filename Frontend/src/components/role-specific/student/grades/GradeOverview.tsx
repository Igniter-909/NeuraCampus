import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, TrendingUp, Target, BookOpen } from "lucide-react"

interface GradeOverviewProps {
  cgpa: number;
  totalCredits: number;
  completedCredits: number;
  averageGrade: string;
}

export default function GradeOverview({
  cgpa,
  totalCredits,
  completedCredits,
  averageGrade,
}: GradeOverviewProps) {
  const progressPercentage = (completedCredits / totalCredits) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* CGPA Card */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{cgpa.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Average Grade Card */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{averageGrade}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits Progress Card */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Credits Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {completedCredits}/{totalCredits}
              </p>
            </div>
          </div>
          <Progress
            value={progressPercentage}
            className="mt-2 h-2 bg-gray-100 dark:bg-gray-800"
            indicatorClassName="bg-blue-500"
          />
        </CardContent>
      </Card>

      {/* Courses Completed Card */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Courses Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round(completedCredits / 3)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 