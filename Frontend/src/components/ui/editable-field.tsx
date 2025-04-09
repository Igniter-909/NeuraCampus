"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  type?: "text" | "textarea"
}

export default function EditableField({
  value,
  fieldPath,
  onEdit,
  isAdmin,
  isEditing: isEditingProp,
  textClassName = "",
  isMultiline = false,
  placeholder = "Click to edit",
  type = "text"
}: EditableFieldProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(isEditingProp)
  const [currentValue, setCurrentValue] = useState(value || "")

  // Update currentValue when value prop changes
  useEffect(() => {
    setCurrentValue(value || "")
  }, [value])

  // Update isEditing state when isEditingProp changes
  useEffect(() => {
    setIsEditing(isEditingProp)
  }, [isEditingProp])

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setCurrentValue(newValue)
    onEdit(fieldPath, newValue)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      setIsEditing(false)
    }
    if (e.key === 'Escape') {
      setCurrentValue(value || "")
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
        type === "textarea" ? (
          <Textarea
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent outline-none border border-primary px-2 py-1 ${textClassName}`}
            placeholder={placeholder}
            autoFocus
            rows={4}
          />
        ) : (
          <Input
            type="text"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent outline-none border-b border-primary px-2 py-1 ${textClassName}`}
            placeholder={placeholder}
            autoFocus
          />
        )
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

