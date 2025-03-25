import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "@/components/ui/editable-field"
import { Button } from "@/components/ui/button"
import { User, PlusCircle, Trash2 } from "lucide-react"

interface FacultySectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: string | number | Array<{name: string, position: string, specialization: string}>) => void
  editingField: string | null
}

export default function FacultySection({ data, isAdmin, onEdit, editingField }: FacultySectionProps) {
  const handleFacultyChange = (index: number, field: string, value: string) => {
    const updatedFaculty = [...data.faculty]
    updatedFaculty[index] = {
      ...updatedFaculty[index],
      [field]: value,
    }
    onEdit("faculty", updatedFaculty)
  }

  const addFaculty = () => {
    const updatedFaculty = [...data.faculty, { name: "New Faculty Member", position: "", specialization: "" }]
    onEdit("faculty", updatedFaculty)
  }

  const removeFaculty = (index: number) => {
    const updatedFaculty = [...data.faculty]
    updatedFaculty.splice(index, 1)
    onEdit("faculty", updatedFaculty)
  }

  return (
    <Card className="dark:bg-slate-900 dark:border-slate-700">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold dark:text-gray-100">
          <User className="h-5 w-5 text-[#0a66c2]" />
          Faculty & Staff
        </CardTitle>

        {isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            onClick={addFaculty}
            className="h-8 text-[#0a66c2] hover:text-[#004182] hover:bg-blue-50 dark:hover:bg-blue-900"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.faculty.map((faculty, index) => (
            <div key={index} className="flex flex-col p-4 border dark:border-slate-700 rounded-lg relative group dark:bg-slate-800">
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                  onClick={() => removeFaculty(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}

              <div className="w-12 h-12 rounded-full bg-[#f4f4f4] dark:bg-slate-700 flex items-center justify-center mb-3">
                <User className="h-6 w-6 text-[#0a66c2]" />
              </div>

              <h3 className="text-lg font-semibold dark:text-gray-100">
                <EditableField
                  value={faculty.name}
                  fieldPath={`faculty-${index}-name`}
                  onEdit={(_, value) => handleFacultyChange(index, "name", value)}
                  isAdmin={isAdmin}
                  isEditing={editingField === `faculty-${index}-name`}
                  textClassName="text-lg font-semibold dark:text-gray-100"
                />
              </h3>

              <p className="text-[#0a66c2]">
                <EditableField
                  value={faculty.position}
                  fieldPath={`faculty-${index}-position`}
                  onEdit={(_, value) => handleFacultyChange(index, "position", value)}
                  isAdmin={isAdmin}
                  isEditing={editingField === `faculty-${index}-position`}
                  textClassName="text-[#0a66c2]"
                />
              </p>

              <p className="text-sm text-muted-foreground dark:text-gray-400">
                <EditableField
                  value={faculty.specialization}
                  fieldPath={`faculty-${index}-specialization`}
                  onEdit={(_, value) => handleFacultyChange(index, "specialization", value)}
                  isAdmin={isAdmin}
                  isEditing={editingField === `faculty-${index}-specialization`}
                  textClassName="text-sm text-muted-foreground dark:text-gray-400"
                />
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

