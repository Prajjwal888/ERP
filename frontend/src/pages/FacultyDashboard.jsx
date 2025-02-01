import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import StudentDetails from "../components/faculty/StudentDetails";
import FacultyProfile from "../components/faculty/FacultyProfile";
import UploadMarks from "../components/faculty/UploadMarks";
import FacultyNotice from "../components/faculty/FacultyNotice";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderSection = () => {
    switch (activeTab) {
      case "Profile":
        return <FacultyProfile />;
      case "Student Info":
        return <StudentDetails />;
      case "Upload Marks":
        return <UploadMarks />;
      case "Timetable":
        return <Profile />;
      case "Notice":
        return <FacultyNotice />;
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
