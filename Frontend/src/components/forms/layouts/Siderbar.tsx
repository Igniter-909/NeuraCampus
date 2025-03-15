"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  LogOut,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react"
import logo from "../../../../public/logo11.svg"
import Image from "next/image"
import ProfessorIcon from "../../../../public/sidebar/002-professor.svg"
import SchoolIcon from "../../../../public/sidebar/002-school.svg"
import GradeIcon from "../../../../public/sidebar/008-scores.svg"
import NotificationIcon from "../../../../public/sidebar/018-school bell.svg"
import AnalyisiIcon from "../../../../public/sidebar/040-analysis.svg"
import DashboardIcon from "../../../../public/sidebar/009-web administrator.svg"
import SettingIcon from "../../../../public/sidebar/003-setting.svg"
import CourseIcon from "../../../../public/sidebar/039-career choice.svg"
import ScheduleIcon from "../../../../public/sidebar/021-time management.svg"
import CollegeIcon from "../../../../public/sidebar/050-office.svg"
import InstitutionIcon from "../../../../public/sidebar/027-government.svg"
import UserIcon from "../../../../public/sidebar/004-student.svg"
import JobsIcon from "../../../../public/sidebar/027-businessman.svg"
import ApplicationIcon from "../../../../public/sidebar/053-contract.svg"
import UserIcon2 from "../../../../public/sidebar/033-student.svg"
import CommunityIcon from "../../../../public/sidebar/033-student.svg"
import UserIcon3 from "../../../../public/sidebar/034-student.svg" 
import PortalIcon from "../../../../public/sidebar/034-student.svg"
import AttendanceIcon from "../../../../public/sidebar/024-schedule.svg"
import { ROLE_DISPLAY_NAMES } from "@/constants/roles"
import { useAuth } from "@/hooks/auth/useAuth"
import type { Role } from "@/types/roles"

export interface NavigationItem {
  label: string
  path: string
  icon: string
}

interface SidebarProps {
  navigationItems: NavigationItem[]
  role: Role
  userName: string
  isCollapsed:boolean
  setIsCollapsed:any
  mobileMenuOpen:boolean;
  setMobileMenuOpen:any
}

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <Image src={DashboardIcon} width={30} height={30} alt="Dashboard" />,
  institutions: <Image src={InstitutionIcon} width={30} height={30} alt="Institution" />,
  users: <Image src={UserIcon} width={30} height={30} alt="User" />,
  colleges: <Image src={SchoolIcon} width={30} height={30} alt="College" />,
  courses: <Image src={CourseIcon} width={30} height={30} alt="Courses" />,
  schedule: <Image src={ScheduleIcon} width={30} height={30} alt="Schedule" />,
  grades: <Image src={GradeIcon} width={30} height={30} alt="Grades" />,
  faculty: <Image src={ProfessorIcon} width={30} height={30} alt="Faculty" />,
  settings: <Image src={SettingIcon} width={30} height={30} alt="Setting" />,
  notifications: <Image src={NotificationIcon} width={30} height={30} alt="Notifications" />,
  stats: <Image src={AnalyisiIcon} width={30} height={30} alt="Stats" />,
  departments: <Image src={CollegeIcon} width={30} height={30} alt="Department" />,
  user2: <Image src={UserIcon2} width={30} height={30} alt="User" />,
  user3: <Image src={UserIcon3} width={30} height={30} alt="User" />,
  attendance: <Image src={AttendanceIcon} width={30} height={30} alt="User" />,
  jobs: <Image src={JobsIcon} width={30} height={30} alt="Jobs" />,
  applications: <Image src={ApplicationIcon} width={30} height={30} alt="Application" />,
  community: <Image src={CommunityIcon} width={30} height={30} alt="Community" />,
  portal: <Image src={PortalIcon} width={30} height={30} alt="Portal" />,
}

export default function Sidebar({ navigationItems, role, userName, isCollapsed, setIsCollapsed, mobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const mainNavItems = navigationItems.filter((item) =>
    ["dashboard", "students", "courses", "schedule"].includes(item.icon),
  )

  const secondaryNavItems = navigationItems.filter(
    (item) => !["dashboard", "students", "courses", "schedule"].includes(item.icon),
  )

  return (
    <div className="rounded-xl shadow-2xl shadow-blue-950 p-0">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:sticky top-0 left-0 h-[calc(100vh)] z-40
          bg-gradient-to-b from-blue-900 via-blue-950 to-[#0B1627] 
          text-white flex flex-col 
          transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0 w-[250px]' : '-translate-x-full w-[250px]'}
          ${isCollapsed ? 'md:w-16' : 'md:w-60'}
          md:translate-x-0
        `}
      >
        {/* Header with slightly transparent background */}
        <div className={`bg-white/5 backdrop-blur-sm shadow-lg h-16 flex items-center justify-between  flex-shrink-0 ${isCollapsed && !mobileMenuOpen ? 'justify-center px-1' : 'px-3'}`}>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-md bg-white/10 flex items-center justify-center">
              {/* <GraduationCap size={20} className="text-white" />
               */}
               <Image src={logo} width={40} height={40} alt="logo" />
            </div>
            {(!isCollapsed || mobileMenuOpen) && (
              <div>
                <h1 className="text-lg font-semibold text-white">NeuraCampus</h1>
                <p className="text-[10px] -mt-1 text-white/60">New Era for College</p>
              </div>
            )}
          </div>
          {/* Mobile Close Button */}
          {mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-white/60 hover:text-white"
            >
              <X size={24} />
            </button>
          )}
        </div>

       

        {/* Navigation - Scrollable Area */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed && !mobileMenuOpen ? 'overflow-hidden mt-12' : ''}`}>
          {/* Main Navigation */}
          <div className="py-4">
            {(!isCollapsed || mobileMenuOpen) && (
              <h3 className="px-4 text-xs font-medium text-white/60 uppercase mb-2">
                MAIN
              </h3>
            )}
            <nav className="space-y-1 px-2">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-md transition-all duration-200
                      ${isActive 
                        ? "bg-white/10 text-white" 
                        : "text-white/60 hover:bg-white/5 hover:text-white"}
                      ${isCollapsed && !mobileMenuOpen 
                        ? "justify-center p-2" 
                        : "px-3 py-2.5"}
                    `}
                  >
                    <span className={`flex-shrink-0 transition-transform duration-200 ${
                      isCollapsed && !mobileMenuOpen && !isActive ? "transform hover:scale-110" : ""
                    }`}>
                      {iconMap[item.icon]}
                    </span>
                    {(!isCollapsed || mobileMenuOpen) && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Administration Navigation */}
          <div className="pb-4">
            {(!isCollapsed || mobileMenuOpen) && (
              <h3 className="px-4 text-xs font-medium text-white/60 uppercase mb-2">
                ADMINISTRATION
              </h3>
            )}
            <nav className="space-y-1 px-2">
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-md transition-all duration-200
                      ${isActive 
                        ? "bg-white/10 text-white" 
                        : "text-white/60 hover:bg-white/5 hover:text-white"}
                      ${isCollapsed && !mobileMenuOpen 
                        ? "justify-center p-2" 
                        : "px-3 py-2.5"}
                    `}
                  >
                    <span className={`flex-shrink-0 transition-transform duration-200 ${
                      isCollapsed && !mobileMenuOpen && !isActive ? "transform hover:scale-110" : ""
                    }`}>
                      {iconMap[item.icon]}
                    </span>
                    {(!isCollapsed || mobileMenuOpen) && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
         {/* User Profile */}
        <div className={`px-4 py-4 border-b border-white/10 flex items-center ${isCollapsed && !mobileMenuOpen ? 'justify-center' : 'gap-3'} flex-shrink-0`}>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            {userName.charAt(0).toUpperCase()}
          </div>
          {(!isCollapsed || mobileMenuOpen) && (
            <div>
              <p className="text-sm font-medium text-gray-400">{userName}</p>
              <p className="text-xs text-white/60">{ROLE_DISPLAY_NAMES[role]}</p>
            </div>
          )}
        </div>
        {/* Logout Button - Fixed at bottom with rounded corners */}
        <div className="mt-auto  border-t border-white/10 bg-[#0B1627] rounded-b-xl flex-shrink-0">
          <button
            onClick={() => logout()}
            className={`
              w-full flex items-center text-center text-rose-600 hover:text-rose-200 
              transition-colors py-4 px-4 rounded-b-xl
              ${isCollapsed && !mobileMenuOpen ? "justify-center" : "gap-3"}
            `}
          >
            <LogOut size={18} />
            {(!isCollapsed || mobileMenuOpen) && <span>Log out</span>}
          </button>
        </div>

        {/* Collapse Toggle - Updated with gradient-matching colors */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 hidden md:flex border-4 border-blue-50 shadow-blue-200 
            items-center justify-center w-6 h-6 rounded-full bg-blue-900 text-white shadow-2xl 
            hover:bg-blue-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </div>
  )
}

