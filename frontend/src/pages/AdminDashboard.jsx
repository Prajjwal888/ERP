import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Profile from "../components/admin/Profile";
import Notice from "../components/admin/Notice";
import StudentDetails from "../components/admin/StudentDetails"
import FacultyDetails from "../components/admin/FacultyDetails"
import SubjectDetails from "../components/admin/SubjectDetails"
import AdminDetails from "../components/admin/AdminDetails"
import BranchDetails from "../components/admin/BranchDetails"
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const renderSection = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Notice":
        return <Notice />;
      case "Student":
        return <StudentDetails/>;
      case "Faculty":
        return <FacultyDetails />;
      case "Subjects":
        return <SubjectDetails />;
      case "Admins":
        return <AdminDetails />;
      case "Branch":
        return <BranchDetails />;
      default:
        return <div>Select a section to view.</div>;
    }
  };
  return (
    <>
      <div className="admin-header">
        <Header role="Admin" />
      </div>
      <div className="admin-dashboard">
        <Navbar
          role="admin"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="section-content">{renderSection()}</div>
      </div>
    </>
  );
};

export default AdminDashboard;
