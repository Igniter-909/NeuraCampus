import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "@/components/ui/editable-field"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, PlusCircle, Trash2 } from "lucide-react"

interface AchievementsSectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: any) => void
  editingField: string | null
}

export default function AchievementsSection({ data, isAdmin, onEdit, editingField }: AchievementsSectionProps) {
  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...data.achievements]
    updatedAchievements[index] = value
    onEdit("achievements", updatedAchievements)
  }

  const addAchievement = () => {
    const updatedAchievements = [...data.achievements, "New achievement"]
    onEdit("achievements", updatedAchievements)
  }

  const removeAchievement = (index: number) => {
    const updatedAchievements = [...data.achievements]
    updatedAchievements.splice(index, 1)
    onEdit("achievements", updatedAchievements)
  }

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Trophy className="h-5 w-5 text-[#0a66c2]" />
          Achievements & Recognitions
        </CardTitle>

        {isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            onClick={addAchievement}
            className="h-8 text-[#0a66c2] hover:text-[#004182] hover:bg-blue-50"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {data.achievements.map((achievement, index) => (
            <li key={index} className="flex items-start gap-3 group relative">
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -left-8 top-0 h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeAchievement(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}

              <Badge className="bg-[#0a66c2] h-6 w-6 flex items-center justify-center rounded-full p-0 shrink-0 mt-0.5">
                {index + 1}
              </Badge>

              <div className="flex-1">
                <EditableField
                  value={achievement}
                  fieldPath={`achievement-${index}`}
                  onEdit={(_, value) => handleAchievementChange(index, value)}
                  isAdmin={isAdmin}
                  isEditing={editingField === `achievement-${index}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

