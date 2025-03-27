import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Briefcase, GraduationCap, Award } from "lucide-react"

interface StudentProfileDockProps {
  name: string;
  description: string;
  skills: string[];
  currentYear: string;
  branch: string;
  cgpa: number;
}

export default function StudentProfileDock({
  name,
  description,
  skills,
  currentYear,
  branch,
  cgpa,
}: StudentProfileDockProps) {
  return (
    <div className="fixed right-8 lg:right-12 top-[1%] h-[98%] w-80 lg:w-96 overflow-hidden hidden md:block">
      <Card className="h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-800">
        <CardContent className="p-8 h-full overflow-y-auto">
          <div className="flex flex-col items-center justify-start space-y-8 h-full">
            <Avatar className="h-28 w-28 border-4 border-blue-500 dark:border-blue-400">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} />
              <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{branch}</p>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <GraduationCap className="h-5 w-5" />
              <span>{currentYear}</span>
              <span>•</span>
              <Award className="h-5 w-5" />
              <span>CGPA: {cgpa}</span>
            </div>

            <div className="w-full pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">About</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>

            <div className="w-full pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-3 py-1.5 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 