import { useEffect, useState } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { NavItem } from "./NavItem";
import { MobileNavItem } from "./MobileNavItem";
import Image from "next/image";
import logo from "../../../public/logo11.svg";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Navigation component for the homepage
 * Includes responsive mobile menu and section navigation
 * Features dynamic colors and glassmorphism that adapts to each section
 */
export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  scrollToSection,
  isMobileMenuOpen,
  setMobileMenuOpen 
}) => {
  const [scrolled, setScrolled] = useState(false);
  
  // Navigation links including the WhyUs section
  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Features", id: "features" },
    { name: "Why Us", id: "whyus" },
    { name: "Our Work", id: "work" },
    { name: "Contact", id: "contact" },
  ];

  // Section-based color influences (more subtle)
  const sectionColors = {
    home: "from-[#102051]/30 to-[#153677]/40",
    about: "from-[#3a70ca]/30 to-[#2a4080]/40",
    features: "from-[#8ca8fb]/30 to-[#aca5fd]/40",
    whyus: "from-[#a692f0]/30 to-[#6f42c1]/40",
    work: "from-[#5442f2]/30 to-[#0d117e]/40",
    contact: "from-[#172a54]/30 to-[#0d1635]/40",
  };

  // Enhanced glass overlay colors
  const glassOverlay = {
    home: "bg-white/5",
    about: "bg-white/5",
    features: "bg-white/10",
    whyus: "bg-white/10",
    work: "bg-white/5",
    contact: "bg-white/5",
  };

  // Handle login and signup
  // const handleLogin = () => {
  //   console.log("Login clicked");
  //   // Will be implemented with actual authentication
  // };

  // const handleSignup = () => {
  //   console.log("Signup clicked");
  //   // Will be implemented with actual authentication
  // };

  // Handle mobile navigation click - improved for better scroll behavior
  const handleMobileNavClick = (sectionId: string) => {
    // First close the menu to avoid interference with scrolling
    setMobileMenuOpen(false);
    
    // Short delay to allow animation to complete before scrolling
    setTimeout(() => {
      // Find the element to scroll to
      const element = document.getElementById(sectionId);
      if (element) {
        // Get its position
        const yOffset = -70; // Adjust for navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        // Use window.scrollTo for more reliable scrolling
        window.scrollTo({
          top: y,
          behavior: "smooth"
        });
        
        // Use the scrollToSection to handle updating the active section
        scrollToSection(sectionId);
      } else {
        // Fallback to the original method if element not found
        scrollToSection(sectionId);
      }
    }, 400);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Get current section color or default with appropriate transparency
  const currentSectionColor = scrolled ? 
    sectionColors[activeSection as keyof typeof sectionColors] || "from-[#0f1c3f]/20 to-[#10234f]/30" : 
    "from-transparent to-transparent";
    
  const currentGlassEffect = scrolled ? 
    glassOverlay[activeSection as keyof typeof glassOverlay] || "bg-white/5" : 
    "bg-transparent";

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      <div
        className={`w-full mx-auto flex items-center justify-between p-3 lg:px-8 transition-all duration-700 
          bg-gradient-to-r ${currentSectionColor} backdrop-blur-sm ${currentGlassEffect}
          ${scrolled ? "shadow-lg border-b border-white/10" : ""}
        `}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image className="h-8 w-auto" src={logo} alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold text-white">
            Neura<span className="text-blue-300">Campus</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {links.map((link) => (
            <NavItem 
              key={link.id}
              id={link.id}
              label={link.name}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
            />
          ))}
          
          {/* Auth Buttons - Desktop
          <div className="flex items-center ml-4 space-x-2">
            <AuthButton onClick={handleLogin}>
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </AuthButton>
            <AuthButton 
              onClick={handleSignup}
              className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 hover:text-white"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Sign Up
            </AuthButton>
          </div> */}
        </div>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center text-white p-2 hover:bg-white/10 rounded-md transition-all duration-300"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation Menu with improved blur and animations */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Full screen backdrop blur overlay */}
              <motion.div 
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[-1] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile menu drawer */}
              <motion.div 
                className="absolute top-full left-0 right-0 md:hidden bg-gradient-to-b from-[#102051] to-[#0d117e] border-t border-blue-300/20 shadow-2xl rounded-b-2xl overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="py-3 px-2">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <button
                        onClick={() => handleMobileNavClick(link.id)}
                        className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-300 flex items-center 
                          ${activeSection === link.id 
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-blue-700/40"
                          }`}
                      >
                        {link.name}
                      </button>
                    </motion.div>
                  ))}
                  
                  {/* Auth Buttons - Mobile
                  <div className="mt-4 px-2 space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: links.length * 0.05, duration: 0.3 }}
                    >
                      <MobileAuthButton onClick={handleLogin}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </MobileAuthButton>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: links.length * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <button
                        onClick={handleSignup}
                        className="w-full px-4 py-3 flex justify-center items-center text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </button>
                    </motion.div>
                  </div> */}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// // Auth Button components
// interface AuthButtonProps {
//   children: React.ReactNode;
//   onClick: () => void;
//   className?: string;
// }

// const AuthButton: React.FC<AuthButtonProps> = ({ children, onClick, className = "" }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-lg border-white text-white hover:bg-white/10 hover:text-white transition-all ease-in-out duration-300 ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

// const MobileAuthButton: React.FC<AuthButtonProps> = ({ children, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full px-4 py-3 flex justify-center items-center text-sm font-medium rounded-lg bg-transparent border border-blue-300/30 text-white hover:bg-white/10 transition-all duration-300"
//     >
//       {children}
//     </button>
//   );
// }; 