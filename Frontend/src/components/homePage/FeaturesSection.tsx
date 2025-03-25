"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Award, FileText, Network, Zap } from "lucide-react"
import type React from "react"
import Image from "next/image"
import { BackgroundShapes } from "@/components/ui/background-shapes"

interface FeaturesSectionProps {
  id: string
  forwardedRef: React.RefObject<HTMLDivElement | null>
}

/**
 * Features section component for the homepage
 * Displays features in a responsive layout with animated backgrounds
 */
export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ id, forwardedRef }) => {
  // Feature data with different colors for each feature
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Academic Planning",
      description: "Developing tools to assist in curriculum structuring and grading",
      color: "from-purple-500 to-indigo-600",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-300",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Student Data Management",
      description: "Building a centralized platform for student records and tracking",
      color: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-300",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Attendance System",
      description: "Exploring biometric & digital solutions for secure attendance tracking",
      color: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-300",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Examination Module",
      description: "Planning automated exam creation, scheduling, and analytics",
      color: "from-amber-500 to-orange-600",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-300",
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Campus Networking",
      description: "Working on integrated messaging & collaboration tools for students",
      color: "from-pink-500 to-rose-600",
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-300",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Finance & Payments",
      description: "Developing streamlined fee management & reporting solutions",
      color: "from-red-500 to-rose-600",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-300",
    },
  ];
  

  return (
    <section
      id={id}
      ref={forwardedRef}
      className="h-auto min-h-screen bg-gradient-to-b from-[#8ca8fb] to-[#aca5fd] flex items-center relative overflow-hidden pt-16 pb-24 lg:py-32"
    >
      <BackgroundShapes />
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-16 mb-4">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
              Powerful Features
            </motion.span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-white mx-auto"></div>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
            Explore the rich capabilities of our school management system
          </p>
        </motion.div>

        {/* Mobile view - Features in grid with center image */}
        <div className="lg:hidden space-y-6">
          {/* Top 3 features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {features.slice(0, 3).map((feature, index) => (
              <FeatureCardMobile key={`mobile-feature-top-${index}`} feature={feature} index={index} />
            ))}
          </div>

          {/* Center phone image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-20 w-[250px] mx-auto"
          >
            <div className="relative w-[250px] h-[500px] rounded-xl overflow-hidden shadow-lg">
              {/* <Iphone15Pro className="w-[250px] h-[500px] rounded-xl" /> */}
              <Image
                src="https://res.cloudinary.com/dicfvq6fj/image/upload/v1742590379/mobilePreview_rbd8oc.png"
                alt="Mobile App Preview"
                fill
                className="object-cover border-4 border-white rounded-xl"
              />
            </div>

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
              <FeatureCardMobile key={`mobile-feature-bottom-${index}`} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* Desktop view - Hexagonal layout */}
        <div className="hidden lg:block relative">
          <div className="flex justify-center items-center">
            {/* Center phone image */}
            <motion.div
              initial={{ opacity: 0.5, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative shadow-xl rounded-3xl shadow-purple-950 z-20 w-[250px] mx-auto"
            >
              <div className="relative w-[250px] h-[500px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://res.cloudinary.com/dicfvq6fj/image/upload/v1742590379/mobilePreview_rbd8oc.png"
                  alt="Mobile App Preview"
                  fill
                  className="object-cover border-4 border-white rounded-3xl"
                />
              </div>

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
              <FeatureCardDesktop
                key={`left-feature-${index}`}
                feature={features[index]}
                index={index}
                position="left"
              />
            ))}
          </div>

          {/* Right side features */}
          <div className="absolute right-0 top-0 h-full flex flex-col justify-around">
            {[1, 3, 5].map((index) => (
              <FeatureCardDesktop
                key={`right-feature-${index}`}
                feature={features[index]}
                index={index}
                position="right"
              />
            ))}
          </div>
        </div>
      </div>

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
            className="fill-current text-[#928af0]/40"
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
            className="fill-current text-[#5a53be]"
          />
        </svg>
      </div>
    </section>
  )
}

// Feature Card Components

interface FeatureType {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  iconBg: string
  iconColor: string
}

interface FeatureCardMobileProps {
  feature: FeatureType
  index: number
}

/**
 * Mobile feature card component
 */
const FeatureCardMobile: React.FC<FeatureCardMobileProps> = ({ feature, index }) => {
  return (
    <motion.div
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
      <p className="text-white/90 text-xs leading-tight">{feature.description}</p>
    </motion.div>
  )
}

interface FeatureCardDesktopProps {
  feature: FeatureType
  index: number
  position: "left" | "right"
}

/**
 * Desktop feature card component with different styles for left/right placement
 */
const FeatureCardDesktop: React.FC<FeatureCardDesktopProps> = ({ feature, index, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.03, x: position === "left" ? 5 : -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
      className={`bg-gradient-to-${position === "left" ? "r" : "l"} ${feature.color} rounded-lg p-4 shadow-lg w-[300px] transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${feature.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
          <motion.div
            className={feature.iconColor}
            initial={{ rotate: position === "left" ? -10 : 10 }}
            whileHover={{ rotate: 0, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {feature.icon}
          </motion.div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{feature.title}</h3>
          <p className="text-white/90 text-xs mt-1">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

