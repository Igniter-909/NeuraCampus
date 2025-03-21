import { useState } from "react"
import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "@/components/ui/editable-field"
import { Button } from "@/components/ui/button"
import { Users, User, GraduationCap, BookOpen, PlusCircle, Trash2 } from "lucide-react"

interface DepartmentsSectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: any) => void
  editingField: string | null
}

export default function DepartmentsSection({ data, isAdmin, onEdit, editingField }: DepartmentsSectionProps) {
  const [expandedDept, setExpandedDept] = useState<number | null>(null)

  const handleDepartmentChange = (index: number, field: string, value: any) => {
    const updatedDepartments = [...data.departments]
    updatedDepartments[index] = {
      ...updatedDepartments[index],
      [field]: field === "students" || field === "teachers" ? Number.parseInt(value) : value,
    }
    onEdit("departments", updatedDepartments)
  }

  const addDepartment = () => {
    const updatedDepartments = [
      ...data.departments,
      { name: "New Department", hod: "", teachers: 0, students: 0, programs: "" },
    ]
    onEdit("departments", updatedDepartments)
    setExpandedDept(data.departments.length)
  }

  const removeDepartment = (index: number) => {
    const updatedDepartments = [...data.departments]
    updatedDepartments.splice(index, 1)
    onEdit("departments", updatedDepartments)
    setExpandedDept(null)
  }

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Users className="h-5 w-5 text-[#0a66c2]" />
          Departments & Branches
        </CardTitle>

        {isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            onClick={addDepartment}
            className="h-8 text-[#0a66c2] hover:text-[#004182] hover:bg-blue-50"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.departments.map((dept, index) => (
            <div key={index} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div
                className={`p-4 cursor-pointer flex justify-between items-center ${expandedDept === index ? "bg-blue-50" : ""}`}
                onClick={() => setExpandedDept(expandedDept === index ? null : index)}
              >
                <div className="font-medium">
                  {isAdmin && expandedDept === index ? (
                    <EditableField
                      value={dept.name}
                      fieldPath={`dept-${index}-name`}
                      onEdit={(_, value) => handleDepartmentChange(index, "name", value)}
                      isAdmin={true}
                      isEditing={editingField === `dept-${index}-name`}
                    />
                  ) : (
                    dept.name
                  )}
                </div>

                {isAdmin && expandedDept === index && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeDepartment(index)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {expandedDept === index && (
                <div className="p-4 border-t space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#0a66c2]" />
                    <span className="font-medium">HOD:</span>
                    <EditableField
                      value={dept.hod}
                      fieldPath={`dept-${index}-hod`}
                      onEdit={(_, value) => handleDepartmentChange(index, "hod", value)}
                      isAdmin={isAdmin}
                      isEditing={editingField === `dept-${index}-hod`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0a66c2]" />
                    <span className="font-medium">Faculty:</span>
                    <EditableField
                      value={dept.teachers.toString()}
                      fieldPath={`dept-${index}-teachers`}
                      onEdit={(_, value) => handleDepartmentChange(index, "teachers", value)}
                      isAdmin={isAdmin}
                      isEditing={editingField === `dept-${index}-teachers`}
                    />
                    <span>Teachers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#0a66c2]" />
                    <span className="font-medium">Students:</span>
                    <EditableField
                      value={dept.students.toString()}
                      fieldPath={`dept-${index}-students`}
                      onEdit={(_, value) => handleDepartmentChange(index, "students", value)}
                      isAdmin={isAdmin}
                      isEditing={editingField === `dept-${index}-students`}
                    />
                    <span>Students</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#0a66c2]" />
                    <span className="font-medium">Programs:</span>
                    <EditableField
                      value={dept.programs}
                      fieldPath={`dept-${index}-programs`}
                      onEdit={(_, value) => handleDepartmentChange(index, "programs", value)}
                      isAdmin={isAdmin}
                      isEditing={editingField === `dept-${index}-programs`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

