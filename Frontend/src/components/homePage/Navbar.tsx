import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavItem } from "./NavItem";
import { MobileNavItem } from "./MobileNavItem";
import Image from "next/image";
import logo from "../../../public/logo11.svg";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

/**
 * Navigation component for the homepage
 * Includes responsive mobile menu and section navigation
 */
export const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation links including the WhyUs section
  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Features", id: "features" },
    { name: "Why Us", id: "whyus" },
    { name: "Our Work", id: "work" },
    { name: "Contact", id: "contact" },
  ];

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-transparent shadow-md backdrop-blur-sm">
      <div
        className={`w-full mx-auto flex items-center justify-between p-3 lg:px-8 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f1c3f]/90 backdrop-blur-md shadow-xl"
            : "bg-transparent"
        }`}
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
        </div>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center text-white p-2 hover:bg-blue-800/20 rounded-md"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-[#10234f]/95 backdrop-blur-md shadow-xl">
            <div className="py-2">
              {links.map((link) => (
                <MobileNavItem
                  key={link.id}
                  id={link.id}
                  label={link.name}
                  activeSection={activeSection}
                  scrollToSection={scrollToSection}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Only keep the AuthButton components
interface AuthButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
    >
      {children}
    </button>
  );
};

const MobileAuthButton: React.FC<AuthButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
    >
      {children}
    </button>
  );
}; 