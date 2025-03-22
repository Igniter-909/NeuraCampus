"use client"
import Image from "next/image"
import logo from "../../public/logo11.svg" // Static import
import college from "../../public/college.png"
import attendance from "../../public/attendance.png"
import intern from "../../public/intern.png"
import pyq from "../../public/pyq.png"
import networking from "../../public/networking.png"
import additional from "../../public/additional.png"
import Link from "next/link"
import { BeamsBackground } from "@/components/ui/beams-background"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { useEffect, useRef, useState } from "react"
import { BackgroundShapes } from "@/components/ui/background-shapes"
import { ImageCollage } from "@/components/ui/image-collage"
import { Mail, MapPin, Phone, Menu, X, BookOpen, Users, Award, FileText, Network, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"
import { Iphone15Pro } from "@/components/ui/iphone"

export default function Home() {
  const reviews = [
    {
      name: "College Management",
      body: "Manage documents without having to sit under piles of paper",
      img: college,
    },
    {
      name: "Attendance Management",
      body: "Proxy-proof sound-cum-face recognition based attendance",
      img: attendance,
    },
    {
      name: "Internship & Placement Support",
      body: "Connect with recruiters and showcase your skills",
      img: intern,
    },
    {
      name: "PYQ Papers",
      body: "Access to previous year papers with solutions",
      img: pyq,
    },
    {
      name: "Additional Features",
      body: "Additional features for college like fee payments and admission stats",
      img: additional,
    },
    {
      name: "Networking",
      body: "Collaborate with other institutions through exciting events",
      img: networking,
    },
  ]

  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  const ReviewCard = ({
    img,
    name,
    body,
  }: {
    img: any
    name: string
    body: string
  }) => {
    return (
      <figure
        className={cn(
          "relative w-[280px] sm:w-72 md:w-80 mx-3 sm:mx-4 p-4 sm:p-6 rounded-2xl transition-all duration-300",
          "border border-blue-400/40 shadow-lg hover:shadow-2xl",
          "bg-gradient-to-br from-[#adaeb0] to-[#7f2e60] dark:from-[#1b2d5d]/80 dark:to-[#4466b2]/80",
          "hover:scale-[1.02] hover:border-blue-500/60",
          "backdrop-blur-md",
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 shadow-md"
            width={56}
            height={56}
            alt=""
            src={img || "/placeholder.svg"}
          />
          <figcaption className="text-base sm:text-lg font-semibold text-white">{name}</figcaption>
        </div>
        <blockquote className="mt-3 text-xs sm:text-sm text-blue-200 leading-relaxed">"{body}"</blockquote>
      </figure>
    )
  }
  const [isLoading, setIsLoading] = useState(true)
  const [startTyping, setStartTyping] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0) // Reset scroll position to the top
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setStartTyping(true), 600)
    }, 2200)
  }, [])

  const scrollToSection = (sectionId: string) => {
    let ref
    switch (sectionId) {
      case "home":
        ref = homeRef
        break
      case "about":
        ref = aboutRef
        break
      case "features":
        ref = featuresRef
        break
      case "work":
        ref = workRef
        break
      case "contact":
        ref = contactRef
        break
      default:
        ref = homeRef
    }

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [homeRef.current, aboutRef.current, featuresRef.current, workRef.current, contactRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })
    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  // Feature data with different colors
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Academic Management",
      description: "Streamline curriculum planning, grading, and academic reporting",
      color: "from-purple-500 to-indigo-600",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-300",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Student Information",
      description: "Centralized database for student records and performance tracking",
      color: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-300",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Attendance Tracking",
      description: "Biometric and facial recognition for secure attendance management",
      color: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-300",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Exam Management",
      description: "Create, schedule, and grade exams with detailed analytics",
      color: "from-amber-500 to-orange-600",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-300",
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Communication Tools",
      description: "Connect students, parents, and staff with integrated messaging",
      color: "from-pink-500 to-rose-600",
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-300",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fee Management",
      description: "Streamline payment processing and financial reporting",
      color: "from-red-500 to-rose-600",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-300",
    },
  ]

  return (
    <div className="relative h-screen flex flex-col">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-transparent shadow-md backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 lg:h-20">
            <div className="flex items-center">
              <button onClick={() => scrollToSection("home")} className="flex-shrink-0 flex items-center">
                <Image className="h-8 w-auto" src={logo || "/placeholder.svg"} alt="Logo" width={32} height={32} />
                <span className="ml-2 text-xl font-bold text-white">
                  Neura<span className="text-black">Campus</span>
                </span>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden sm:ml-10 lg:ml-16 sm:flex sm:space-x-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className={`text-white hover:text-gray-200 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "home" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`text-white hover:text-gray-200 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "about" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className={`text-white hover:text-gray-200 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "features" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("work")}
                  className={`text-white hover:text-gray-200 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "work" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  Our Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`text-white hover:text-gray-200 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "contact" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-900 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Desktop Sign in/Register buttons */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden absolute top-16 left-0 right-0 bg-[#10234f]/95 backdrop-blur-md z-[90]">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => {
                    scrollToSection("home")
                    setMobileMenuOpen(false)
                  }}
                  className={`${
                    activeSection === "home" ? "bg-white/10 text-white" : "text-white hover:bg-white/5"
                  } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    scrollToSection("about")
                    setMobileMenuOpen(false)
                  }}
                  className={`${
                    activeSection === "about" ? "bg-white/10 text-white" : "text-white hover:bg-white/5"
                  } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                >
                  About
                </button>
                <button
                  onClick={() => {
                    scrollToSection("features")
                    setMobileMenuOpen(false)
                  }}
                  className={`${
                    activeSection === "features" ? "bg-white/10 text-white" : "text-white hover:bg-white/5"
                  } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    scrollToSection("work")
                    setMobileMenuOpen(false)
                  }}
                  className={`${
                    activeSection === "work" ? "bg-white/10 text-white" : "text-white hover:bg-white/5"
                  } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                >
                  Our Work
                </button>
                <button
                  onClick={() => {
                    scrollToSection("contact")
                    setMobileMenuOpen(false)
                  }}
                  className={`${
                    activeSection === "contact" ? "bg-white/10 text-white" : "text-white hover:bg-white/5"
                  } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                >
                  Contact
                </button>
                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => {
                      scrollToSection("contact")
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("contact")
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        ref={homeRef}
        className="h-fit md:min-h-screen pt-32 sm:pt-28 pb-12 sm:pb-16 flex items-center relative"
      >
        <BeamsBackground className="absolute inset-0" />
        <BackgroundShapes />
        <div className="relative z-10 flex flex-col flex-1">
          <main className="max-w-full mx-4 sm:mx-10 flex items-center my-5 md:my-auto px-4 sm:px-6 lg:px-0 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
              <div className="flex flex-col justify-center space-y-6">
                {isLoading ? (
                  <motion.div
                    className="text-white text-2xl sm:text-3xl font-bold"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 2.5 }}
                  ></motion.div>
                ) : (
                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <span className="block">Welcome to</span>
                    <span className="block text-gray-900">
                      {startTyping && (
                        <>
                          <span className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Neura</span>
                          <span className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            <Typewriter words={["Campus"]} typeSpeed={300} delaySpeed={500} cursor loop={true} />
                          </span>
                        </>
                      )}
                    </span>
                  </motion.h1>
                )}
                <motion.p
                  className="mt-2 text-sm sm:text-base md:text-lg text-blue-100 max-w-md sm:max-w-lg md:max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
                >
                  A comprehensive solution for managing educational institutions. Streamline your academic processes,
                  enhance communication, and improve efficiency.
                </motion.p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/register"
                      className="w-full flex items-center justify-center px-6 sm:px-8 py-3 text-base font-medium rounded-md text-white bg-blue-700/80 backdrop-blur-[80px] shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-blue-800 transition-all ease-in-out duration-300 md:py-4 md:text-lg"
                    >
                      Get started
                    </Link>
                  </motion.div>
                  <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/about"
                      className="w-full flex items-center justify-center px-6 sm:px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-white shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 transition-all ease-in-out duration-300 md:py-4 md:text-lg"
                    >
                      Learn more
                    </Link>
                  </motion.div>
                </div>
              </div>
              <div className="hidden lg:block">
                <ImageCollage />
              </div>
            </div>
          </main>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            className="w-full space-x-reverse h-auto"
          >
            <motion.path
              initial={{
                d: "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
              }}
              animate={{
                d: [
                  "M321.39,75.44c58-20.79,114.16-32.13,172-45.86,82.39-22.72,168.19-22.73,250.45-4.39C823.78,35,906.67,85,985.66,105.83c70.05,18.48,146.53,28.09,214.34,6V0H0V32.35A600.21,600.21,0,0,0,321.39,75.44Z",
                  "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut",
              }}
              className="fill-current text-[#10234f]/40"
            />

            <motion.path
              initial={{
                d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              }}
              animate={{
                d: [
                  "M321.39,50.44c58-15.79,114.16-25.13,172-35.86,82.39-18.72,168.19-18.73,250.45-.39C823.78,20,906.67,65,985.66,85.83c70.05,16.48,146.53,24.09,214.34,5V0H0V25.35A600.21,600.21,0,0,0,321.39,50.44Z",
                  "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                duration: 6,
                ease: "easeInOut",
              }}
              className="fill-current text-[#10234f]"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="h-fit md:min-h-screen bg-gradient-to-t from-[#15347b] to-[#10234f] border-0 pt-24 pb-12 flex items-center relative overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">About Us</h2>
            <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="aspect-square w-full max-w-lg mx-auto"
            >
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="About NeuraCampus"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-left space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">Our Mission</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  NeuraCampus is dedicated to revolutionizing educational management through innovative technology
                  solutions. We believe that efficient administration is the backbone of quality education.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">Our Vision</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  We envision a world where educational institutions can focus on teaching and learning, while
                  administrative processes run seamlessly in the background.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
                  <h4 className="text-lg sm:text-xl font-bold text-white">10+</h4>
                  <p className="text-sm text-blue-100">Years Experience</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
                  <h4 className="text-lg sm:text-xl font-bold text-white">500+</h4>
                  <p className="text-sm text-blue-100">Institutions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
                  <h4 className="text-lg sm:text-xl font-bold text-white">24/7</h4>
                  <p className="text-sm text-blue-100">Support</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
                  <h4 className="text-lg sm:text-xl font-bold text-white">99.9%</h4>
                  <p className="text-sm text-blue-100">Uptime</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            className="w-full space-x-reverse h-auto"
          >
            <motion.path
              initial={{
                d: "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
              }}
              animate={{
                d: [
                  "M321.39,75.44c58-20.79,114.16-32.13,172-45.86,82.39-22.72,168.19-22.73,250.45-4.39C823.78,35,906.67,85,985.66,105.83c70.05,18.48,146.53,28.09,214.34,6V0H0V32.35A600.21,600.21,0,0,0,321.39,75.44Z",
                  "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut",
              }}
              className="fill-current text-[#1a4090]/40"
            />

            <motion.path
              initial={{
                d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              }}
              animate={{
                d: [
                  "M321.39,50.44c58-15.79,114.16-25.13,172-35.86,82.39-18.72,168.19-18.73,250.45-.39C823.78,20,906.67,65,985.66,85.83c70.05,16.48,146.53,24.09,214.34,5V0H0V25.35A600.21,600.21,0,0,0,321.39,50.44Z",
                  "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                duration: 6,
                ease: "easeInOut",
              }}
              className="fill-current text-[#4a7aff]"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="h-fit min-h-screen bg-gradient-to-br from-[#1a4090] to-[#4a7aff] flex items-center relative overflow-hidden pt-16 pb-24 lg:py-32"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              delay: 2,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-16 lg:mt-24 mb-4">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                Powerful Features
              </motion.span>
            </h2>
          </motion.div>

          {/* Mobile view - Features in grid with center image */}
          <div className="lg:hidden space-y-6">
            {/* Top 3 features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={`mobile-feature-top-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-br ${feature.color} bg-opacity-90 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`w-8 h-8 ${feature.iconBg} rounded-full flex items-center justify-center mb-2`}>
                    <div className={feature.iconColor}>{feature.icon}</div>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-blue-50 text-xs leading-tight">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Center phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-20 w-[250px] mx-auto"
            >
              <Iphone15Pro
                className="size-full rounded-xl"
                src="https://res.cloudinary.com/dicfvq6fj/image/upload/v1742590379/mobilePreview_rbd8oc.png"
              />

              {/* Connecting lines with static gradients */}
              <div className="absolute top-1/4 -left-24 w-24 h-0.5 bg-gradient-to-r from-transparent to-blue-400/70"></div>
              <div className="absolute top-1/4 -right-24 w-24 h-0.5 bg-gradient-to-l from-transparent to-blue-400/70"></div>
              <div className="absolute top-1/2 -left-24 w-24 h-0.5 bg-gradient-to-r from-transparent to-purple-400/70"></div>
              <div className="absolute top-1/2 -right-24 w-24 h-0.5 bg-gradient-to-l from-transparent to-purple-400/70"></div>
              <div className="absolute top-3/4 -left-24 w-24 h-0.5 bg-gradient-to-r from-transparent to-pink-400/70"></div>
              <div className="absolute top-3/4 -right-24 w-24 h-0.5 bg-gradient-to-l from-transparent to-pink-400/70"></div>
            </motion.div>

            {/* Bottom 3 features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {features.slice(3, 6).map((feature, index) => (
                <motion.div
                  key={`mobile-feature-bottom-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-br ${feature.color} bg-opacity-90 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`w-8 h-8 ${feature.iconBg} rounded-full flex items-center justify-center mb-2`}>
                    <div className={feature.iconColor}>{feature.icon}</div>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-blue-50 text-xs leading-tight">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop view - Hexagonal layout */}
          <div className="hidden lg:block relative">
            <div className="flex justify-center items-center">
              {/* Center phone */}
              <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative z-20 w-[250px] mx-auto"
              >
                <Iphone15Pro
                  className="size-full rounded-3xl overflow-hidden"
                  src="https://res.cloudinary.com/dicfvq6fj/image/upload/v1742590379/mobilePreview_rbd8oc.png"
                />

                {/* Connecting lines with static gradients */}
                <div className="absolute top-1/4 -left-24 w-24 h-0.5 bg-gradient-to-r from-transparent to-blue-400/70"></div>
                <div className="absolute top-1/4 -right-24 w-24 h-0.5 bg-gradient-to-l from-transparent to-blue-400/70"></div>
                <div className="absolute top-1/2 -left-24 w-24 h-0.5 bg-gradient-to-r from-transparent to-purple-400/70"></div>
                <div className="absolute top-1/2 -right-24 w-24 h-0.5 bg-gradient-to-l from-transparent to-purple-400/70"></div>
                <div className="absolute top-3/4 -left-24 w-24 h-0.5 bg-gradient-to-r from-transparent to-pink-400/70"></div>
                <div className="absolute top-3/4 -right-24 w-24 h-0.5 bg-gradient-to-l from-transparent to-pink-400/70"></div>
              </motion.div>
            </div>

            {/* Left side features */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-around">
              {[0, 2, 4].map((index) => (
                <motion.div
                  key={`left-feature-${index}`}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.03, x: 5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                  className={`bg-gradient-to-r ${features[index].color} rounded-lg p-4 shadow-lg w-[300px] transition-all duration-300`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${features[index].iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <motion.div
                        className={features[index].iconColor}
                        initial={{ rotate: -10 }}
                        whileHover={{ rotate: 0, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {features[index].icon}
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{features[index].title}</h3>
                      <p className="text-blue-50 text-xs mt-1">{features[index].description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side features */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-around">
              {[1, 3, 5].map((index) => (
                <motion.div
                  key={`right-feature-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.03, x: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                  className={`bg-gradient-to-l ${features[index].color} rounded-lg p-4 shadow-lg w-[300px] transition-all duration-300`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${features[index].iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <motion.div
                        className={features[index].iconColor}
                        initial={{ rotate: 10 }}
                        whileHover={{ rotate: 0, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {features[index].icon}
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{features[index].title}</h3>
                      <p className="text-blue-50 text-xs mt-1">{features[index].description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            className="w-full space-x-reverse h-auto"
          >
            <motion.path
              initial={{
                d: "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
              }}
              animate={{
                d: [
                  "M321.39,75.44c58-20.79,114.16-32.13,172-45.86,82.39-22.72,168.19-22.73,250.45-4.39C823.78,35,906.67,85,985.66,105.83c70.05,18.48,146.53,28.09,214.34,6V0H0V32.35A600.21,600.21,0,0,0,321.39,75.44Z",
                  "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut",
              }}
              className="fill-current text-[#a0c0ff]/40"
            />

            <motion.path
              initial={{
                d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              }}
              animate={{
                d: [
                  "M321.39,50.44c58-15.79,114.16-25.13,172-35.86,82.39-18.72,168.19-18.73,250.45-.39C823.78,20,906.67,65,985.66,85.83c70.05,16.48,146.53,24.09,214.34,5V0H0V25.35A600.21,600.21,0,0,0,321.39,50.44Z",
                  "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                duration: 6,
                ease: "easeInOut",
              }}
              className="fill-current text-[#5a8aff]"
            />
          </svg>
        </div>
      </section>

      {/* Our Work Section */}
      <section
        id="work"
        ref={workRef}
        className="h-fit md:min-h-screen bg-gradient-to-br from-[#5a8aff] to-[#a0c0ff] pt-24 pb-12 flex items-center relative overflow-hidden"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Our <span className="text-white">Work</span>
            </h2>
            <div className="mt-2 h-1 w-20 bg-white mx-auto"></div>
          </motion.div>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s] h-[250px] sm:h-64">
              {firstRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s] h-[250px] sm:h-64">
              {secondRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            className="w-full space-x-reverse h-auto"
          >
            <motion.path
              initial={{
                d: "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
              }}
              animate={{
                d: [
                  "M321.39,75.44c58-20.79,114.16-32.13,172-45.86,82.39-22.72,168.19-22.73,250.45-4.39C823.78,35,906.67,85,985.66,105.83c70.05,18.48,146.53,28.09,214.34,6V0H0V32.35A600.21,600.21,0,0,0,321.39,75.44Z",
                  "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut",
              }}
              className="fill-current text-[#2a4080]/40"
            />

            <motion.path
              initial={{
                d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              }}
              animate={{
                d: [
                  "M321.39,50.44c58-15.79,114.16-25.13,172-35.86,82.39-18.72,168.19-18.73,250.45-.39C823.78,20,906.67,65,985.66,85.83c70.05,16.48,146.53,24.09,214.34,5V0H0V25.35A600.21,600.21,0,0,0,321.39,50.44Z",
                  "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                duration: 6,
                ease: "easeInOut",
              }}
              className="fill-current text-[#1a2e60]"
            />
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="h-fit md:min-h-screen bg-gradient-to-t from-[#2a4080] to-[#1a2e60] pt-24 pb-12 flex items-center relative overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Contact Us</h2>
            <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto"></div>
            <p className="mt-4 text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
              Have questions or ready to transform your institution? Get in touch with our team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between space-y-8"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-900 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">Address</h4>
                      <p className="text-blue-100 mt-1">Indian Institute of Information Technology Una, 177209</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-900 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">Phone</h4>
                      <p className="text-blue-100 mt-1">+91 9225679921</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-900 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">Email</h4>
                      <p className="text-blue-100 mt-1 break-all">amanchn13@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Business Hours</h3>
                <div className="w-full overflow-hidden">
                  <Image
                    src="https://eskooly.com/assets/images/illustrations/drawings/line-city.svg"
                    height={16}
                    width={450}
                    alt=""
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            className="w-full space-x-reverse h-auto"
          >
            <motion.path
              initial={{
                d: "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
              }}
              animate={{
                d: [
                  "M321.39,75.44c58-20.79,114.16-32.13,172-45.86,82.39-22.72,168.19-22.73,250.45-4.39C823.78,35,906.67,85,985.66,105.83c70.05,18.48,146.53,28.09,214.34,6V0H0V32.35A600.21,600.21,0,0,0,321.39,75.44Z",
                  "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut",
              }}
              className="fill-current text-[#10234f]/40"
            />

            <motion.path
              initial={{
                d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              }}
              animate={{
                d: [
                  "M321.39,50.44c58-15.79,114.16-25.13,172-35.86,82.39-18.72,168.19-18.73,250.45-.39C823.78,20,906.67,65,985.66,85.83c70.05,16.48,146.53,24.09,214.34,5V0H0V25.35A600.21,600.21,0,0,0,321.39,50.44Z",
                  "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                duration: 6,
                ease: "easeInOut",
              }}
              className="fill-current text-[#10234f]"
            />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#10234f] backdrop-blur-sm border-t border-white/10 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <Image className="h-8 w-auto" src={logo || "/placeholder.svg"} alt="Logo" width={32} height={32} />
              <span className="ml-2 text-xl font-bold text-white">
                Neura<span className="text-blue-300">Campus</span>
              </span>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-blue-100 text-sm">© {new Date().getFullYear()} NeuraCampus. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <button className="text-sm text-blue-300 hover:text-white transition-colors">Privacy Policy</button>
                <button className="text-sm text-blue-300 hover:text-white transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

