import React, { useState } from "react";
import { User,GraduationCap, Presentation, Book, Bell,ShieldCheck,BrainCircuit } from "lucide-react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { name: "Profile", icon: <User className="w-5 h-5" /> },
    { name: "Student", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Faculty", icon: <Presentation className="w-5 h-5" /> },
    { name: "Branch", icon: <BrainCircuit className="w-5 h-5" /> },
    { name: "Notice", icon: <Bell className="w-5 h-5" /> },
    { name: "Subjects", icon: <Book className="w-5 h-5" />},
    { name: "Admins", icon: <ShieldCheck className="w-5 h-5" />}
  ];

  return (
    <div className="flex justify-around bg-white py-4 border-b-2 border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
            activeTab === tab.name
              ? "bg-[#e6f2ff] text-black border border-[#007bff]"
              : "bg-[#007bff] text-white hover:bg-[#0056b3]"
          }`}
        >
          {tab.icon}
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
