"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import type React from "react"
import { motion } from "framer-motion"
import whyUs1 from "../../../public/whyUs1.svg"
import whyUs2 from "../../../public/whyUs2.svg"
import message from "../../../public/message.svg"
import exams from "../../../public/exams.png"
import questionAnswer from "../../../public/qna.png"
import attendance from "../../../public/attendancee.png"
import lab from "../../../public/lab.png"
import adminControl from "../../../public/adminControl.png"
import { BackgroundShapes } from "@/components/ui/background-shapes"

interface WhyUsProps {
  id: string
  forwardedRef: React.RefObject<HTMLDivElement | null>
}

export const WhyUs: React.FC<WhyUsProps> = ({ id, forwardedRef }) => {
  return (
    <section
      id={id}
      ref={forwardedRef}
      className="bg-gradient-to-b from-[#5a53be] to-[#31177a] via-[#3b35ec] text-white min-h-screen w-full relative overflow-hidden"
    >
      <BackgroundShapes />
      {/* Section Heading */}
      <div className="pt-24 px-4 md:px-8 container mx-auto text-center">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
              Why Us
            </motion.span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-white mx-auto"></div>
          <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto">
            Discover why NeuraCampus is the perfect school management solution for your institution
          </p>
        </motion.div>
      </div>

      {/* Why Us Section */}
      <section className="pt-6 pb-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="md:w-1/2">
              <p className="text-sm md:text-base text-white/90 text-justify">
                NeuraCampus is an advanced cloud-based campus management system designed for colleges and universities.  
                Our platform offers a comprehensive suite of features to streamline academic and administrative operations,  
                eliminating the need for complex hardware installations. With continuous updates and evolving functionalities,  
                NeuraCampus ensures that institutions stay ahead with the latest in digital campus solutions.
              </p>

              </div>
              <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src={whyUs1 || "/placeholder.svg"}
                  alt="NeuraCampus Dashboard"
                  width={400}
                  height={300}
                  className="h-auto"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Separate Portals Section */}
      <section className="py-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col justify-between items-center gap-10">
              <div className="md:w-1/2 text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Separate Portals Available
                </h2>
                <p className="text-sm md:text-base text-white/90">
                  Our college management system comes with a separate portal for every user. An admin portal with full
                  controls, separate portals for Admin, clerk, faculty, hods and Students. Manage your college easily.
                </p>
              </div>
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src={whyUs2 || "/placeholder.svg"}
                  alt="School Staff Illustration"
                  width={600}
                  height={400}
                  className="h-auto w-full"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Messaging System Section */}
      <section className="py-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-purple-800/70 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Message System
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
              Messaging and file sharing system
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Discuss and share files with other users through our messaging system. With this feature, you can do
              real-time chat with every individual associated with your institution.And also share files with other users outside your institution for building a better connection.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block shadow-lg hover:shadow-purple-900/50"
            >
              Sign Up Now
            </Link>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image
              src={message || "/placeholder.svg"}
              alt="Messaging System"
              width={400}
              height={300}
              className="h-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Exams Center Section */}
      <section className="py-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-purple-800/70 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Exams Center
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Exams Center</h2>
            <p className="text-sm md:text-base text-white/90 text-justify">
              The Exams Center in NeuraCampus streamlines exam management with automated notifications.  
              Institutions can effortlessly send exam schedules, updates, and important alerts via  
              email, ensuring students and faculty stay informed in real-time. Enhance communication  
              and eliminate last-minute confusion with a seamless and reliable notification system.
            </p>

            <Link
              href="#"
              className="bg-purple-700 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-800 transition-colors inline-flex items-center shadow-md"
            >
              <Play className="h-4 w-4 mr-2" />
              Coming Soon
            </Link>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image src={exams || "/placeholder.svg"} alt="Exam Services" width={400} height={300} className="h-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Question Answer Section */}
      <section className="py-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-purple-800/70 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Solutions at your fingertips
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Free PYQ Solutions</h2>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Get answers to your questions with our question answer system. With this feature, you can do real-time
              chat with every individual associated with your institution.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#"
                className="bg-purple-700 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-800 transition-colors inline-flex items-center shadow-md"
              >
                <Play className="h-4 w-4 mr-2" />
                Coming Soon
              </Link>
              <Link
                href="#"
                className="bg-indigo-700 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-800 transition-colors inline-flex items-center shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
                Coming Soon
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image
              src={questionAnswer || "/placeholder.svg"}
              alt="question answer"
              width={400}
              height={300}
              className="h-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Attendance Section */}
      <section className="py-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-purple-800/70 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Attendance
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Attendance System</h2>
            <p className="text-sm md:text-base text-white/90 text-justify">
              The NeuraCampus Attendance System offers a **seamless and efficient way** to track student attendance.  
              Designed for accuracy and convenience, it ensures institutions can monitor attendance effortlessly  
              while enhancing student engagement and accountability.  
            </p>

            <Link
              href="#"
              className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block shadow-lg hover:shadow-purple-900/50"
            >
              Know More (Coming Soon)
            </Link>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image
              src={attendance || "/placeholder.svg"}
              alt="attendance"
              width={400}
              height={300}
              className="h-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Lab Management Section */}
      <section className="py-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-purple-800/70 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Lab Management
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Lab Management System</h2>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Lab management system is a feature that allows you to manage the lab of your institution. With this
              feature, you can do real-time chat with every individual associated with your institution.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r  from-purple-700 to-purple-900 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center shadow-lg hover:shadow-purple-900/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Know More (Coming Soon)
            </Link>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image src={lab || "/placeholder.svg"} alt="lab" width={400} height={300} className="h-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Admin Control Section */}
      <section className="py-10 px-4 md:px-8 lg:px-12 container mx-auto pb-20">
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-purple-800/70 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Admin Control
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Admin Control</h2>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Admin control is a feature that allows you to control the access of your users. With this feature, you can
              do real-time chat with every individual associated with your institution.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block shadow-lg hover:shadow-purple-900/50"
            >
              Know More (Coming Soon)
            </Link>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image
              src={adminControl || "/placeholder.svg"}
              alt="admin control"
              width={400}
              height={300}
              className="h-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Wave divider */}
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
            className="fill-current text-[#4f398bb1]/80"
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
            className="fill-current text-[#5442f2]"
          />
        </svg>
      </div>
    </section>
  )
}

