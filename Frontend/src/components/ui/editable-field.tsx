"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

interface EditableFieldProps {
  value: string
  fieldPath: string
  onEdit: (fieldPath: string, value: string) => void
  isAdmin: boolean
  isEditing: boolean
  type?: "input" | "textarea"
  className?: string
  placeholder?: string
  textClassName?: string
}

export default function EditableField({
  value,
  fieldPath,
  onEdit,
  isAdmin,
  isEditing,
  type = "input",
  className = "",
  placeholder = "Click to edit",
  textClassName = "",
}: EditableFieldProps) {
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value)
    onEdit(fieldPath, e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && type === "input") {
      e.preventDefault()
      inputRef.current?.blur()
    }
  }

  if (isEditing) {
    if (type === "textarea") {
      return (
        <Textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn("w-full", className)}
          placeholder={placeholder}
          rows={4}
        />
      )
    }

    return (
      <Input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn("w-full", className)}
        placeholder={placeholder}
      />
    )
  }

  return (
    <div
      className={cn("group relative", isAdmin && "cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1")}
      onClick={isAdmin ? () => onEdit(fieldPath, value) : undefined}
    >
      <div className={cn("min-h-[1.5rem]", textClassName)}>
        {value || <span className="text-gray-400">{placeholder}</span>}
      </div>

      {isAdmin && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Pencil className="h-4 w-4 text-gray-400" />
        </div>
      )}
    </div>
  )
}

