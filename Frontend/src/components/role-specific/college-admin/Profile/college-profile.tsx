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
import PlacementSection from "@/components/role-specific/college-admin/Profile/placement-section"
import FloatingActionButton from "@/components/ui/floating-action-button"
import { apiClient } from "@/lib/api"

interface CollegeProfileProps {
  collegeId: string
}

export default function CollegeProfile({ collegeId }: CollegeProfileProps) {
  const [collegeData, setCollegeData] = useState<CollegeData>(initialCollegeData)
  const [editedData, setEditedData] = useState<CollegeData>(initialCollegeData)
  const [isAdmin] = useState(true) // In a real app, this would be determined by authentication
  const [hasChanges, setHasChanges] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch college data when component mounts or collegeId changes
  useEffect(() => {
    const fetchCollegeData = async () => {
      if (!collegeId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await apiClient.get(`/colleges/${collegeId}/profile`)
        console.log("1313d",response.data);
        const data = response.data.data;
        
        // If backend returns data in a different format, transform it to match CollegeData interface
        if (data) {
          setCollegeData(data)
          setEditedData(data)
        }
      } catch (err) {
        console.error("Error fetching college data:", err)
        setError("Failed to load college data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCollegeData()
  }, [collegeId])

  // Update hasChanges when editedData changes
  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(collegeData) !== JSON.stringify(editedData)
    setHasChanges(hasUnsavedChanges)
  }, [collegeData, editedData])

  // Using unknown is safer than any but still allows for the flexibility needed
  const handleFieldEdit = (fieldPath: string, value: unknown) => {
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

  const handleSaveChanges = async () => {
    try {
      // Save changes to backend
      if (collegeId) {
        console.log("1313derrngklnme",editedData);
        const response = await apiClient.put(`/colleges/${collegeId}/profile`, editedData)
        console.log("1313d",response.data);
      }
      
      setCollegeData(editedData)
      setHasChanges(false)
      setEditingField(null)
    } catch (err) {
      console.error("Error saving college data:", err)
      setError("Failed to save changes. Please try again later.")
    }
  }

  const handleDiscardChanges = () => {
    setEditedData(collegeData)
    setHasChanges(false)
    setEditingField(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading college profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 dark:bg-slate-950">
      <div className="space-y-6">
        <ProfileHeader data={editedData} isAdmin={isAdmin} onEdit={handleFieldEdit} editingField={editingField} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <AboutSection data={editedData} isAdmin={isAdmin} onEdit={handleFieldEdit} editingField={editingField} />

            <PlacementSection data={editedData} isAdmin={isAdmin} onEdit={handleFieldEdit} editingField={editingField} />

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

