"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, Calendar, Clock, DollarSign, MapPin, Search, X, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  duration?: string
  salary: string
  posted: string
  description: string
  requirements: string[]
  responsibilities: string[]
  tags: string[]
}

// Sample job data
const jobsData: Job[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechStart Inc.",
    location: "San Francisco, CA",
    type: "Internship",
    duration: "3 months",
    salary: "$25/hour",
    posted: "2 days ago",
    description:
      "We're looking for a passionate Frontend Developer Intern to join our team. You'll work on real projects using React, Next.js, and TypeScript under the guidance of senior developers.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Knowledge of HTML, CSS, and JavaScript",
      "Familiarity with React is a plus",
      "Strong problem-solving skills",
      "Ability to work in a team environment",
    ],
    responsibilities: [
      "Develop and maintain frontend components",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, efficient, and maintainable code",
      "Participate in code reviews and team meetings",
      "Learn and grow as a developer",
    ],
    tags: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataViz Corp",
    location: "Remote",
    type: "Internship",
    duration: "6 months",
    salary: "$28/hour",
    posted: "1 week ago",
    description:
      "Join our data science team to analyze large datasets and build predictive models. You'll work with experienced data scientists on real-world problems.",
    requirements: [
      "Currently pursuing a degree in Computer Science, Statistics, or related field",
      "Strong knowledge of Python and data analysis libraries",
      "Experience with machine learning concepts",
      "Good understanding of statistics",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Clean and preprocess data for analysis",
      "Build and evaluate machine learning models",
      "Visualize data and communicate findings",
      "Collaborate with cross-functional teams",
      "Document your work and methodologies",
    ],
    tags: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "GrowthTech",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000/year",
    posted: "3 days ago",
    description:
      "We're seeking a talented Software Engineer to join our growing team. You'll be responsible for developing and maintaining our core product features.",
    requirements: [
      "Bachelor's degree in Computer Science or equivalent experience",
      "2+ years of experience in software development",
      "Proficiency in JavaScript and TypeScript",
      "Experience with React and Node.js",
      "Knowledge of database systems and API design",
    ],
    responsibilities: [
      "Design and implement new features",
      "Maintain and improve existing codebase",
      "Collaborate with product and design teams",
      "Write unit and integration tests",
      "Participate in agile development processes",
    ],
    tags: ["JavaScript", "TypeScript", "React", "Node.js", "Full Stack"],
  },
  {
    id: 4,
    title: "UX/UI Design Intern",
    company: "CreativeMinds",
    location: "Austin, TX",
    type: "Internship",
    duration: "4 months",
    salary: "$22/hour",
    posted: "5 days ago",
    description:
      "Join our design team to create beautiful and functional user interfaces. You'll work on real projects and learn from experienced designers.",
    requirements: [
      "Currently pursuing a degree in Design, HCI, or related field",
      "Portfolio demonstrating UI/UX projects",
      "Proficiency with design tools like Figma or Adobe XD",
      "Understanding of design principles and user-centered design",
      "Good communication skills",
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Participate in design critiques and iterations",
      "Document design decisions and guidelines",
    ],
    tags: ["UI/UX", "Figma", "Wireframing", "User Research"],
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "ServerStack",
    location: "Seattle, WA",
    type: "Part-time",
    salary: "$95,000 - $130,000/year",
    posted: "1 week ago",
    description:
      "We're looking for a Backend Developer to build and maintain our server infrastructure and APIs. You'll work with a team of experienced developers to create scalable solutions.",
    requirements: [
      "Bachelor's degree in Computer Science or equivalent experience",
      "3+ years of experience in backend development",
      "Proficiency in Node.js, Python, or Java",
      "Experience with databases (SQL and NoSQL)",
      "Knowledge of RESTful API design and microservices",
    ],
    responsibilities: [
      "Design and implement backend services",
      "Optimize application performance",
      "Ensure data security and integrity",
      "Write comprehensive documentation",
      "Collaborate with frontend developers",
    ],
    tags: ["Node.js", "Python", "Databases", "API Design", "Backend"],
  },
  {
    id: 6,
    title: "Mobile App Development Intern",
    company: "AppWorks",
    location: "Chicago, IL",
    type: "Internship",
    duration: "6 months",
    salary: "$26/hour",
    posted: "3 days ago",
    description:
      "Join our mobile development team to build innovative iOS and Android applications. You'll learn about the entire mobile development lifecycle.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Knowledge of Swift, Kotlin, or React Native",
      "Understanding of mobile UI/UX principles",
      "Familiarity with version control systems",
      "Passion for mobile technology",
    ],
    responsibilities: [
      "Develop and test mobile application features",
      "Fix bugs and improve application performance",
      "Collaborate with designers and backend developers",
      "Participate in code reviews",
      "Stay updated with mobile development trends",
    ],
    tags: ["iOS", "Android", "React Native", "Mobile Development"],
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  const [filter, setFilter] = useState("all")

  // Filter jobs based on search term and filter type
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filter === "all") return matchesSearch
    if (filter === "internship") return matchesSearch && job.type === "Internship"
    if (filter === "fulltime") return matchesSearch && job.type === "Full-time"
    if (filter === "parttime") return matchesSearch && job.type === "Part-time"

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Job & Internship Listings</h1>
          <p className="mt-2 text-muted-foreground">
            Find your next opportunity and take your career to the next level
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500 dark:text-blue-400" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              className="pl-10 bg-background/50 dark:bg-background/80 backdrop-blur-sm border-input focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background/80 dark:bg-background/90 backdrop-blur-sm">
                <DropdownMenuItem
                  onClick={() => setFilter("all")}
                  className={`cursor-pointer ${
                    filter === "all" ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" : "text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  }`}
                >
                  All Jobs
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("internship")}
                  className={`cursor-pointer ${
                    filter === "internship" ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" : "text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  }`}
                >
                  Internships
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("fulltime")}
                  className={`cursor-pointer ${
                    filter === "fulltime" ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" : "text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  }`}
                >
                  Full Time
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("parttime")}
                  className={`cursor-pointer ${
                    filter === "parttime" ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" : "text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  }`}
                >
                  Part Time
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className={searchTerm ? "visible text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50" : "invisible"}
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Job Listings Grid */}
          <div className="flex-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full transition-all hover:shadow-md bg-card/50 dark:bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <Badge variant={job.type === "Internship" ? "secondary" : "default"}>{job.type}</Badge>
                        </div>
                        <div className="text-lg font-medium">{job.company}</div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4 text-blue-500 dark:text-blue-400" />
                          {job.location}
                        </div>
                        {job.duration && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4 text-blue-500 dark:text-blue-400" />
                            {job.duration}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="mr-1 h-4 w-4 text-blue-500 dark:text-blue-400" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4 text-blue-500 dark:text-blue-400" />
                          Posted {job.posted}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-1">
                          {job.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setSelectedJob(job)} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                          View Details
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedJob(job)
                            setApplyDialogOpen(true)
                          }}
                          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                        >
                          Apply Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredJobs.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 text-center">
                <Briefcase className="mx-auto h-12 w-12 text-blue-500" />
                <h3 className="mt-4 text-xl font-semibold">No jobs found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Job Details Dialog */}
        {selectedJob && (
          <Dialog
            open={selectedJob !== null && !applyDialogOpen}
            onOpenChange={(open) => !open && setSelectedJob(null)}
          >
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl bg-background/90 dark:bg-background/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                <DialogDescription className="text-lg font-medium text-foreground">
                  {selectedJob.company}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Location</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                      {selectedJob.location}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Job Type</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                      {selectedJob.type}
                    </span>
                  </div>
                  {selectedJob.duration && (
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground">Duration</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                        {selectedJob.duration}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Salary</span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                      {selectedJob.salary}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Posted</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                      {selectedJob.posted}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Requirements</h3>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Responsibilities</h3>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1">
                  {selectedJob.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedJob(null)} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                  Close
                </Button>
                <Button onClick={() => setApplyDialogOpen(true)} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                  Apply Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Apply Dialog */}
        {selectedJob && (
          <Dialog open={applyDialogOpen} onOpenChange={(open) => !open && setApplyDialogOpen(false)}>
            <DialogContent className="sm:max-w-md bg-background/90 dark:bg-background/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
                <DialogDescription>
                  Submit your application for {selectedJob.title} at {selectedJob.company}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Your full name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Your email address" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="resume" className="text-right">
                    Resume
                  </Label>
                  <Input id="resume" type="file" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cover-letter" className="text-right">
                    Cover Letter
                  </Label>
                  <Input id="cover-letter" type="file" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setApplyDialogOpen(false)} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setApplyDialogOpen(false)
                    setSelectedJob(null)
                    // Here you would normally submit the form data
                    alert("Application submitted successfully!")
                  }}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                >
                  Submit Application
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Back to Profile Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Button variant="outline" size="lg" asChild className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50">
            <Link href="/student/academics/portal">Back to Profile</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

