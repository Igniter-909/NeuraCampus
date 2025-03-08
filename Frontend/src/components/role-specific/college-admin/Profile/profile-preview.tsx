import Image from "next/image"
import type { CollegeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Calendar,
  MapPin,
  Award,
  Phone,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  BookOpen,
  Users,
  User,
  GraduationCap,
  Library,
  Home,
  FlaskRoundIcon as Flask,
  Trophy,
} from "lucide-react"

interface ProfilePreviewProps {
  collegeData: CollegeData
}

export default function ProfilePreview({ collegeData }: ProfilePreviewProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative rounded-xl overflow-hidden bg-white">
        {/* Cover Image */}
        <div className="h-64 w-full relative">
          <Image
            src={collegeData.coverImage || "/placeholder.svg?height=400&width=1200"}
            alt="College Cover"
            className="object-cover"
            fill
            priority
          />
        </div>

        {/* Logo and College Name */}
        <div className="px-6 pb-6 pt-16 relative">
          <div className="absolute -top-16 left-6 h-24 w-24 rounded-xl overflow-hidden border-4 border-white bg-white shadow-md">
            <Image
              src={collegeData.logo || "/placeholder.svg?height=100&width=100"}
              alt="College Logo"
              className="object-contain"
              fill
            />
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold text-[#333333]">{collegeData.name || "College Name"}</h1>
            <p className="text-lg text-muted-foreground">{collegeData.tagline || "College Tagline"}</p>
          </div>
        </div>
      </div>

      {/* Basic Info and Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#0056b3]" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0056b3]" />
              <span className="font-medium">Established:</span>
              <span>{collegeData.established || "Year"}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#0056b3]" />
              <span className="font-medium">Location:</span>
              <span>{collegeData.location || "Location"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#0056b3]" />
              <span className="font-medium">Accreditations:</span>
              <span>{collegeData.accreditations || "Accreditations"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#0056b3]" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#0056b3]" />
              <span>{collegeData.contact.phone || "Phone Number"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#0056b3]" />
              <span>{collegeData.contact.email || "Email Address"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#0056b3]" />
              <span>{collegeData.contact.website || "Website URL"}</span>
            </div>

            <Separator />

            <div className="flex items-center gap-4 pt-2">
              <a
                href={collegeData.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0056b3] hover:text-[#003d80]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={collegeData.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0056b3] hover:text-[#003d80]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={collegeData.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0056b3] hover:text-[#003d80]"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#0056b3]" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#333333] whitespace-pre-line">
            {collegeData.about || "College description goes here..."}
          </p>
        </CardContent>
      </Card>

      {/* Departments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#0056b3]" />
            Departments & Branches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegeData.departments.map((dept, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-[#0056b3] text-white p-4">
                  <CardTitle className="text-lg">{dept.name || "Department Name"}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#0056b3]" />
                    <span className="font-medium">HOD:</span>
                    <span>{dept.hod || "Head of Department"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0056b3]" />
                    <span className="font-medium">Faculty:</span>
                    <span>{dept.teachers || 0} Teachers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#0056b3]" />
                    <span className="font-medium">Students:</span>
                    <span>{dept.students || 0} Students</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#0056b3]" />
                    <span className="font-medium">Programs:</span>
                    <span>{dept.programs || "Programs Offered"}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Faculty & Staff */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#0056b3]" />
            Faculty & Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegeData.faculty.map((faculty, index) => (
              <div key={index} className="flex flex-col p-4 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-[#f4f4f4] flex items-center justify-center mb-3">
                  <User className="h-8 w-8 text-[#0056b3]" />
                </div>
                <h3 className="text-lg font-semibold">{faculty.name || "Faculty Name"}</h3>
                <p className="text-[#0056b3]">{faculty.position || "Position"}</p>
                <p className="text-sm text-muted-foreground">{faculty.specialization || "Specialization"}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0056b3]" />
            Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collegeData.facilities.map((facility, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                {facility.name.toLowerCase().includes("library") ? (
                  <Library className="h-6 w-6 text-[#0056b3]" />
                ) : facility.name.toLowerCase().includes("hostel") ? (
                  <Home className="h-6 w-6 text-[#0056b3]" />
                ) : facility.name.toLowerCase().includes("lab") ? (
                  <Flask className="h-6 w-6 text-[#0056b3]" />
                ) : (
                  <Building2 className="h-6 w-6 text-[#0056b3]" />
                )}
                <div>
                  <h3 className="font-semibold">{facility.name || "Facility Name"}</h3>
                  <p className="text-sm text-muted-foreground">{facility.description || "Facility Description"}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#0056b3]" />
            Achievements & Recognitions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {collegeData.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <Badge className="bg-[#0056b3] h-6 w-6 flex items-center justify-center rounded-full p-0">
                  {index + 1}
                </Badge>
                <span>{achievement || "Achievement description"}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-[#ff9800] hover:bg-[#e68a00] text-white px-8 py-6 text-lg">Apply Now</Button>
        <Button
          variant="outline"
          className="border-[#0056b3] text-[#0056b3] hover:bg-[#0056b3] hover:text-white px-8 py-6 text-lg"
        >
          Visit Website
        </Button>
      </div>
    </div>
  )
}

