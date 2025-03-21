export interface Department {
    name: string
    hod: string
    teachers: number
    students: number
    programs: string
  }
  
  export interface Faculty {
    name: string
    position: string
    specialization: string
  }
  
  export interface Facility {
    name: string
    description: string
  }
  
  export interface Contact {
    phone: string
    email: string
    website: string
  }
  
  export interface SocialMedia {
    linkedin: string
    twitter: string
    instagram: string
  }
  
  export interface Placement {
    companyName: string
    role: string
    studentName: string
    package: string
    year: string
  }
  
  export interface Internship {
    companyName: string
    role: string
    studentName: string
    duration: string
    year: string
  }
  
  export interface CollegeData {
    coverImage: string
    logo: string
    name: string
    tagline: string
    about: string
    established: string
    location: string
    accreditations: string
    contact: Contact
    socialMedia: SocialMedia
    departments: Department[]
    faculty: Faculty[]
    facilities: Facility[]
    achievements: string[]
    placements: Placement[]
    internships: Internship[]
    applyUrl: string
  }
  
  export const initialCollegeData: CollegeData = {
    coverImage: "/placeholder.svg?height=400&width=1200",
    logo: "/placeholder.svg?height=100&width=100",
    name: "Global Institute of Technology",
    tagline: "Innovate, Educate, Elevate",
    about:
      "Global Institute of Technology (GIT) is a premier educational institution dedicated to providing world-class education in technology, engineering, and management. Founded in 1995, GIT has established itself as a leader in higher education with a focus on innovation, research, and industry collaboration.\n\nOur mission is to empower students with knowledge, skills, and values that enable them to excel in their chosen fields and contribute meaningfully to society. We are committed to fostering a culture of academic excellence, critical thinking, and ethical leadership.",
    established: "1995",
    location: "New York, USA",
    accreditations: "AICTE, NAAC A+",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "contact@git.edu",
      website: "www.git.edu",
    },
    socialMedia: {
      linkedin: "linkedin.com/school/git",
      twitter: "twitter.com/git_official",
      instagram: "instagram.com/git_university",
    },
    departments: [
      {
        name: "Computer Science & Engineering",
        hod: "Dr. Alan Turing",
        teachers: 15,
        students: 500,
        programs: "B.Tech, M.Tech, PhD",
      },
      {
        name: "Mechanical Engineering",
        hod: "Dr. Henry Ford",
        teachers: 12,
        students: 450,
        programs: "B.Tech, M.Tech",
      },
      {
        name: "Business Administration",
        hod: "Dr. Peter Drucker",
        teachers: 10,
        students: 400,
        programs: "BBA, MBA",
      },
    ],
    faculty: [
      {
        name: "Dr. Jane Smith",
        position: "Professor",
        specialization: "AI & Machine Learning",
      },
      {
        name: "Dr. Robert Brown",
        position: "Associate Professor",
        specialization: "Robotics",
      },
      {
        name: "Prof. Alice Williams",
        position: "Assistant Professor",
        specialization: "Data Science",
      },
    ],
    facilities: [
      {
        name: "Library",
        description: "50,000+ books and digital resources",
      },
      {
        name: "Hostels",
        description: "Modern hostels with WiFi, gym, and security",
      },
      {
        name: "Labs",
        description: "State-of-the-art labs including AI, Robotics, and IoT",
      },
      {
        name: "Sports Complex",
        description: "Facilities for football, basketball, cricket",
      },
    ],
    achievements: [
      "Ranked #5 in National University Rankings",
      "Awarded an AI Research Grant of $500,000 in 2023",
      "Winners of Hackathon 2024 at Silicon Valley Tech Fest",
    ],
    placements: [
      {
        companyName: "Google",
        role: "Software Engineer",
        studentName: "John Doe",
        package: "$120,000",
        year: "2023"
      },
      {
        companyName: "Microsoft",
        role: "Product Manager",
        studentName: "Jane Smith",
        package: "$110,000",
        year: "2023"
      },
      {
        companyName: "Amazon",
        role: "Data Scientist",
        studentName: "Robert Johnson",
        package: "$115,000",
        year: "2023"
      }
    ],
    internships: [
      {
        companyName: "Meta",
        role: "UX Designer Intern",
        studentName: "Emily Chen",
        duration: "3 months",
        year: "2023"
      },
      {
        companyName: "IBM",
        role: "Machine Learning Intern",
        studentName: "David Wilson",
        duration: "6 months",
        year: "2023"
      },
      {
        companyName: "Apple",
        role: "iOS Developer Intern",
        studentName: "Sarah Lee",
        duration: "3 months",
        year: "2023"
      }
    ],
    applyUrl: "https://git.edu/apply",
  }
  
  