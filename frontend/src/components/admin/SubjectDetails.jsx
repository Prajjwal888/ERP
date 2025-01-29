import React, { useState } from "react";
import { Search } from "lucide-react";

const SubjectDetails = () => {
  const [isAddSubject, setIsAddSubject] = useState(true);

  const toggleMode = () => {
    setIsAddSubject(!isAddSubject);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800">
          Subject Details
        </h1>
        <div className="flex gap-6 text-gray-600">
          <button
            className={`font-medium transition-all ${isAddSubject ? "border-b-2 border-blue-500 text-blue-500" : "hover:text-blue-500"}`}
            onClick={toggleMode}
          >
            Add Subject
          </button>
          <button
            className={`font-medium transition-all ${!isAddSubject ? "border-b-2 border-blue-500 text-blue-500" : "hover:text-blue-500"}`}
            onClick={toggleMode}
          >
            View Subject
          </button>
        </div>
      </div>
      {isAddSubject ? (
        <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Code</label>
              <input
                type="text"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Name</label>
              <input
                type="text"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            >
              Add Subject
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center items-center gap-6 bg-white p-8 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Enter Subject Code"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <span className="sr-only">Search</span>
            <Search className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
