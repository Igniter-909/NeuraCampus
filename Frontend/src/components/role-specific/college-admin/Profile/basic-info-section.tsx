import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "@/components/ui/editable-field"
import { Separator } from "@/components/ui/separator"
import { Building2, Calendar, MapPin, Award, Phone, Mail, Globe, Linkedin, Twitter, Instagram } from "lucide-react"

interface BasicInfoSectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: string | number) => void
  editingField: string | null
}

export default function BasicInfoSection({ data, isAdmin, onEdit, editingField }: BasicInfoSectionProps) {
  return (
    <Card className="dark:bg-slate-900 dark:border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold dark:text-gray-100">
          <Building2 className="h-5 w-5 text-[#0a66c2]" />
          College Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 dark:text-gray-400">Basic Details</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <span className="font-medium text-sm shrink-0 dark:text-gray-300">Established:</span>
              <EditableField
                value={data.established}
                fieldPath="established"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "established"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <span className="font-medium text-sm shrink-0 dark:text-gray-300">Location:</span>
              <EditableField
                value={data.location}
                fieldPath="location"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "location"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <span className="font-medium text-sm shrink-0 dark:text-gray-300">Accreditations:</span>
              <EditableField
                value={data.accreditations}
                fieldPath="accreditations"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "accreditations"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>
          </div>
        </div>

        <Separator className="dark:bg-slate-700" />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 dark:text-gray-400">Contact Information</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.contact.phone}
                fieldPath="contact.phone"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "contact.phone"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.contact.email}
                fieldPath="contact.email"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "contact.email"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.contact.website}
                fieldPath="contact.website"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "contact.website"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>
          </div>
        </div>

        <Separator className="dark:bg-slate-700" />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 dark:text-gray-400">Social Media</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.socialMedia.linkedin}
                fieldPath="socialMedia.linkedin"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "socialMedia.linkedin"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <Twitter className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.socialMedia.twitter}
                fieldPath="socialMedia.twitter"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "socialMedia.twitter"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.socialMedia.instagram}
                fieldPath="socialMedia.instagram"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "socialMedia.instagram"}
                textClassName="text-sm dark:text-gray-300"
              />
            </div>
          </div>
        </div>

        <Separator className="dark:bg-slate-700" />

        <div className="pt-2">
          <a
            href={data.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white py-2 px-4 rounded text-center block font-medium"
          >
            Apply Now
          </a>

          {isAdmin && (
            <div className="mt-2">
              <EditableField
                value={data.applyUrl}
                fieldPath="applyUrl"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "applyUrl"}
                textClassName="text-xs text-muted-foreground dark:text-gray-400"
                placeholder="Set application URL"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

