"use client"

import { useUser } from "@/hooks/auth/useUser"
import CollegeProfile from "@/components/role-specific/college-admin/Profile/college-profile"

export default function Home() {
  const { user, loading, error } = useUser()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <p>Loading profile data...</p>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <p>Error loading profile: {error || "User not found"}</p>
      </div>
    )
  }

  // Determine if user can edit the profile
  // Only allow editing if user is a college_admin
  const canEdit = user.role === 'superadmin';

  return (
    <div className="min-h-screen bg-transparent">
      <CollegeProfile collegeId={user.college || ""} canEdit={canEdit} />
    </div>
  )
}

