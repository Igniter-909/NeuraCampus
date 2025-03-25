import { useState } from "react"
import type { CollegeData, Placement, Internship } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, 
  PlusCircle, 
  Trash2, 
  GraduationCap, 
  Building, 
  UserCircle, 
  DollarSign, 
  Clock,
  CalendarDays,
  X
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EditableField from "@/components/ui/editable-field"

interface PlacementSectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: string | number | Array<Placement | Internship>) => void
  editingField: string | null
}

export default function PlacementSection({ data, isAdmin, onEdit, editingField }: PlacementSectionProps) {
  const [showPlacementsDialog, setShowPlacementsDialog] = useState(false)
  const [showInternshipsDialog, setShowInternshipsDialog] = useState(false)

  // Handler for placement changes
  const handlePlacementChange = (index: number, field: keyof Placement, value: string) => {
    const updatedPlacements = [...data.placements]
    updatedPlacements[index] = { ...updatedPlacements[index], [field]: value }
    onEdit("placements", updatedPlacements)
  }

  // Handler for internship changes
  const handleInternshipChange = (index: number, field: keyof Internship, value: string) => {
    const updatedInternships = [...data.internships]
    updatedInternships[index] = { ...updatedInternships[index], [field]: value }
    onEdit("internships", updatedInternships)
  }

  // Add new placement
  const addPlacement = () => {
    const updatedPlacements = [...data.placements, {
      companyName: "New Company",
      role: "New Role",
      studentName: "Student Name",
      package: "$XX,XXX",
      year: new Date().getFullYear().toString()
    }]
    onEdit("placements", updatedPlacements)
  }

  // Add new internship
  const addInternship = () => {
    const updatedInternships = [...data.internships, {
      companyName: "New Company",
      role: "New Role",
      studentName: "Student Name",
      duration: "X months",
      year: new Date().getFullYear().toString()
    }]
    onEdit("internships", updatedInternships)
  }

  // Remove placement
  const removePlacement = (index: number) => {
    const updatedPlacements = [...data.placements]
    updatedPlacements.splice(index, 1)
    onEdit("placements", updatedPlacements)
  }

  // Remove internship
  const removeInternship = (index: number) => {
    const updatedInternships = [...data.internships]
    updatedInternships.splice(index, 1)
    onEdit("internships", updatedInternships)
  }

  return (
    <Card className="dark:bg-slate-900 dark:border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold dark:text-gray-100">
          <Briefcase className="h-5 w-5 text-[#0a66c2]" />
          Placements & Internships
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {/* Placements Summary Box */}
          <Dialog open={showPlacementsDialog} onOpenChange={setShowPlacementsDialog}>
            <DialogTrigger asChild>
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors min-w-[200px]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-[#0a66c2] dark:text-blue-400">Placements</h3>
                  <Badge variant="outline" className="bg-white dark:bg-slate-800 dark:text-gray-200">
                    {data.placements.length}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to view placement details</p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto dark:bg-slate-900 dark:border-slate-700">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 dark:text-gray-100">
                  <GraduationCap className="h-5 w-5 text-[#0a66c2]" />
                  Student Placements
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Placements: {data.placements.length}</p>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addPlacement}
                    className="text-[#0a66c2] hover:text-[#004182] hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-blue-400 dark:border-slate-700"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Placement
                  </Button>
                )}
              </div>

              <Table>
                <TableHeader className="dark:bg-slate-800">
                  <TableRow className="dark:border-slate-700">
                    <TableHead className="w-[180px] dark:text-gray-300">Company</TableHead>
                    <TableHead className="dark:text-gray-300">Role</TableHead>
                    <TableHead className="dark:text-gray-300">Student</TableHead>
                    <TableHead className="dark:text-gray-300">Package</TableHead>
                    <TableHead className="dark:text-gray-300">Year</TableHead>
                    {isAdmin && <TableHead className="w-[50px] dark:text-gray-300">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.placements.map((placement, index) => (
                    <TableRow key={index} className="dark:border-slate-700">
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={placement.companyName}
                            fieldPath={`placement-${index}-company`}
                            onEdit={(_, value) => handlePlacementChange(index, "companyName", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `placement-${index}-company`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <EditableField
                          value={placement.role}
                          fieldPath={`placement-${index}-role`}
                          onEdit={(_, value) => handlePlacementChange(index, "role", value)}
                          isAdmin={isAdmin}
                          isEditing={editingField === `placement-${index}-role`}
                          textClassName="dark:text-gray-300"
                        />
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={placement.studentName}
                            fieldPath={`placement-${index}-student`}
                            onEdit={(_, value) => handlePlacementChange(index, "studentName", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `placement-${index}-student`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={placement.package}
                            fieldPath={`placement-${index}-package`}
                            onEdit={(_, value) => handlePlacementChange(index, "package", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `placement-${index}-package`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={placement.year}
                            fieldPath={`placement-${index}-year`}
                            onEdit={(_, value) => handlePlacementChange(index, "year", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `placement-${index}-year`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                            onClick={() => removePlacement(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-end mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="dark:border-slate-700 dark:text-gray-300">
                    <X className="h-4 w-4 mr-1" />
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          {/* Internships Summary Box */}
          <Dialog open={showInternshipsDialog} onOpenChange={setShowInternshipsDialog}>
            <DialogTrigger asChild>
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors min-w-[200px]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-[#0a66c2] dark:text-blue-400">Internships</h3>
                  <Badge variant="outline" className="bg-white dark:bg-slate-800 dark:text-gray-200">
                    {data.internships.length}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to view internship details</p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto dark:bg-slate-900 dark:border-slate-700">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 dark:text-gray-100">
                  <Briefcase className="h-5 w-5 text-[#0a66c2]" />
                  Student Internships
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Internships: {data.internships.length}</p>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addInternship}
                    className="text-[#0a66c2] hover:text-[#004182] hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-blue-400 dark:border-slate-700"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Internship
                  </Button>
                )}
              </div>

              <Table>
                <TableHeader className="dark:bg-slate-800">
                  <TableRow className="dark:border-slate-700">
                    <TableHead className="w-[180px] dark:text-gray-300">Company</TableHead>
                    <TableHead className="dark:text-gray-300">Role</TableHead>
                    <TableHead className="dark:text-gray-300">Student</TableHead>
                    <TableHead className="dark:text-gray-300">Duration</TableHead>
                    <TableHead className="dark:text-gray-300">Year</TableHead>
                    {isAdmin && <TableHead className="w-[50px] dark:text-gray-300">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.internships.map((internship, index) => (
                    <TableRow key={index} className="dark:border-slate-700">
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={internship.companyName}
                            fieldPath={`internship-${index}-company`}
                            onEdit={(_, value) => handleInternshipChange(index, "companyName", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `internship-${index}-company`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <EditableField
                          value={internship.role}
                          fieldPath={`internship-${index}-role`}
                          onEdit={(_, value) => handleInternshipChange(index, "role", value)}
                          isAdmin={isAdmin}
                          isEditing={editingField === `internship-${index}-role`}
                          textClassName="dark:text-gray-300"
                        />
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={internship.studentName}
                            fieldPath={`internship-${index}-student`}
                            onEdit={(_, value) => handleInternshipChange(index, "studentName", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `internship-${index}-student`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={internship.duration}
                            fieldPath={`internship-${index}-duration`}
                            onEdit={(_, value) => handleInternshipChange(index, "duration", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `internship-${index}-duration`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <EditableField
                            value={internship.year}
                            fieldPath={`internship-${index}-year`}
                            onEdit={(_, value) => handleInternshipChange(index, "year", value)}
                            isAdmin={isAdmin}
                            isEditing={editingField === `internship-${index}-year`}
                            textClassName="dark:text-gray-300"
                          />
                        </div>
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                            onClick={() => removeInternship(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-end mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="dark:border-slate-700 dark:text-gray-300">
                    <X className="h-4 w-4 mr-1" />
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
} 