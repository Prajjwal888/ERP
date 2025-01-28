import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderSection = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Notice":
        return <Notice />;
      case "Timetable":
        return <Notice />;
      case "Material":
        return <Profile />;
      case "Marks":
        return <Notice />;
      default:
        return <div>Select a section to view.</div>;
    }
  };

  return (
    <>
      <div className="student-header">
        <Header role="Student" />
      </div>
      <div className="student-dashboard">
        <Navbar role="student" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <div className="section-content">{renderSection()}</div>
      </div>
    </>
  );
};

export default StudentDashboard;
