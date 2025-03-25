import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "@/components/ui/editable-field"
import { Button } from "@/components/ui/button"
import { Building2, Library, Home, FlaskRoundIcon as Flask, PlusCircle, Trash2 } from "lucide-react"

interface FacilitiesSectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: string | number | Array<{name: string, description: string}>) => void
  editingField: string | null
}

export default function FacilitiesSection({ data, isAdmin, onEdit, editingField }: FacilitiesSectionProps) {
  const handleFacilityChange = (index: number, field: string, value: string) => {
    const updatedFacilities = [...data.facilities]
    updatedFacilities[index] = {
      ...updatedFacilities[index],
      [field]: value,
    }
    onEdit("facilities", updatedFacilities)
  }

  const addFacility = () => {
    const updatedFacilities = [...data.facilities, { name: "New Facility", description: "" }]
    onEdit("facilities", updatedFacilities)
  }

  const removeFacility = (index: number) => {
    const updatedFacilities = [...data.facilities]
    updatedFacilities.splice(index, 1)
    onEdit("facilities", updatedFacilities)
  }

  const getFacilityIcon = (name: string) => {
    if (name.toLowerCase().includes("library")) {
      return <Library className="h-5 w-5 text-[#0a66c2]" />
    } else if (name.toLowerCase().includes("hostel")) {
      return <Home className="h-5 w-5 text-[#0a66c2]" />
    } else if (name.toLowerCase().includes("lab")) {
      return <Flask className="h-5 w-5 text-[#0a66c2]" />
    } else {
      return <Building2 className="h-5 w-5 text-[#0a66c2]" />
    }
  }

  return (
    <Card className="dark:bg-slate-900 dark:border-slate-700">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold dark:text-gray-100">
          <Building2 className="h-5 w-5 text-[#0a66c2]" />
          Facilities
        </CardTitle>

        {isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            onClick={addFacility}
            className="h-8 text-[#0a66c2] hover:text-[#004182] hover:bg-blue-50 dark:hover:bg-blue-900"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.facilities.map((facility, index) => (
            <div key={index} className="flex items-start gap-3 p-4 border dark:border-slate-700 rounded-lg group relative dark:bg-slate-800">
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                  onClick={() => removeFacility(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}

              <div className="shrink-0 mt-1">{getFacilityIcon(facility.name)}</div>

              <div className="flex-1">
                <h3 className="font-semibold dark:text-gray-100">
                  <EditableField
                    value={facility.name}
                    fieldPath={`facility-${index}-name`}
                    onEdit={(_, value) => handleFacilityChange(index, "name", value)}
                    isAdmin={isAdmin}
                    isEditing={editingField === `facility-${index}-name`}
                    textClassName="font-semibold dark:text-gray-100"
                  />
                </h3>

                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  <EditableField
                    value={facility.description}
                    fieldPath={`facility-${index}-description`}
                    onEdit={(_, value) => handleFacilityChange(index, "description", value)}
                    isAdmin={isAdmin}
                    isEditing={editingField === `facility-${index}-description`}
                    textClassName="text-sm text-muted-foreground dark:text-gray-400"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

