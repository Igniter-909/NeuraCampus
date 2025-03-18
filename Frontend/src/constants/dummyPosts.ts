export const dummyPosts = [
    {
      id: "1",
      author: "Jane Smith",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Just launched my new AI project that can generate code from natural language! Check it out at github.com/janesmith/ai-coder",
      category: "projects",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      likes: 24,
      comments: [
        {
          id: "c1",
          author: "John Doe",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "This is amazing! Can't wait to try it out.",
          createdAt: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: "c2",
          author: "Alice Johnson",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "Is it open source? I'd love to contribute!",
          createdAt: new Date(Date.now() - 900000).toISOString(),
        },
      ],
    },
    {
      id: "2",
      author: "Tech Recruiter",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "We're hiring full-stack developers at TechCorp! Remote positions available with competitive salaries. DM me for details.",
      category: "jobs",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      likes: 15,
      comments: [
        {
          id: "c3",
          author: "Bob Williams",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "What tech stack are you using?",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
    },
    {
      id: "3",
      author: "Sarah Chen",
      authorImage: "/placeholder.svg?height=40&width=40",
      content: "Just published my research on quantum computing applications in cryptography. Link in bio!",
      category: "technology",
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      likes: 42,
      comments: [],
    },
    {
      id: "4",
      author: "Internship Connect",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Summer 2024 internship applications are now open at Google, Microsoft, and Amazon. Apply early for best chances!",
      category: "internships",
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      likes: 67,
      comments: [
        {
          id: "c4",
          author: "Student123",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "Are these open to international students?",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
    },
    {
      id: "5",
      author: "Dev Ninja",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Just discovered this amazing new JavaScript framework that makes building UIs 10x faster. Who wants to join me for a weekend hackathon to try it out?",
      category: "technology",
      createdAt: new Date(Date.now() - 18000000).toISOString(),
      likes: 31,
      comments: [
        {
          id: "c5",
          author: "Tech Enthusiast",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "Which framework? I'm always looking to learn new tools!",
          createdAt: new Date(Date.now() - 15000000).toISOString(),
        },
      ],
    },
    {
      id: "6",
      author: "Startup Founder",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Our startup just secured $2M in seed funding! We're building a platform to democratize access to AI tools for small businesses. Looking for talented engineers to join our team.",
      category: "jobs",
      createdAt: new Date(Date.now() - 25200000).toISOString(),
      likes: 89,
      comments: [
        {
          id: "c6",
          author: "AI Specialist",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "Congratulations! What kind of AI tools are you focusing on?",
          createdAt: new Date(Date.now() - 21600000).toISOString(),
        },
        {
          id: "c7",
          author: "Job Seeker",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "Are you open to remote workers?",
          createdAt: new Date(Date.now() - 18000000).toISOString(),
        },
      ],
    },
    {
      id: "7",
      author: "CS Professor",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Excited to announce our department is offering a new course on Quantum Computing and its applications in cryptography next semester. Limited seats available!",
      category: "technology",
      createdAt: new Date(Date.now() - 32400000).toISOString(),
      likes: 52,
      comments: [],
    },
    {
      id: "8",
      author: "Project Showcase",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Check out this amazing AR project by one of our students that turns any surface into an interactive game board using just your smartphone camera!",
      category: "projects",
      createdAt: new Date(Date.now() - 39600000).toISOString(),
      likes: 45,
      comments: [
        {
          id: "c8",
          author: "AR Enthusiast",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "This is incredible! Is there a demo video somewhere?",
          createdAt: new Date(Date.now() - 36000000).toISOString(),
        },
      ],
    },
    {
      id: "9",
      author: "Google Recruiter",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Google Summer Internship 2024 applications are now open! Looking for talented CS students who want to make an impact. Apply through our careers portal.",
      category: "internships",
      createdAt: new Date(Date.now() - 46800000).toISOString(),
      likes: 112,
      comments: [
        {
          id: "c9",
          author: "CS Student",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "What's the application deadline?",
          createdAt: new Date(Date.now() - 43200000).toISOString(),
        },
        {
          id: "c10",
          author: "Grad Student",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "Are PhD students eligible to apply?",
          createdAt: new Date(Date.now() - 39600000).toISOString(),
        },
      ],
    },
    {
      id: "10",
      author: "Hackathon Organizer",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "Registration is now open for TechHack 2024! $50,000 in prizes, amazing networking opportunities, and a chance to showcase your skills to top tech companies.",
      category: "projects",
      createdAt: new Date(Date.now() - 54000000).toISOString(),
      likes: 78,
      comments: [
        {
          id: "c11",
          author: "Previous Winner",
          authorImage: "/placeholder.svg?height=40&width=40",
          content: "Highly recommend participating! I met my co-founder at last year's event.",
          createdAt: new Date(Date.now() - 50400000).toISOString(),
        },
      ],
    },
  ]
  
  