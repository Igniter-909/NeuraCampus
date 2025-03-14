// src/app/(dashboard)/layout.tsx
"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Sidebar from "@/components/forms/layouts/Siderbar"
import Header from "@/components/forms/layouts/Header"
import { NAVIGATION_ROUTES } from "@/constants/routes"
import { useUser } from "@/hooks/auth/useUser"
import LoadingSkeleton from "@/components/ui/LoadingSkeleton"
import RightSidebar from "@/components/forms/layouts/RightSidebar"
import { BackgroundPattern } from "@/components/ui/background-pattern"
// import PageWrapper from '@/components/common/PageWrapper'
// import Logo from '@/components/forms/layouts/Logo';

const DASHBOARD_ROLES = ['student', 'teacher', 'college-admin', 'super-admin', 'alumni', 'recruiter'] as const;

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user, loading } = useUser()
  const pathname = usePathname()
  // const router = useRouter()
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false); 

  // Initialize theme from localStorage
  // useEffect(() => {
  //   const theme = localStorage.getItem("theme") || "light"
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark")
  //   } else {
  //     document.documentElement.classList.remove("dark")
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/login")
  //   }
  // }, [loading, user, router])

  if (loading) {
    return <LoadingSkeleton height="lg" />
  }

  if (!user) {
    return null
  }

  const navigationItems = NAVIGATION_ROUTES[user.role] || []

  const sampleData = {
    languageProgress: [
      { language: 'French', progress: 45, color: '#36A2EB' },
      { language: 'Spanish', progress: 60, color: '#FF6384' },
      { language: 'Italian', progress: 35, color: '#FFCE56' }
    ],
    dailyActivities: [
      {
        time: '12:00',
        title: 'Introduction to Spanish',
        startTime: '12:40',
        endTime: '13:30',
        backgroundColor: '#FFF9E5'
      },
      {
        time: '14:00',
        title: 'English for travel',
        startTime: '14:00',
        endTime: '15:30',
        backgroundColor: '#E5F3FF'
      }
    ]
  };

  // Convert path to page name
  const getPageName = (path: string) => {
    // Remove leading slash and split by '/'
    const segments = path.slice(1).split('/')
    // Get the last segment
    const lastSegment = segments[segments.length - 1]

    // Check if the last segment is one of the dashboard roles
    if (DASHBOARD_ROLES.includes(lastSegment as typeof DASHBOARD_ROLES[number])) {
      return 'Dashboard'
    }

    // Convert to title case and replace hyphens/underscores with spaces
    return lastSegment
      ? lastSegment.split(/[-_]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : 'Dashboard'
  }

  const pageName = getPageName(pathname)

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="bg-transparent flex-shrink-0">
        <Sidebar 
          navigationItems={navigationItems} 
          role={user?.role}
          userName={user?.name}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex-shrink-0 bg-white shadow-md z-10 relative">
          <Header 
            userRole={user.role}
            userName={user.name} 
            userAvatar={user.media?.avatar?.url} 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            PageName={pageName}
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full md:p-4 lg:p-0 overflow-y-auto bg-[#dbdde0b5] dark:bg-[#585858]">
          <BackgroundPattern/>
          {children}
        </main>
      </div>
    </div>
  )
}