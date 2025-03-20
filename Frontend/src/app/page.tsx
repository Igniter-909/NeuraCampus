"use client"
import Image from "next/image"
import logo from "../../public/logo11.svg" // Static import
import Link from "next/link"
import { BeamsBackground } from "@/components/ui/beams-background"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { useEffect, useRef, useState } from "react"
import { BackgroundShapes } from "@/components/ui/background-shapes"
import { ImageCollage } from "@/components/ui/image-collage"
import { Mail, MapPin, Phone } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [startTyping, setStartTyping] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
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
  }

  useEffect(()=>{
    const observer = new IntersectionObserver(
      (entries)=>{
        entries.forEach((entry)=>{
          if(entry.isIntersecting){
            setActiveSection(entry.target.id)
          }
        })
      }, {threshold: 0.5}
    )

    const sections = [homeRef.current, aboutRef.current, workRef.current, contactRef.current]
    sections.forEach((section)=>{
      if(section) observer.observe(section)
    })
  return ()=>{
    sections.forEach((section)=>{
      if(section) observer.observe(section)
    })
    }
  })

  return (
    <div className="relative h-screen flex flex-col">

      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent shadow-md  backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => scrollToSection("home")} className="flex-shrink-0 flex items-center">
                <Image className="h-8 w-auto" src={logo || "/placeholder.svg"} alt="Logo" width={32} height={32} />
                <span className="ml-2 text-xl font-bold text-white">
                  Neura<span className="text-black">Campus</span>
                </span>
              </button>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className={`text-white hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "home" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`text-white hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "about" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("work")}
                  className={`text-white hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "work" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  Our Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`text-white hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 ${
                    activeSection === "contact" ? "border-primary" : "border-transparent hover:border-gray-300"
                  } text-sm font-medium`}
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
              >
                Sign in
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>


      {/* Home Section */}
      <section id="home" ref={homeRef} className="min-h-screen pt-16 flex items-center relative">
        <BeamsBackground className="absolute inset-0" />
        <BackgroundShapes />
        <div className="relative z-10 flex flex-col flex-1">
        <main className="max-w-full mx-4 sm:mx-10 flex items-center my-5 md:my-auto px-4 sm:px-6 lg:px-0 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
            <div className="flex flex-col justify-center">
              {isLoading ? (
                <motion.div
                  className="text-white text-3xl font-bold"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                ></motion.div>
              ) : (
                <motion.h1
                  className="text-4xl sm:text-5xl tracking-tight font-extrabold text-white  md:text-7xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <span className="block">Welcome to</span>
                  <span className="block text-gray-900">
                    {startTyping && (
                      <>
                        <span className="text-white text-5xl sm:text-6xl md:text-7xl">Neura</span>
                        <span className="text-black text-4xl sm:text-5xl md:text-6xl">
                          <Typewriter words={["Campus"]} typeSpeed={300} delaySpeed={500} cursor loop={true} />
                        </span>
                      </>
                    )}
                  </span>
                </motion.h1>
              )}
              <motion.p
                className="mt-2 line-clamp-2 max-w-md mx-2 text-sm text-blue-100 sm:text-md md:max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
              >
                A comprehensive solution for managing educational institutions.
                Streamline your academic processes, enhance communication, and improve efficiency.
              </motion.p>

              <div className="mt-6 max-w-md mx-2 sm:flex sm:justify-center">
                <motion.div className="rounded-md shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-700/80 backdrop-blur-[80px] shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-blue-800 transition-all ease-in-out duration-300 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </motion.div>
                <motion.div
                  className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-white shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 transition-all ease-in-out duration-300 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </Link>
                </motion.div>
              </div>
            </div>
            <ImageCollage />
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
            className="fill-current text-[#15347b]"
          />
        </svg>
        
      </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="min-h-screen bg-[#15347b] border-0 pt-16 flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">About NeuraCampus</h2>
            <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="About NeuraCampus"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-blue-100 mb-6">
                NeuraCampus is dedicated to revolutionizing educational management through innovative technology
                solutions. We believe that efficient administration is the backbone of quality education.
              </p>

              <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
              <p className="text-blue-100 mb-6">
                We envision a world where educational institutions can focus on teaching and learning, while
                administrative processes run seamlessly in the background.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-bold text-white">10+</h4>
                  <p className="text-blue-100">Years Experience</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-bold text-white">500+</h4>
                  <p className="text-blue-100">Institutions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-bold text-white">24/7</h4>
                  <p className="text-blue-100">Support</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-bold text-white">99.9%</h4>
                  <p className="text-blue-100">Uptime</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="work" ref={workRef} className="min-h-screen bg-[#2451b9] pt-16 flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Work</h2>
            <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto"></div>
            <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
              Explore our innovative solutions that are transforming educational institutions worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl"
              >
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=Project+${item}`}
                    alt={`Project ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Project {item}</h3>
                  <p className="text-blue-100 mb-4">
                    A comprehensive solution for managing educational institutions with advanced features.
                  </p>
                  <button
                    className="text-blue-300 hover:text-blue-100 font-medium transition-colors"
                    onClick={() => scrollToSection("contact")}
                  >
                    Learn more →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 text-base font-medium rounded-md text-white bg-blue-700/80 backdrop-blur-[80px] shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-blue-800 transition-all ease-in-out duration-300"
            >
              View All Projects
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="min-h-screen bg-[#426ac7] pt-16 flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Contact Us</h2>
            <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto"></div>
            <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
              Have questions or ready to transform your institution? Get in touch with our team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6">Send us a message</h3>
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
                    className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
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
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Address</h4>
                      <p className="text-blue-100 mt-1">123 Education Street, Tech City, TC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Phone</h4>
                      <p className="text-blue-100 mt-1">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Email</h4>
                      <p className="text-blue-100 mt-1">info@neuracampus.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between text-blue-100">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between text-blue-100">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between text-blue-100">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#10234f] backdrop-blur-sm border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image className="h-8 w-auto" src={logo || "/placeholder.svg"} alt="Logo" width={32} height={32} />
              <span className="ml-2 text-xl font-bold text-white">
                Neura<span className="text-blue-300">Campus</span>
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-100">© {new Date().getFullYear()} NeuraCampus. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <button className="text-blue-300 hover:text-white transition-colors">Privacy Policy</button>
                <button className="text-blue-300 hover:text-white transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </footer>



      
    </div>
  )
}
