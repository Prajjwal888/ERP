import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Profile from "../components/admin/Profile";
import Notice from "../components/admin/Notice";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const renderSection = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Notice":
        return <Notice />;
      case "Student":
        return <Notice />;
      case "Faculty":
        return <Notice />;
      case "Subjects":
        return <Notice />;
      case "Admins":
        return <Notice />;
      case "Branch":
        return <Notice />;
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
