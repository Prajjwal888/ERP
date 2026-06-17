import React, { useState } from 'react';
import { User, GraduationCap, Presentation, Book, Bell, ShieldCheck, BrainCircuit, ArchiveRestore, BadgePercent, Clock, MessageCircle } from "lucide-react";
import { admin, faculty, student } from '../data/dashboardData';

const iconComponents = {
  User,
  GraduationCap,
  Presentation,
  Book,
  Bell,
  ShieldCheck,
  BrainCircuit,
  ArchiveRestore,
  Clock,
  BadgePercent,
  MessageCircle
};

const Navbar = ({ role ,activeTab,setActiveTab}) => {
  const data = role === 'admin' ? admin : role === 'faculty' ? faculty : student;
  
  return (
    <div className="flex justify-around bg-white py-4 border-b-2 border-gray-200">
      {data.map((item, index) => {
        const IconComponent = iconComponents[item.icon];
        return (
          <button
            key={index}
            onClick={() => setActiveTab(item.name)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
              activeTab === item.name
                ? "bg-[#e6f2ff] text-black border border-[#007bff]"
                : "bg-[#007bff] text-white hover:bg-[#0056b3]"
            }`}
          >
            <IconComponent className="w-5 h-5" />
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default Navbar;