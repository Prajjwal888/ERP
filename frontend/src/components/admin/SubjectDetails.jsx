import React, { useState } from "react";

const SubjectDetails = () => {
  const [isAddSubject, setIsAddSubject] = useState(true);

  const toggleMode = () => {
    setIsAddSubject(!isAddSubject);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold border-l-4 border-red-500 pl-2">
          Subject Details
        </h1>
        <div className="flex gap-4 text-black">
          <button
            className={`font-medium ${isAddSubject ? "border-b-2 border-blue-500" : "hover:underline"}`}
            onClick={toggleMode}
          >
            Add Subject
          </button>
          <button
            className={`font-medium ${!isAddSubject ? "border-b-2 border-blue-500" : "hover:underline"}`}
            onClick={toggleMode}
          >
            View Subject
          </button>
        </div>
      </div>
      {isAddSubject ? (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md shadow-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Code</label>
              <input type="text" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Name</label>
              <input type="text" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-32"
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
            View Subject
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;