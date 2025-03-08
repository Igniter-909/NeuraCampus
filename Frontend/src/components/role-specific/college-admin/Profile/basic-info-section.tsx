import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "@/components/ui/editable-field"
import { Separator } from "@/components/ui/separator"
import { Building2, Calendar, MapPin, Award, Phone, Mail, Globe, Linkedin, Twitter, Instagram } from "lucide-react"

interface BasicInfoSectionProps {
  data: CollegeData
  isAdmin: boolean
  onEdit: (fieldPath: string, value: any) => void
  editingField: string | null
}

export default function BasicInfoSection({ data, isAdmin, onEdit, editingField }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Building2 className="h-5 w-5 text-[#0a66c2]" />
          College Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Details</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <span className="font-medium text-sm shrink-0">Established:</span>
              <EditableField
                value={data.established}
                fieldPath="established"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "established"}
                textClassName="text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <span className="font-medium text-sm shrink-0">Location:</span>
              <EditableField
                value={data.location}
                fieldPath="location"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "location"}
                textClassName="text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <span className="font-medium text-sm shrink-0">Accreditations:</span>
              <EditableField
                value={data.accreditations}
                fieldPath="accreditations"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "accreditations"}
                textClassName="text-sm"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.contact.phone}
                fieldPath="contact.phone"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "contact.phone"}
                textClassName="text-sm"
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
                textClassName="text-sm"
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
                textClassName="text-sm"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Social Media</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-[#0a66c2] shrink-0" />
              <EditableField
                value={data.socialMedia.linkedin}
                fieldPath="socialMedia.linkedin"
                onEdit={onEdit}
                isAdmin={isAdmin}
                isEditing={editingField === "socialMedia.linkedin"}
                textClassName="text-sm"
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
                textClassName="text-sm"
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
                textClassName="text-sm"
              />
            </div>
          </div>
        </div>

        <Separator />

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
                textClassName="text-xs text-muted-foreground"
                placeholder="Set application URL"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

