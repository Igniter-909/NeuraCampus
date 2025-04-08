"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import all the components we created
import { Navbar } from "@/components/homePage/Navbar";
import { HeroSection } from "@/components/homePage/HeroSection";
import { AboutSection } from "@/components/homePage/AboutSection";
import { FeaturesSection } from "@/components/homePage/FeaturesSection";
import { WorkSection } from "@/components/homePage/WorkSection";
import { ContactSection } from "@/components/homePage/ContactSection";
import { Footer } from "@/components/homePage/Footer";
import { WhyUs } from "@/components/homePage/WhyUs";
import { BackgroundShapes } from "@/components/ui/background-shapes";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // IntersectionObserver to track active section
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

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

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
      // Smooth scrolling logic
      ref.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  };

  useEffect(() => {
    // Ensure the page starts at the top on load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let isThrottled = false;

    const handleScroll = (event: WheelEvent) => {
      if (isThrottled) return;

      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 100); // Adjust the throttle duration (100ms for slower scroll)

      const scrollAmount = event.deltaY > 0 ? 50 : -50; // Adjust scroll speed (50px per scroll)
      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth", // Smooth scrolling
      });
    };

    // Add event listener to restrict scroll speed
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      // Cleanup event listener
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Apply smooth scrolling globally */}
      <style jsx global>{`
        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 6px; /* Make the scrollbar thinner */
          height: 6px; /* For horizontal scrollbars */
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.5); /* Darker thumb for visibility */
          border-radius: 10px; /* Rounded edges */
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.7); /* Darker on hover */
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1); /* Light track */
        }

        /* Ensure no horizontal scrolling */
        html, body {
          overflow-x: hidden;
        }
      `}</style>

      {/* Navbar */}
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
        setMobileMenuOpen={setIsMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main content */}
      <motion.div 
        ref={mainContentRef}
        animate={{ 
          filter: isMobileMenuOpen ? "blur(8px) brightness(0.6)" : "blur(0px) brightness(1)",
          scale: isMobileMenuOpen ? 0.97 : 1
        }}
        transition={{ duration: 0.4 }}
        className="relative transition-all overflow-hidden"
      >
        <BackgroundShapes />
        
        {/* Render all sections */}
        <div className="w-full"> {/* Use w-full instead of 100vw */}
          <HeroSection id="home" forwardedRef={homeRef} />
          <AboutSection id="about" forwardedRef={aboutRef} />
          <FeaturesSection id="features" forwardedRef={featuresRef} />
          <WhyUs id="whyus" forwardedRef={whyUsRef} />
          <WorkSection id="work" forwardedRef={workRef} />
          <ContactSection id="contact" forwardedRef={contactRef} />
        </div>
        <Footer />
      </motion.div>
    </div>
  );
}