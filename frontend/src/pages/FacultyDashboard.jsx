import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderSection = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "StudentInfo":
        return <Notice />;
      case "UploadMarks":
        return <Notice />;
      case "Timetable":
        return <Profile />;
      case "Notice":
        return <Notice />;
      case "Material":
        return <Notice />;

      default:
        return <div>Select a section to view.</div>;
    }
  };
  return (
    <>
      <div className="faculty-header">
        <Header role="Faculty" />
      </div>
      <div className="faculty-dashboard">
        <Navbar
          role="faculty"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="section-content">{renderSection()}</div>
      </div>
    </>
  );
};

export default FacultyDashboard;
