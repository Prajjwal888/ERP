import { React, useState } from "react";
import LoginNavbar from "../components/LoginNavbar";
import Login from "../components/Login";
const Home = () => {
  const [activeSection, setActiveSection] = useState("Student");
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <LoginNavbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        ></LoginNavbar>
        <Login activeSection={activeSection}></Login>
      </div>
    </div>
  );
};

export default Home;
