"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/auth/useAuth"
import { ROLE_DISPLAY_NAMES } from "@/constants/roles"
import type { Role } from "@/types/roles"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { FullscreenToggle } from "@/components/ui/FullscreenToggle"
import { Search, Bell, Menu, X, User, Settings, LogOut, MessageSquare, HelpCircle, MoreVertical } from "lucide-react"

interface HeaderProps {
  userRole: Role
  userName: string
  userAvatar?: string
  mobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
  PageName: string
}

export default function Header({ userRole, userName, userAvatar, mobileMenuOpen, setMobileMenuOpen,PageName }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [notificationCount] = useState(3)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileDropdownRef = useRef<HTMLDivElement>(null)
  const { logout } = useAuth()

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setMobileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleMobileMenuItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
    setMobileDropdownOpen(false);
  };

  const mobileMenuItems = [
    { 
      icon: <Bell size={16} />, 
      label: "Notifications", 
      badge: notificationCount,
      action: () => console.log('Notifications clicked'),
      component: null
    },
    { 
      icon: <MessageSquare size={16} />, 
      label: "Messages",
      action: () => console.log('Messages clicked'),
      component: null
    },
    { 
      icon: <HelpCircle size={16} />, 
      label: "Help",
      action: () => console.log('Help clicked'),
      component: null
    },
    { 
      icon: null,
      label: "Theme",
      action: null,
      component: (
        <div className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <div className="flex items-center w-full">
            <ThemeToggle className="!p-0 mr-3" />
            <button className="flex-1 text-left" onClick={() => document.querySelector<HTMLButtonElement>('.theme-toggle-button')?.click()}>
              Theme
            </button>
          </div>
        </div>
      )
    },
    { 
      icon: null,
      label: "Fullscreen",
      action: null,
      component: (
        <div className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <div className="flex items-center w-full">
            <FullscreenToggle className="!p-0 mr-3" />
            <button className="flex-1 text-left" onClick={() => document.querySelector<HTMLButtonElement>('.fullscreen-toggle-button')?.click()}>
              Fullscreen
            </button>
          </div>
        </div>
      )
    },
  ];

  return (
    <header className="bg-white shadow-lg dark:bg-black dark:text-white shadow-gray-200 dark:shadow-none w-full z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <h1 className="text-2xl font-thin md:font-semibold text-gray-800 dark:text-white">{PageName}</h1>

          {/* Center - Search */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-start">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className={`${searchFocused ? "text-primary" : "text-slate-400"}`} />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md leading-5 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                  placeholder="Search courses, students, or resources..."
                  type="search"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-1 sm:space-x-3">
              

              <button className="p-2 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 rounded-full hover:bg-white dark:hover:bg-slate-800/60 transition-colors relative">
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-medium text-white">
                    {notificationCount}
                  </span>
                )}
              </button>

              <FullscreenToggle />
              <ThemeToggle />
            </div>

            {/* Mobile More Menu */}
            <div className="md:hidden" ref={mobileDropdownRef}>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="p-2 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 rounded-full hover:bg-white/20 dark:hover:bg-slate-800/60 transition-colors"
              >
                <MoreVertical size={20} />
              </button>

              {mobileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-900 ring-1 ring-black/5 z-50">
                  {mobileMenuItems.map((item, index) => (
                    item.component ? (
                      <div key={index}>{item.component}</div>
                    ) : (
                      <div
                        key={index}
                        className="flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        onClick={() => handleMobileMenuItemClick(item.action)}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                        {item.badge && (
                          <span className="ml-auto bg-rose-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown Mobile screen */}
            <div className="relative z-9999999" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 p-1"
                id="user-menu-button"
                aria-expanded={dropdownOpen ? 'true' : 'false'}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 dark:border-slate-700/20">
                  {userAvatar ? (
                    <Image
                      src={userAvatar || "/placeholder.svg"}
                      alt={userName || ""}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                      {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-200">
                  {userName.split(" ")[0]}
                </span>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-slate-200 dark:divide-slate-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ROLE_DISPLAY_NAMES[userRole]}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} className="mr-3 text-slate-500 dark:text-slate-400" />
                      Your Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={16} className="mr-3 text-slate-500 dark:text-slate-400" />
                      Settings
                    </Link>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false)
                        logout()
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      role="menuitem"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

