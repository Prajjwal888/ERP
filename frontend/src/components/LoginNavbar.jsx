import React from "react";
import { ShieldCheck, Users, GraduationCap } from "lucide-react";
const LoginNavbar = ({ activeSection, setActiveSection }) => {
  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="login-navbar">
      <nav className="bg-blue-600 p-4">
        <div className="flex justify-center space-x-8">
          <a
            onClick={() => handleNavClick("Student")}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeSection === "Student"
                ? "bg-white text-blue-600"
                : "text-white hover:bg-blue-700"
            }`}
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Student
          </a>
          <a
            onClick={() => handleNavClick("Faculty")}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeSection === "Faculty"
                ? "bg-white text-blue-600"
                : "text-white hover:bg-blue-700"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Faculty
          </a>
          <a
            onClick={() => handleNavClick("Admin")}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeSection === "Admin"
                ? "bg-white text-blue-600"
                : "text-white hover:bg-blue-700"
            }`}
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Admin
          </a>
        </div>
      </nav>
    </div>
  );
};

export default LoginNavbar;
