import type React from "react"
import type { CollegeData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, Trash2 } from "lucide-react"

interface ProfileFormProps {
  collegeData: CollegeData
  onDataChange: (data: Partial<CollegeData>) => void
}

export default function ProfileForm({ collegeData, onDataChange }: ProfileFormProps) {
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onDataChange({ [name]: value })
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onDataChange({
      contact: {
        ...collegeData.contact,
        [name]: value,
      },
    })
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onDataChange({
      socialMedia: {
        ...collegeData.socialMedia,
        [name]: value,
      },
    })
  }

  const handleDepartmentChange = (index: number, field: string, value: string) => {
    const updatedDepartments = [...collegeData.departments]
    updatedDepartments[index] = {
      ...updatedDepartments[index],
      [field]: field === "students" || field === "teachers" ? Number.parseInt(value) : value,
    }
    onDataChange({ departments: updatedDepartments })
  }

  const addDepartment = () => {
    onDataChange({
      departments: [...collegeData.departments, { name: "", hod: "", teachers: 0, students: 0, programs: "" }],
    })
  }

  const removeDepartment = (index: number) => {
    const updatedDepartments = [...collegeData.departments]
    updatedDepartments.splice(index, 1)
    onDataChange({ departments: updatedDepartments })
  }

  const handleFacultyChange = (index: number, field: string, value: string) => {
    const updatedFaculty = [...collegeData.faculty]
    updatedFaculty[index] = {
      ...updatedFaculty[index],
      [field]: value,
    }
    onDataChange({ faculty: updatedFaculty })
  }

  const addFaculty = () => {
    onDataChange({
      faculty: [...collegeData.faculty, { name: "", position: "", specialization: "" }],
    })
  }

  const removeFaculty = (index: number) => {
    const updatedFaculty = [...collegeData.faculty]
    updatedFaculty.splice(index, 1)
    onDataChange({ faculty: updatedFaculty })
  }

  const handleFacilityChange = (index: number, field: string, value: string) => {
    const updatedFacilities = [...collegeData.facilities]
    updatedFacilities[index] = {
      ...updatedFacilities[index],
      [field]: value,
    }
    onDataChange({ facilities: updatedFacilities })
  }

  const addFacility = () => {
    onDataChange({
      facilities: [...collegeData.facilities, { name: "", description: "" }],
    })
  }

  const removeFacility = (index: number) => {
    const updatedFacilities = [...collegeData.facilities]
    updatedFacilities.splice(index, 1)
    onDataChange({ facilities: updatedFacilities })
  }

  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...collegeData.achievements]
    updatedAchievements[index] = value
    onDataChange({ achievements: updatedAchievements })
  }

  const addAchievement = () => {
    onDataChange({
      achievements: [...collegeData.achievements, ""],
    })
  }

  const removeAchievement = (index: number) => {
    const updatedAchievements = [...collegeData.achievements]
    updatedAchievements.splice(index, 1)
    onDataChange({ achievements: updatedAchievements })
  }

  return (
    <div className="space-y-8">
      {/* Header Information */}
      <Card>
        <CardHeader>
          <CardTitle>Header Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={collegeData.coverImage}
              onChange={handleBasicInfoChange}
              placeholder="Enter cover image URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              value={collegeData.logo}
              onChange={handleBasicInfoChange}
              placeholder="Enter logo URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">College Name</Label>
            <Input
              id="name"
              name="name"
              value={collegeData.name}
              onChange={handleBasicInfoChange}
              placeholder="Enter college name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              name="tagline"
              value={collegeData.tagline}
              onChange={handleBasicInfoChange}
              placeholder="Enter college tagline"
            />
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="about">College Description</Label>
            <Textarea
              id="about"
              name="about"
              value={collegeData.about}
              onChange={handleBasicInfoChange}
              placeholder="Enter college description"
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Basic Details */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="established">Established Year</Label>
            <Input
              id="established"
              name="established"
              value={collegeData.established}
              onChange={handleBasicInfoChange}
              placeholder="Enter established year"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={collegeData.location}
              onChange={handleBasicInfoChange}
              placeholder="Enter location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accreditations">Accreditations</Label>
            <Input
              id="accreditations"
              name="accreditations"
              value={collegeData.accreditations}
              onChange={handleBasicInfoChange}
              placeholder="Enter accreditations (e.g., AICTE, NAAC A+)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={collegeData.contact.phone}
              onChange={handleContactChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={collegeData.contact.email}
              onChange={handleContactChange}
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={collegeData.contact.website}
              onChange={handleContactChange}
              placeholder="Enter website URL"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={collegeData.socialMedia.linkedin}
              onChange={handleSocialChange}
              placeholder="Enter LinkedIn URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              name="twitter"
              value={collegeData.socialMedia.twitter}
              onChange={handleSocialChange}
              placeholder="Enter Twitter URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              name="instagram"
              value={collegeData.socialMedia.instagram}
              onChange={handleSocialChange}
              placeholder="Enter Instagram URL"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Departments & Branches</CardTitle>
          <Button variant="outline" size="sm" onClick={addDepartment} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Department
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {collegeData.departments.map((dept, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                onClick={() => removeDepartment(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-2">
                <Label htmlFor={`dept-name-${index}`}>Department Name</Label>
                <Input
                  id={`dept-name-${index}`}
                  value={dept.name}
                  onChange={(e) => handleDepartmentChange(index, "name", e.target.value)}
                  placeholder="Enter department name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dept-hod-${index}`}>Head of Department</Label>
                <Input
                  id={`dept-hod-${index}`}
                  value={dept.hod}
                  onChange={(e) => handleDepartmentChange(index, "hod", e.target.value)}
                  placeholder="Enter HOD name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`dept-teachers-${index}`}>Number of Teachers</Label>
                  <Input
                    id={`dept-teachers-${index}`}
                    type="number"
                    value={dept.teachers}
                    onChange={(e) => handleDepartmentChange(index, "teachers", e.target.value)}
                    placeholder="Enter number of teachers"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`dept-students-${index}`}>Number of Students</Label>
                  <Input
                    id={`dept-students-${index}`}
                    type="number"
                    value={dept.students}
                    onChange={(e) => handleDepartmentChange(index, "students", e.target.value)}
                    placeholder="Enter number of students"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dept-programs-${index}`}>Programs Offered</Label>
                <Input
                  id={`dept-programs-${index}`}
                  value={dept.programs}
                  onChange={(e) => handleDepartmentChange(index, "programs", e.target.value)}
                  placeholder="Enter programs (e.g., B.Tech, M.Tech, PhD)"
                />
              </div>

              {index < collegeData.departments.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Faculty & Staff */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Faculty & Staff</CardTitle>
          <Button variant="outline" size="sm" onClick={addFaculty} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Faculty
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {collegeData.faculty.map((faculty, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                onClick={() => removeFaculty(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-2">
                <Label htmlFor={`faculty-name-${index}`}>Name</Label>
                <Input
                  id={`faculty-name-${index}`}
                  value={faculty.name}
                  onChange={(e) => handleFacultyChange(index, "name", e.target.value)}
                  placeholder="Enter faculty name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`faculty-position-${index}`}>Position</Label>
                <Input
                  id={`faculty-position-${index}`}
                  value={faculty.position}
                  onChange={(e) => handleFacultyChange(index, "position", e.target.value)}
                  placeholder="Enter position (e.g., Professor, Associate Professor)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`faculty-specialization-${index}`}>Specialization</Label>
                <Input
                  id={`faculty-specialization-${index}`}
                  value={faculty.specialization}
                  onChange={(e) => handleFacultyChange(index, "specialization", e.target.value)}
                  placeholder="Enter specialization"
                />
              </div>

              {index < collegeData.faculty.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Facilities</CardTitle>
          <Button variant="outline" size="sm" onClick={addFacility} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Facility
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {collegeData.facilities.map((facility, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                onClick={() => removeFacility(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-2">
                <Label htmlFor={`facility-name-${index}`}>Facility Name</Label>
                <Input
                  id={`facility-name-${index}`}
                  value={facility.name}
                  onChange={(e) => handleFacilityChange(index, "name", e.target.value)}
                  placeholder="Enter facility name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`facility-description-${index}`}>Description</Label>
                <Input
                  id={`facility-description-${index}`}
                  value={facility.description}
                  onChange={(e) => handleFacilityChange(index, "description", e.target.value)}
                  placeholder="Enter facility description"
                />
              </div>

              {index < collegeData.facilities.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Achievements & Recognitions</CardTitle>
          <Button variant="outline" size="sm" onClick={addAchievement} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Achievement
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {collegeData.achievements.map((achievement, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                onClick={() => removeAchievement(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-2">
                <Label htmlFor={`achievement-${index}`}>Achievement</Label>
                <Input
                  id={`achievement-${index}`}
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  placeholder="Enter achievement"
                />
              </div>

              {index < collegeData.achievements.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardHeader>
          <CardTitle>Call to Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="applyUrl">Apply Now URL</Label>
            <Input
              id="applyUrl"
              name="applyUrl"
              value={collegeData.applyUrl}
              onChange={handleBasicInfoChange}
              placeholder="Enter application URL"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

