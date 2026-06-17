import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import StudentProfile from "../components/student/StudentProfile";
import StudentNotices from '../components/student/StudentNotices'
import StudentTimeTable from "../components/student/StudentTimeTable";
import StudentMaterial from "../components/student/StudentMaterial";
import StudentMarks from "../components/student/StudentMarks";
import StudentChatbot from "../components/student/StudentChatbot";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderSection = () => {
    switch (activeTab) {
      case "Profile":
        return <StudentProfile />;
      case "Notice":
        return <StudentNotices/>;
      case "Timetable":
        return <StudentTimeTable />;
      case "Material":
        return <StudentMaterial />;
      case "Marks":
        return <StudentMarks />;
      case "Chatbot":
        return <StudentChatbot />;
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
