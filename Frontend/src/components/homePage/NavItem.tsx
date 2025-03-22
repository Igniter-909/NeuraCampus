import React from "react";

interface NavItemProps {
  id: string;
  label?: string;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export const NavItem: React.FC<NavItemProps> = ({ id, label, activeSection, scrollToSection }) => {
  const displayName = label || id.charAt(0).toUpperCase() + id.slice(1);
  const isActive = activeSection === id;

  return (
    <button
      className={`px-3 py-2 lg:px-4 text-sm font-medium transition-colors rounded ${
        isActive
          ? "text-white bg-blue-600 shadow-md"
          : "text-blue-100 hover:text-white hover:bg-blue-800/20"
      }`}
      onClick={() => scrollToSection(id)}
    >
      {displayName}
    </button>
  );
}; 