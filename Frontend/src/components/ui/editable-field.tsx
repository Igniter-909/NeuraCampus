"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Edit } from "lucide-react"

export interface EditableFieldProps {
  value: string
  fieldPath: string
  onEdit: (fieldPath: string, value: string) => void
  isAdmin: boolean
  isEditing: boolean
  textClassName?: string
  isMultiline?: boolean
  placeholder?: string
}

export default function EditableField({
  value,
  fieldPath,
  onEdit,
  isAdmin,
  isEditing: isEditingProp,
  textClassName = "",
  isMultiline = false,
  placeholder = "Click to edit"
}: EditableFieldProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(isEditingProp)
  const [currentValue, setCurrentValue] = useState(value)

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCurrentValue(newValue)
    onEdit(fieldPath, newValue)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
    if (e.key === 'Escape') {
      setCurrentValue(value)
      setIsEditing(false)
    }
  }

  return (
    <div 
      className={`group relative ${isAdmin ? 'cursor-text' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent outline-none border-b border-primary px-2 py-1 ${textClassName}`}
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <span className={`block px-2 py-1 rounded transition-colors ${textClassName} ${
          isAdmin && isHovered ? 'bg-primary/5' : ''
        }`}>
          {currentValue || placeholder}
        </span>
      )}
      {isAdmin && isHovered && !isEditing && (
        <div className="absolute inset-0 pointer-events-none border border-primary/10 rounded" />
      )}
    </div>
  )
}

