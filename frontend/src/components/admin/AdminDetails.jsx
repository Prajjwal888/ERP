import React, { useState } from "react";

const AdminDetails = () => {
  const [isAddAdmin, setIsAddAdmin] = useState(true);

  const toggleMode = () => {
    setIsAddAdmin(!isAddAdmin);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold border-l-4 border-red-500 pl-2">
          Admin Details
        </h1>
        <div className="flex gap-4 text-black">
          <button
            className={`font-medium ${isAddAdmin ? "border-b-2 border-blue-500" : "hover:underline"}`}
            onClick={toggleMode}
          >
            Add Admin
          </button>
          <button
            className={`font-medium ${!isAddAdmin ? "border-b-2 border-blue-500" : "hover:underline"}`}
            onClick={toggleMode}
          >
            View Admin
          </button>
        </div>
      </div>
      {isAddAdmin ? (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md shadow-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Login ID</label>
              <input type="number" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input type="number" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input type="text" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="number" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile</label>
              <input type="text" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-32"
            >
              Add Admin
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center items-center gap-6 bg-white p-8 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Enter Admin Login ID"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            View Admin
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDetails;