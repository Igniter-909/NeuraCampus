
"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Calendar, ExternalLink, CheckCircle, Edit, FileText, ChevronRight, Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

// Add interfaces for our data types
interface AppliedJob {
  id: number
  title: string
  company: string
  date: string
  status: string
  timeline: {
    stage: string
    status: 'completed' | 'in-progress' | 'pending'
    date?: string
  }[]
}

interface Activity {
  name: string
  role?: string
  description: string
  period: string
  certificate?: string
}

interface Hackathon {
  name: string
  description: string
  date: string
  certificate?: string
}

// Add interface for Experience
interface Experience {
  role: string
  company: string
  period: string
  description: string
  document?: string
}

// Add interface for Project
interface Project {
  title: string
  description: string
  tech: string[]
  link: string
}

// Sample applied jobs data with timeline
const appliedJobs: AppliedJob[] = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechStart Inc.",
      date: "Applied on March 15, 2025",
      status: "Under Review",
    timeline: [
      { stage: "Application Submitted", status: "completed", date: "March 15, 2025" },
      { stage: "HR Review", status: "in-progress", date: "March 16, 2025" },
      { stage: "Technical Assessment", status: "pending" },
      { stage: "Interview", status: "pending" },
      { stage: "Offer", status: "pending" }
    ]
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataViz Corp",
      date: "Applied on March 10, 2025",
      status: "Interview Scheduled",
    timeline: [
      { stage: "Application Submitted", status: "completed", date: "March 10, 2025" },
      { stage: "HR Review", status: "completed", date: "March 12, 2025" },
      { stage: "Technical Assessment", status: "completed", date: "March 13, 2025" },
      { stage: "Interview", status: "in-progress", date: "March 20, 2025" },
      { stage: "Offer", status: "pending" }
    ]
    },
    {
      id: 3,
      title: "UX/UI Design Intern",
      company: "CreativeMinds",
      date: "Applied on March 5, 2025",
      status: "Application Received",
    timeline: [
      { stage: "Application Submitted", status: "completed", date: "March 5, 2025" },
      { stage: "HR Review", status: "pending" },
      { stage: "Portfolio Review", status: "pending" },
      { stage: "Interview", status: "pending" },
      { stage: "Offer", status: "pending" }
    ]
  },
]

// Sample hackathons with certificates
const hackathons: Hackathon[] = [
  {
    name: "HackSF 2023",
    description: "Won 2nd place for developing an accessibility tool for visually impaired users.",
    date: "October 2023",
    certificate: "/certificates/hacksf-2023.pdf"
  },
  {
    name: "CodeJam 2022",
    description: "Participated in a 48-hour hackathon focused on AI solutions for healthcare.",
    date: "March 2022",
    certificate: "/certificates/codejam-2022.pdf"
  },
]

// Sample activities with certificates
const activities: Activity[] = [
  {
    name: "Computer Science Club",
    role: "President",
    description: "Organized weekly workshops and coding competitions for club members.",
    period: "2022 - Present",
    certificate: "/certificates/cs-club-leadership.pdf"
  },
  {
    name: "Volunteer Coding Instructor",
    role: "Instructor",
    description: "Taught basic programming concepts to underprivileged high school students.",
    period: "2021 - 2022",
    certificate: "/certificates/volunteer-teaching.pdf"
  },
]

// Sample experience data with documents
const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Tech Innovations Inc.",
    period: "May 2023 - Aug 2023",
    description:
      "Developed and maintained features for the company's main product using React and Node.js. Collaborated with the design team to implement responsive UI components.",
    document: "/documents/tech-innovations-internship.pdf"
  },
  {
    role: "Data Science Intern",
    company: "DataCorp",
    period: "Jun 2022 - Aug 2022",
    description:
      "Analyzed large datasets to extract meaningful insights. Built predictive models using Python and scikit-learn. Presented findings to stakeholders.",
    document: "/documents/datacorp-internship.pdf"
  },
  {
    role: "Web Development Intern",
    company: "WebSolutions",
    period: "May 2021 - Jul 2021",
    description:
      "Assisted in the development of client websites using HTML, CSS, and JavaScript. Implemented responsive designs and fixed cross-browser compatibility issues.",
    document: "/documents/websolutions-internship.pdf"
  },
]

export default function ProfilePage() {
  const [selectedJob, setSelectedJob] = useState<AppliedJob | null>(null)
  const [isTimelineOpen, setIsTimelineOpen] = useState(false)
  
  // Add state for editing sections
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editData, setEditData] = useState({
    about: "Final year Computer Science student at Stanford University with a passion for software development and machine learning. Looking for opportunities to apply my skills in a challenging environment. I have experience in web development, mobile app development, and data science through various projects and internships.",
    skills: {
      technical: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "TensorFlow", "SQL", "Git", "AWS", "Docker"],
      soft: ["Team Leadership", "Project Management", "Problem Solving", "Communication", "Time Management"]
    },
    experiences: experiences,
    activities: activities,
    hackathons: hackathons,
    projects: [
      {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform built with Next.js, Prisma, and Stripe integration.",
        tech: ["Next.js", "Prisma", "Stripe", "Tailwind CSS"],
        link: "#",
      },
      {
        title: "AI Image Generator",
        description: "An AI-powered image generation tool using OpenAI's DALL-E API.",
        tech: ["React", "OpenAI API", "Node.js", "Express"],
        link: "#",
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates.",
        tech: ["React", "Firebase", "Material UI", "Redux"],
        link: "#",
      },
    ] as Project[]
  })

  // Add state for individual item editing
  const [editingItem, setEditingItem] = useState<{
    section: string;
    index: number;
  } | null>(null)

  // Add state for adding new items
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [addDialogSection, setAddDialogSection] = useState<"experiences" | "projects" | "activities" | "hackathons" | null>(null)
  const [newItem, setNewItem] = useState<any>(null)

  // Function to handle edit mode toggle
  const toggleEdit = (section: string) => {
    setEditingSection(editingSection === section ? null : section)
  }

  // Function to handle save
  const handleSave = (section: string) => {
    // Here you would typically make an API call to save the changes
    setEditingSection(null)
  }

  // Function to handle cancel
  const handleCancel = (section: string) => {
    setEditingSection(null)
    // Reset editData to original values if needed
  }

  // Function to handle project tech array changes
  const handleProjectTechChange = (projectIndex: number, techString: string) => {
    const newProjects = [...editData.projects]
    newProjects[projectIndex] = {
      ...newProjects[projectIndex],
      tech: techString.split(",").map(s => s.trim())
    }
    setEditData({ ...editData, projects: newProjects })
  }

  // Function to handle individual item edit mode toggle
  const toggleItemEdit = (section: string, index: number) => {
    setEditingItem(editingItem?.section === section && editingItem?.index === index ? null : { section, index })
  }

  // Function to handle individual item save
  const handleItemSave = (section: string, index: number) => {
    setEditingItem(null)
  }

  // Function to handle individual item cancel
  const handleItemCancel = (section: string, index: number) => {
    setEditingItem(null)
  }

  // Function to handle adding new item
  const handleAddItem = (section: "experiences" | "projects" | "activities" | "hackathons") => {
    const newItem = {
      experiences: {
        role: "",
        company: "",
        period: "",
        description: "",
        document: ""
      },
      projects: {
        title: "",
        description: "",
        tech: [],
        link: ""
      },
      activities: {
        name: "",
        role: "",
        description: "",
        period: "",
        certificate: ""
      },
      hackathons: {
        name: "",
        description: "",
        date: "",
        certificate: ""
      }
    }[section]

    setNewItem(newItem)
    setAddDialogSection(section)
    setIsAddDialogOpen(true)
  }

  // Function to handle saving new item
  const handleSaveNewItem = () => {
    if (addDialogSection && newItem) {
      setEditData({
        ...editData,
        [addDialogSection]: [...editData[addDialogSection], newItem]
      })
      setIsAddDialogOpen(false)
      setAddDialogSection(null)
      setNewItem(null)
    }
  }

  // Function to handle canceling new item
  const handleCancelNewItem = () => {
    setIsAddDialogOpen(false)
    setAddDialogSection(null)
    setNewItem(null)
  }

  // Function to handle deleting item
  const handleDeleteItem = (section: "experiences" | "projects" | "activities" | "hackathons", index: number) => {
    const newItems = [...editData[section]]
    newItems.splice(index, 1)
    setEditData({
      ...editData,
      [section]: newItems
    })
    setEditingItem(null)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -right-20 h-64 w-64 rounded-3xl bg-blue-100/50 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/3 -left-20 h-72 w-72 rounded-3xl bg-blue-200/30 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-20 right-1/4 h-56 w-56 rounded-3xl bg-indigo-100/40 blur-xl"
        />

        {/* Decorative Squares */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              rotate: i % 2 === 0 ? 10 : -10,
              x: i % 3 === 0 ? [0, 10, 0] : i % 3 === 1 ? [0, -10, 0] : [0, 5, 0],
              y: i % 2 === 0 ? [0, -5, 0] : [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className={`absolute h-16 w-16 rounded-lg border border-blue-100 bg-white/30 backdrop-blur-sm`}
            style={{
              top: `${15 + i * 15}%`,
              left: `${5 + i * 15}%`,
              zIndex: 0,
            }}
          />
        ))}
      </div>

      <div className="relative">
        <div className="container relative px-4 md:px-6">
          {/* Combined Cover Image and Profile Box */}
          <div className="relative mt-8 overflow-hidden rounded-xl bg-white/60 dark:bg-gray-800/60 shadow-sm backdrop-blur-sm">
        {/* Cover Image */}
        <div className="relative h-[200px] md:h-[300px] w-full">
          <Image
            src="/placeholder.svg?height=300&width=1200"
            alt="Cover Image"
            fill
            className="object-cover"
            priority
          />
        </div>

            {/* Profile Content */}
            <div className="relative -mt-20 px-6 pb-6">
              <div className="flex flex-col items-center md:flex-row md:items-end md:space-x-6">
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-background bg-background shadow-xl"
            >
              <Image src="/placeholder.svg?height=160&width=160" alt="Profile Picture" fill className="object-cover" />
            </motion.div>

            {/* Name and Basic Info */}
            <div className="mt-4 flex flex-col items-center text-center md:items-start md:text-left">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold tracking-tight"
              >
                Alex Johnson
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                Computer Science Student
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-2 flex items-center space-x-2 text-muted-foreground"
              >
                    <MapPin className="h-4 w-4 text-blue-500" />
                <span>San Francisco, CA</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:ml-auto md:mt-0">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <Button variant="outline" size="sm" className="gap-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </Button>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <Button variant="outline" size="sm" className="gap-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </Button>
              </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                    <Button variant="outline" size="sm" className="gap-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Button>
              </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                    <Button variant="outline" size="sm" className="gap-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Button>
              </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section with Edit Button */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 rounded-xl bg-white/60 dark:bg-gray-800/60 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">About</h2>
              {editingSection === "about" ? (
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleSave("about")} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleCancel("about")} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => toggleEdit("about")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
            {editingSection === "about" ? (
              <Textarea
                value={editData.about}
                onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                className="mt-2 min-h-[100px]"
              />
            ) : (
              <p className="mt-2 text-muted-foreground">{editData.about}</p>
            )}
          </motion.section>

          {/* Skills Section with Edit Button */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-12 rounded-xl bg-white/60 dark:bg-gray-800/60 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
              {editingSection === "skills" ? (
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleSave("skills")} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleCancel("skills")} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => toggleEdit("skills")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="mt-6">
              <h3 className="mb-4 text-xl font-semibold">Technical Skills</h3>
              {editingSection === "skills" ? (
                <div className="space-y-4">
                  <div>
                    <Label>Technical Skills (comma-separated)</Label>
                    <Input
                      value={editData.skills.technical.join(", ")}
                      onChange={(e) => setEditData({
                        ...editData,
                        skills: {
                          ...editData.skills,
                          technical: e.target.value.split(",").map(s => s.trim())
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Soft Skills (comma-separated)</Label>
                    <Input
                      value={editData.skills.soft.join(", ")}
                      onChange={(e) => setEditData({
                        ...editData,
                        skills: {
                          ...editData.skills,
                          soft: e.target.value.split(",").map(s => s.trim())
                        }
                      })}
                    />
                  </div>
                </div>
              ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                  {editData.skills.technical.map((skill, index) => (
                  <motion.div key={skill} variants={fadeIn} custom={index}>
                    <Badge variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="mb-4 text-xl font-semibold">Soft Skills</h3>
              {!editingSection && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                  {editData.skills.soft.map((skill, index) => (
                    <motion.div key={skill} variants={fadeIn} custom={index}>
                      <Badge variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
              </motion.div>
              )}
            </div>
          </motion.section>

          {/* Projects Section with Edit Button */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mt-12 rounded-xl bg-white/60 dark:bg-gray-800/60 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleAddItem("projects")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Plus className="h-4 w-4" />
                </Button>
                {editingSection === "projects" ? (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => handleSave("projects")} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCancel("projects")} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => toggleEdit("projects")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {editingSection === "projects" ? (
              <div className="mt-6 space-y-6">
                {editData.projects.map((project, index) => (
                  <div key={index} className="space-y-4 rounded-lg border border-blue-100 bg-white/50 p-4">
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("projects", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={project.title}
                          onChange={(e) => {
                            const newProjects = [...editData.projects]
                            newProjects[index] = { ...project, title: e.target.value }
                            setEditData({ ...editData, projects: newProjects })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Link</Label>
                        <Input
                          value={project.link}
                          onChange={(e) => {
                            const newProjects = [...editData.projects]
                            newProjects[index] = { ...project, link: e.target.value }
                            setEditData({ ...editData, projects: newProjects })
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...editData.projects]
                          newProjects[index] = { ...project, description: e.target.value }
                          setEditData({ ...editData, projects: newProjects })
                        }}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        value={project.tech.join(", ")}
                        onChange={(e) => handleProjectTechChange(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {editData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full overflow-hidden backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">{project.title}</h4>
                          {editingItem?.section === "projects" && editingItem?.index === index ? (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleItemSave("projects", index)} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleItemCancel("projects", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <X className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("projects", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button variant="ghost" size="icon" onClick={() => toggleItemEdit("projects", index)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        {editingItem?.section === "projects" && editingItem?.index === index ? (
                          <div className="mt-2 space-y-2">
                            <Input
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...editData.projects]
                                newProjects[index] = { ...project, title: e.target.value }
                                setEditData({ ...editData, projects: newProjects })
                              }}
                            />
                            <Textarea
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...editData.projects]
                                newProjects[index] = { ...project, description: e.target.value }
                                setEditData({ ...editData, projects: newProjects })
                              }}
                            />
                            <Input
                              value={project.tech.join(", ")}
                              onChange={(e) => handleProjectTechChange(index, e.target.value)}
                              placeholder="Technologies (comma-separated)"
                            />
                            <Input
                              value={project.link}
                              onChange={(e) => {
                                const newProjects = [...editData.projects]
                                newProjects[index] = { ...project, link: e.target.value }
                                setEditData({ ...editData, projects: newProjects })
                              }}
                              placeholder="Project Link"
                            />
                          </div>
                        ) : (
                          <>
                      <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                        <Link href={project.link} className="flex items-center gap-1">
                          View Project
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                          </>
                        )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            )}
          </motion.section>

          {/* Experience Section with Edit Button */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="mt-12 rounded-xl bg-white/60 dark:bg-gray-800/60 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleAddItem("experiences")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Plus className="h-4 w-4" />
                </Button>
                {editingSection === "experiences" ? (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => handleSave("experiences")} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCancel("experiences")} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => toggleEdit("experiences")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {editingSection === "experiences" ? (
              <div className="mt-6 space-y-6">
                {editData.experiences.map((exp, index) => (
                  <div key={index} className="space-y-4 rounded-lg border border-blue-100 bg-white/50 p-4">
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("experiences", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Role</Label>
                        <Input
                          value={exp.role}
                          onChange={(e) => {
                            const newExperiences = [...editData.experiences]
                            newExperiences[index] = { ...exp, role: e.target.value }
                            setEditData({ ...editData, experiences: newExperiences })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => {
                            const newExperiences = [...editData.experiences]
                            newExperiences[index] = { ...exp, company: e.target.value }
                            setEditData({ ...editData, experiences: newExperiences })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Period</Label>
                        <Input
                          value={exp.period}
                          onChange={(e) => {
                            const newExperiences = [...editData.experiences]
                            newExperiences[index] = { ...exp, period: e.target.value }
                            setEditData({ ...editData, experiences: newExperiences })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Document URL</Label>
                        <Input
                          value={exp.document || ""}
                          onChange={(e) => {
                            const newExperiences = [...editData.experiences]
                            newExperiences[index] = { ...exp, document: e.target.value }
                            setEditData({ ...editData, experiences: newExperiences })
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => {
                          const newExperiences = [...editData.experiences]
                          newExperiences[index] = { ...exp, description: e.target.value }
                          setEditData({ ...editData, experiences: newExperiences })
                        }}
                        className="mt-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6 space-y-6"
            >
                {editData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  custom={index}
                  className="relative border-l border-blue-200 pl-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 * index, duration: 0.4 }}
                    viewport={{ once: true }}
                      className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-background bg-blue-500"
                  />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold">{exp.role}</h4>
                          {editingItem?.section === "experiences" && editingItem?.index === index ? (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleItemSave("experiences", index)} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleItemCancel("experiences", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <X className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("experiences", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button variant="ghost" size="icon" onClick={() => toggleItemEdit("experiences", index)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-blue-500" />
                      {exp.period}
                    </span>
                  </div>
                        {editingItem?.section === "experiences" && editingItem?.index === index ? (
                          <div className="mt-2 space-y-2">
                            <Input
                              value={exp.role}
                              onChange={(e) => {
                                const newExperiences = [...editData.experiences]
                                newExperiences[index] = { ...exp, role: e.target.value }
                                setEditData({ ...editData, experiences: newExperiences })
                              }}
                            />
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const newExperiences = [...editData.experiences]
                                newExperiences[index] = { ...exp, company: e.target.value }
                                setEditData({ ...editData, experiences: newExperiences })
                              }}
                            />
                            <Input
                              value={exp.period}
                              onChange={(e) => {
                                const newExperiences = [...editData.experiences]
                                newExperiences[index] = { ...exp, period: e.target.value }
                                setEditData({ ...editData, experiences: newExperiences })
                              }}
                            />
                            <Textarea
                              value={exp.description}
                              onChange={(e) => {
                                const newExperiences = [...editData.experiences]
                                newExperiences[index] = { ...exp, description: e.target.value }
                                setEditData({ ...editData, experiences: newExperiences })
                              }}
                            />
                            <Input
                              value={exp.document || ""}
                              onChange={(e) => {
                                const newExperiences = [...editData.experiences]
                                newExperiences[index] = { ...exp, document: e.target.value }
                                setEditData({ ...editData, experiences: newExperiences })
                              }}
                              placeholder="Document URL"
                            />
                          </div>
                        ) : (
                  <p className="mt-2 text-sm">{exp.description}</p>
                        )}
                      </div>
                      {exp.document && (
                        <Button variant="ghost" size="icon" className="ml-4 text-blue-500 hover:text-blue-600" asChild>
                          <Link href={exp.document} target="_blank" className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Document</span>
                          </Link>
                        </Button>
                      )}
                    </div>
                </motion.div>
              ))}
            </motion.div>
            )}
          </motion.section>

          {/* Activities Section with Edit Button */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            className="mt-12 rounded-xl bg-white/60 dark:bg-gray-800/60 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Activities</h2>
              {editingSection === "activities" ? (
                <>
                  <Button variant="ghost" size="icon" onClick={() => handleSave("activities")} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleCancel("activities")} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => toggleEdit("activities")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Hackathons</h3>
                  <Button variant="ghost" size="icon" onClick={() => handleAddItem("hackathons")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {editingSection === "activities" ? (
                  <div className="space-y-4">
                    {editData.hackathons.map((hackathon, index) => (
                      <div key={index} className="space-y-4 rounded-lg border border-blue-100 bg-white/50 p-4">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("hackathons", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={hackathon.name}
                              onChange={(e) => {
                                const newHackathons = [...editData.hackathons]
                                newHackathons[index] = { ...hackathon, name: e.target.value }
                                setEditData({ ...editData, hackathons: newHackathons })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Date</Label>
                            <Input
                              value={hackathon.date}
                              onChange={(e) => {
                                const newHackathons = [...editData.hackathons]
                                newHackathons[index] = { ...hackathon, date: e.target.value }
                                setEditData({ ...editData, hackathons: newHackathons })
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={hackathon.description}
                            onChange={(e) => {
                              const newHackathons = [...editData.hackathons]
                              newHackathons[index] = { ...hackathon, description: e.target.value }
                              setEditData({ ...editData, hackathons: newHackathons })
                            }}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Certificate URL</Label>
                          <Input
                            value={hackathon.certificate || ""}
                            onChange={(e) => {
                              const newHackathons = [...editData.hackathons]
                              newHackathons[index] = { ...hackathon, certificate: e.target.value }
                              setEditData({ ...editData, hackathons: newHackathons })
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                    {editData.hackathons.map((hackathon, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      custom={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      className="rounded-lg border border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-800/50 p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{hackathon.name}</h4>
                          <div className="flex items-center gap-2">
                        <Badge variant="outline" className="dark:bg-gray-700 dark:text-gray-300">{hackathon.date}</Badge>
                            {editingItem?.section === "hackathons" && editingItem?.index === index ? (
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => handleItemSave("hackathons", index)} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleItemCancel("hackathons", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                  <X className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("hackathons", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                      </div>
                            ) : (
                              <Button variant="ghost" size="icon" onClick={() => toggleItemEdit("hackathons", index)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        {editingItem?.section === "hackathons" && editingItem?.index === index ? (
                          <div className="mt-2 space-y-2">
                            <Input
                              value={hackathon.name}
                              onChange={(e) => {
                                const newHackathons = [...editData.hackathons]
                                newHackathons[index] = { ...hackathon, name: e.target.value }
                                setEditData({ ...editData, hackathons: newHackathons })
                              }}
                            />
                            <Input
                              value={hackathon.date}
                              onChange={(e) => {
                                const newHackathons = [...editData.hackathons]
                                newHackathons[index] = { ...hackathon, date: e.target.value }
                                setEditData({ ...editData, hackathons: newHackathons })
                              }}
                            />
                            <Textarea
                              value={hackathon.description}
                              onChange={(e) => {
                                const newHackathons = [...editData.hackathons]
                                newHackathons[index] = { ...hackathon, description: e.target.value }
                                setEditData({ ...editData, hackathons: newHackathons })
                              }}
                            />
                            <Input
                              value={hackathon.certificate || ""}
                              onChange={(e) => {
                                const newHackathons = [...editData.hackathons]
                                newHackathons[index] = { ...hackathon, certificate: e.target.value }
                                setEditData({ ...editData, hackathons: newHackathons })
                              }}
                              placeholder="Certificate URL"
                            />
                          </div>
                        ) : (
                          <>
                      <p className="mt-2 text-sm text-muted-foreground dark:text-gray-300">{hackathon.description}</p>
                            {hackathon.certificate && (
                              <Button variant="link" className="mt-2 h-auto p-0 text-sm text-blue-500 hover:text-blue-600" asChild>
                                <Link href={hackathon.certificate} target="_blank" className="flex items-center gap-1">
                                  View Certificate
                                  <FileText className="h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                          </>
                        )}
                    </motion.div>
                  ))}
                </motion.div>
                )}
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Extracurricular Activities</h3>
                  <Button variant="ghost" size="icon" onClick={() => handleAddItem("activities")} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {editingSection === "activities" ? (
                  <div className="space-y-4">
                    {editData.activities.map((activity, index) => (
                      <div key={index} className="space-y-4 rounded-lg border border-blue-100 bg-white/50 p-4">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("activities", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={activity.name}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, name: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Role</Label>
                            <Input
                              value={activity.role || ""}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, role: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Period</Label>
                            <Input
                              value={activity.period}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, period: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Certificate URL</Label>
                            <Input
                              value={activity.certificate || ""}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, certificate: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={activity.description}
                            onChange={(e) => {
                              const newActivities = [...editData.activities]
                              newActivities[index] = { ...activity, description: e.target.value }
                              setEditData({ ...editData, activities: newActivities })
                            }}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                    {editData.activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      custom={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      className="rounded-lg border border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-800/50 p-4 backdrop-blur-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-medium dark:text-gray-100">{activity.name}</h4>
                          <div className="flex items-center gap-2">
                        <Badge className="dark:bg-blue-900 dark:text-blue-200">{activity.role}</Badge>
                            {editingItem?.section === "activities" && editingItem?.index === index ? (
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => handleItemSave("activities", index)} className="text-green-500 hover:text-green-600 hover:bg-green-50">
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleItemCancel("activities", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                  <X className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteItem("activities", index)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button variant="ghost" size="icon" onClick={() => toggleItemEdit("activities", index)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground dark:text-gray-300">{activity.period}</p>
                        {editingItem?.section === "activities" && editingItem?.index === index ? (
                          <div className="mt-2 space-y-2">
                            <Input
                              value={activity.name}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, name: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                            />
                            <Input
                              value={activity.role || ""}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, role: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                              placeholder="Role"
                            />
                            <Input
                              value={activity.period}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, period: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                            />
                            <Textarea
                              value={activity.description}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, description: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                            />
                            <Input
                              value={activity.certificate || ""}
                              onChange={(e) => {
                                const newActivities = [...editData.activities]
                                newActivities[index] = { ...activity, certificate: e.target.value }
                                setEditData({ ...editData, activities: newActivities })
                              }}
                              placeholder="Certificate URL"
                            />
                          </div>
                        ) : (
                          <>
                      <p className="mt-2 text-sm dark:text-gray-300">{activity.description}</p>
                            {activity.certificate && (
                              <Button variant="link" className="mt-2 h-auto p-0 text-sm text-blue-500 hover:text-blue-600" asChild>
                                <Link href={activity.certificate} target="_blank" className="flex items-center gap-1">
                                  View Certificate
                                  <FileText className="h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                          </>
                        )}
                    </motion.div>
                  ))}
                </motion.div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Applied Jobs Section with Timeline */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            className="mt-12 rounded-xl bg-white/60 dark:bg-gray-800/60 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Applied Jobs</h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6 space-y-4"
            >
              {appliedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="flex flex-col justify-between rounded-lg border border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center"
                >
                  <div>
                    <h4 className="font-medium dark:text-gray-100">{job.title}</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">{job.company}</p>
                    <p className="mt-1 text-xs text-muted-foreground dark:text-gray-400">{job.date}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 sm:mt-0">
                    <Badge
                      variant={
                        job.status === "Interview Scheduled"
                          ? "default"
                          : job.status === "Under Review"
                            ? "secondary"
                            : "outline"
                      }
                      className="flex items-center gap-1 dark:bg-blue-900 dark:text-blue-200"
                    >
                      <CheckCircle className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                      {job.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => {
                        setSelectedJob(job)
                        setIsTimelineOpen(true)
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Application Timeline Dialog */}
          <Dialog open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Application Timeline</DialogTitle>
                <DialogDescription>
                  {selectedJob?.title} at {selectedJob?.company}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                {selectedJob?.timeline.map((stage, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background">
                      {stage.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : stage.status === 'in-progress' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{stage.stage}</h4>
                      {stage.date && (
                        <p className="text-sm text-muted-foreground">{stage.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Item Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New {addDialogSection?.charAt(0).toUpperCase()}{addDialogSection?.slice(1)}</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new {addDialogSection?.slice(0, -1)}.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                {addDialogSection === "projects" && newItem && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={newItem.title}
                          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Link</Label>
                        <Input
                          value={newItem.link}
                          onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        value={newItem.tech.join(", ")}
                        onChange={(e) => setNewItem({
                          ...newItem,
                          tech: e.target.value.split(",").map(s => s.trim())
                        })}
                      />
                    </div>
                  </>
                )}

                {addDialogSection === "experiences" && newItem && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Role</Label>
                        <Input
                          value={newItem.role}
                          onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={newItem.company}
                          onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Period</Label>
                        <Input
                          value={newItem.period}
                          onChange={(e) => setNewItem({ ...newItem, period: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Document URL</Label>
                        <Input
                          value={newItem.document}
                          onChange={(e) => setNewItem({ ...newItem, document: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </>
                )}

                {(addDialogSection === "activities" || addDialogSection === "hackathons") && newItem && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                      </div>
                      {addDialogSection === "activities" && (
                        <div>
                          <Label>Role</Label>
                          <Input
                            value={newItem.role}
                            onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                          />
                        </div>
                      )}
                      <div>
                        <Label>{addDialogSection === "activities" ? "Period" : "Date"}</Label>
                        <Input
                          value={addDialogSection === "activities" ? newItem.period : newItem.date}
                          onChange={(e) => setNewItem({
                            ...newItem,
                            [addDialogSection === "activities" ? "period" : "date"]: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label>Certificate URL</Label>
                        <Input
                          value={newItem.certificate}
                          onChange={(e) => setNewItem({ ...newItem, certificate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCancelNewItem}>Cancel</Button>
                <Button onClick={handleSaveNewItem}>Add {addDialogSection?.slice(0, -1)}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Jobs Link */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="my-12 flex justify-center"
          >
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white" asChild>
              <Link href="/student/academics/portal/jobs">View More Job Listings</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


