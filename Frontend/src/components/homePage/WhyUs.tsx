import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import React from "react"
import { motion } from "framer-motion"
import whyUs1 from "../../../public/whyUs1.svg"
import whyUs2 from "../../../public/whyUs2.svg"
import message from "../../../public/message.svg"
import exams from "../../../public/exams.png"
import questionAnswer from "../../../public/qna.png"
import attendance from "../../../public/attendancee.png"
import lab from "../../../public/lab.png"
import adminControl from "../../../public/adminControl.png"

interface WhyUsProps {
  id: string;
  forwardedRef: React.RefObject<HTMLDivElement | null>;
}

export const WhyUs: React.FC<WhyUsProps> = ({ id, forwardedRef }) => {
  return (
    <section 
      id={id}
      ref={forwardedRef}
      className="bg-gradient-to-b from-[#5884fd] to-[#a0c0ff] text-white min-h-screen w-full relative overflow-hidden"
    >
      {/* Section separator at the top */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#4059a3] to-transparent"></div>
      
      {/* Why Us Section */}
      <section className="pt-14 pb-10 px-4 md:px-8 lg:px-12 container mx-auto">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">Why Us?</span>
          <div className="max-w-6xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-[#2a4080] text-center">
              Why NeuraCampus is the best school management software?
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="md:w-1/2">
                <p className="text-sm md:text-base text-[#172a54] text-justify">
                  NeuraCampus, simply is a completely free online school management software. It has more school management
                  features than any other online school management software. It is a cloud-based software with no need for
                  exhausting hardware. You will be automatically updated as a new feature will be a part of our future
                  school management software. Never miss school management features.
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
                  src={whyUs1}
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#2a4080]">Separate Portals Available</h2>
                <p className="text-sm md:text-base text-[#172a54]">
                  Our school management system comes with a separate portal for every user. An admin portal with full
                  controls, separate portals for Parents, staff, Accountants, and Students. Manage your school easily.
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
                  src={whyUs2}
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
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Message System
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#2a4080]">Messaging and file sharing system</h2>
            <p className="text-sm md:text-base text-[#172a54] mb-4">
              Discuss and share files with other users through our messaging system. With this feature, you can do
              real-time chat with every individual associated with your institution.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r from-[#4a7aff] to-[#2a4080] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
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
              src={message}
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
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Exams Center
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#2a4080]">Exams Center</h2>
            <p className="text-sm md:text-base text-[#172a54] mb-4">
              Send unlimited free SMS alerts on mobile numbers with our integrated SMS gateway. Get instant
              notifications to their respective branded SMS to send alerts on mobile phones.
            </p>
            <Link
                href="#"
                className="bg-[#4a7aff] text-white px-4 py-2 rounded-md font-medium hover:bg-[#2a4080] transition-colors inline-flex items-center"
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
            <Image
              src={exams}
              alt="Exam Services"
              width={400}
              height={300}
              className="h-auto"
            />
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
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Solutions at your fingertips
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#2a4080]">Free PYQ Solutions</h2>
            <p className="text-sm md:text-base text-[#172a54] mb-4">
              Get answers to your questions with our question answer system. With this feature, you can do
              real-time chat with every individual associated with your institution.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#"
                className="bg-[#4a7aff] text-white px-4 py-2 rounded-md font-medium hover:bg-[#2a4080] transition-colors inline-flex items-center"
              >
                <Play className="h-4 w-4 mr-2" />
                Coming Soon
              </Link>
              <Link
                href="#"
                className="bg-[#2a4080] text-white px-4 py-2 rounded-md font-medium hover:bg-[#4a7aff] transition-colors inline-flex items-center"
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
              src={questionAnswer}
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
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Attendance
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#2a4080]">Attendance System</h2>
            <p className="text-sm md:text-base text-[#172a54] mb-4">
              Attendance system is a feature that allows you to track the attendance of your students. With this feature, you can do
              mark attendance in a single click.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r from-[#4a7aff] to-[#2a4080] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
            >
              Know More(Coming Soon)
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
              src={attendance}
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
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Lab Management
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#2a4080]">
              Lab Management System
            </h2>
            <p className="text-sm md:text-base text-[#172a54] mb-4">
              Lab management system is a feature that allows you to manage the lab of your institution. With this feature, you can do
              real-time chat with every individual associated with your institution.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r from-[#4a7aff] to-[#2a4080] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Know More(Coming Soon)
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
              src={lab}
              alt="lab"
              width={400}
              height={300}
              className="h-auto"
            />
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
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              Admin Control
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#2a4080]">Admin Control</h2>
            <p className="text-sm md:text-base text-[#172a54] mb-4">
              Admin control is a feature that allows you to control the access of your users. With this feature, you can do
              real-time chat with every individual associated with your institution.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r from-[#4a7aff] to-[#2a4080] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
            >
              Know More(Coming Soon)
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
              src={adminControl}
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
            className="fill-current text-[#2a4080]"
          />
        </svg>
      </div>
    </section>
  )
}

