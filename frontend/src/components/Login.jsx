import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const Login = ({ activeSection }) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const section = activeSection.toLowerCase();
    const loginid = Number(loginId);
    try {
      const response = await axios.post(
        `/api/${section}/login`,
        { loginid, password }
      );
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", response.data.token);
      }
      toast.success("Successfully Logged In");
      if (activeSection === "Admin") {
        navigate("/admin");
      } else if (activeSection === "Faculty") {
        navigate("/faculty");
      } else if (activeSection === "Student") {
        navigate("/student");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error);
      toast.error(error.response?.data?.message || "An error occurred!");
    }
    console.log("Login attempted with:", loginId, password, activeSection);
  };
  return (
    <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-md">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {activeSection} Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="loginId"
                className="block text-sm font-medium text-gray-700"
              >
                {activeSection} Login ID
              </label>
              <input
                type="text"
                id="loginId"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your ID"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
