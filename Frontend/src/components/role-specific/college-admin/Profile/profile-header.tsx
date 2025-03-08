import Image from "next/image"
import type { CollegeData } from "@/lib/data"
import EditableField from "@/components/ui/editable-field"
import { Camera } from "lucide-react"

interface ProfileHeaderProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: any) => void
  editingField: string | null
}

export default function ProfileHeader({ data, isAdmin, onEdit, editingField }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full relative group">
        <Image
          src={data.coverImage || "/placeholder.svg?height=400&width=1200"}
          alt="College Cover"
          className="object-cover"
          fill
          priority
        />

        {isAdmin && (
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div
              className="bg-white rounded-full p-2 cursor-pointer"
              onClick={() => {
                const newUrl = prompt("Enter new cover image URL:", data.coverImage)
                if (newUrl) onEdit("coverImage", newUrl)
              }}
            >
              <Camera className="h-6 w-6 text-[#0a66c2]" />
            </div>
          </div>
        )}
      </div>

      {/* Logo and College Name */}
      <div className="px-6 pb-6 pt-16 relative">
        <div className="absolute -top-16 left-6 h-24 w-24 rounded-xl overflow-hidden border-4 border-white bg-white shadow-md group">
          <Image
            src={data.logo || "/placeholder.svg?height=100&width=100"}
            alt="College Logo"
            className="object-contain"
            fill
          />

          {isAdmin && (
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div
                className="bg-white rounded-full p-1 cursor-pointer"
                onClick={() => {
                  const newUrl = prompt("Enter new logo URL:", data.logo)
                  if (newUrl) onEdit("logo", newUrl)
                }}
              >
                <Camera className="h-4 w-4 text-[#0a66c2]" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-3xl font-bold text-[#333333]">
            <EditableField
              value={data.name}
              fieldPath="name"
              onEdit={onEdit}
              isAdmin={isAdmin}
              isEditing={editingField === "name"}
              textClassName="text-3xl font-bold"
            />
          </h1>

          <p className="text-lg text-muted-foreground mt-1">
            <EditableField
              value={data.tagline}
              fieldPath="tagline"
              onEdit={onEdit}
              isAdmin={isAdmin}
              isEditing={editingField === "tagline"}
              textClassName="text-lg text-muted-foreground"
            />
          </p>
        </div>
      </div>
    </div>
  )
}

