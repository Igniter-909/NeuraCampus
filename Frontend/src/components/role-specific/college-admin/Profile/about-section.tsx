import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "@/components/ui/editable-field"
import { BookOpen } from "lucide-react"

interface AboutSectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: string | number) => void
  editingField: string | null
}

export default function AboutSection({ data, isAdmin, onEdit, editingField }: AboutSectionProps) {
  return (
    <Card className="dark:bg-slate-900 dark:border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold dark:text-gray-100">
          <BookOpen className="h-5 w-5 text-[#0a66c2]" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditableField
          value={data.about}
          fieldPath="about"
          onEdit={onEdit}
          isAdmin={isAdmin}
          isEditing={editingField === "about"}
          type="textarea"
          textClassName="whitespace-pre-line dark:text-gray-300"
        />
      </CardContent>
    </Card>
  )
}

