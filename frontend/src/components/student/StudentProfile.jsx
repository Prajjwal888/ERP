import React from "react";
import { IdCard, Phone, Mail } from "lucide-react";

const StudentProfile = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Student Profile
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="space-y-6">
              <div className="flex items-center">
                <IdCard className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="text-lg font-medium text-gray-900">2211201365</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-lg font-medium text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-medium text-gray-900">ily@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;