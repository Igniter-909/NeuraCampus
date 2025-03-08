"use client"

import { useState, useEffect } from "react"
import { type CollegeData, initialCollegeData } from "@/lib/data"
import ProfileHeader from "@/components/role-specific/college-admin/Profile/profile-header"
import AboutSection from "@/components/role-specific/college-admin/Profile/about-section"
import BasicInfoSection from "@/components/role-specific/college-admin/Profile/basic-info-section"
import DepartmentsSection from "@/components/role-specific/college-admin/Profile/department-section"
import FacultySection from "@/components/role-specific/college-admin/Profile/faculty-section"
import FacilitiesSection from "@/components/role-specific/college-admin/Profile/facilities"
import AchievementsSection from "@/components/role-specific/college-admin/Profile/achievements-section"
import FloatingActionButton from "@/components/ui/floating-action-button"

export default function CollegeProfile() {
  const [collegeData, setCollegeData] = useState<CollegeData>(initialCollegeData)
  const [editedData, setEditedData] = useState<CollegeData>(initialCollegeData)
  const [isAdmin, setIsAdmin] = useState(true) // In a real app, this would be determined by authentication
  const [hasChanges, setHasChanges] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)

  // Update hasChanges when editedData changes
  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(collegeData) !== JSON.stringify(editedData)
    setHasChanges(hasUnsavedChanges)
  }, [collegeData, editedData])

  const handleFieldEdit = (fieldPath: string, value: any) => {
    setEditingField(fieldPath)

    // Create a deep copy of editedData and update the specified field
    const newData = JSON.parse(JSON.stringify(editedData))

    // Handle nested paths like "contact.email"
    const pathParts = fieldPath.split(".")
    let current = newData

    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]]
    }

    current[pathParts[pathParts.length - 1]] = value
    setEditedData(newData)
  }

  const handleSaveChanges = () => {
    setCollegeData(editedData)
    setHasChanges(false)
    setEditingField(null)
  }

  const handleDiscardChanges = () => {
    setEditedData(collegeData)
    setHasChanges(false)
    setEditingField(null)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 ">
      <div className="space-y-6">
        <ProfileHeader data={editedData} isAdmin={isAdmin} onEdit={handleFieldEdit} editingField={editingField} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <AboutSection data={editedData} isAdmin={isAdmin} onEdit={handleFieldEdit} editingField={editingField} />

            <DepartmentsSection
              data={editedData}
              isAdmin={isAdmin}
              onEdit={handleFieldEdit}
              editingField={editingField}
            />

            <FacultySection data={editedData} isAdmin={isAdmin} onEdit={handleFieldEdit} editingField={editingField} />

            <FacilitiesSection
              data={editedData}
              isAdmin={isAdmin}
              onEdit={handleFieldEdit}
              editingField={editingField}
            />

            <AchievementsSection
              data={editedData}
              isAdmin={isAdmin}
              onEdit={handleFieldEdit}
              editingField={editingField}
            />
          </div>

          <div className="space-y-6">
            <BasicInfoSection
              data={editedData}
              isAdmin={isAdmin}
              onEdit={handleFieldEdit}
              editingField={editingField}
            />
          </div>
        </div>
      </div>

      {hasChanges && <FloatingActionButton onSave={handleSaveChanges} onDiscard={handleDiscardChanges} />}
    </div>
  )
}

