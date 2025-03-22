"use client"
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import all the components we created
import { Navbar } from "@/components/homePage/Navbar";
import { HeroSection } from "@/components/homePage/HeroSection";
import { AboutSection } from "@/components/homePage/AboutSection";
import { FeaturesSection } from "@/components/homePage/FeaturesSection";
import { WorkSection } from "@/components/homePage/WorkSection";
import { ContactSection } from "@/components/homePage/ContactSection";
import { Footer } from "@/components/homePage/Footer";
import { WhyUs } from "@/components/homePage/WhyUs";

/**
 * Main page component that composes all homepage sections
 * Handles section navigation and intersection observation
 */
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Create refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer to update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [homeRef.current, aboutRef.current, featuresRef.current, whyUsRef.current, workRef.current, contactRef.current];
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    
    // Clean up when component unmounts
    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    let ref;
    switch (sectionId) {
      case "home":
        ref = homeRef;
        break;
      case "about":
        ref = aboutRef;
        break;
      case "features":
        ref = featuresRef;
        break;
      case "whyus":
        ref = whyUsRef;
        break;
      case "work":
        ref = workRef;
        break;
      case "contact":
        ref = contactRef;
        break;
      default:
        ref = homeRef;
    }

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(sectionId);
  };

  // Reset scroll position when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fixed Navigation */}
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
        setMobileMenuOpen={setIsMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main content sections with enhanced blur effect when mobile menu is open */}
      <motion.div 
        ref={mainContentRef}
        animate={{ 
          filter: isMobileMenuOpen ? "blur(8px) brightness(0.6)" : "blur(0px) brightness(1)",
          scale: isMobileMenuOpen ? 0.97 : 1
        }}
        transition={{ duration: 0.4 }}
        className="relative transition-all"
      >
        <HeroSection id="home" forwardedRef={homeRef} />
        <AboutSection id="about" forwardedRef={aboutRef} />
        <FeaturesSection id="features" forwardedRef={featuresRef} />
        <WhyUs id="whyus" forwardedRef={whyUsRef} />
        <WorkSection id="work" forwardedRef={workRef} />
        <ContactSection id="contact" forwardedRef={contactRef} />

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}