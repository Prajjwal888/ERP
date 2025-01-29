import React, { useState } from "react";

const BranchDetails = () => {
  const [isAddBranch, setIsAddBranch] = useState(true);

  const toggleMode = () => {
    setIsAddBranch(!isAddBranch);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800">
          Branch Details
        </h1>
        <div className="flex gap-4 text-gray-600">
          <button
            className={`font-medium transition-all ${isAddBranch ? "border-b-2 border-blue-500 text-blue-500" : "hover:text-blue-500"}`}
            onClick={toggleMode}
          >
            Add Branch
          </button>
          <button
            className={`font-medium transition-all ${!isAddBranch ? "border-b-2 border-blue-500 text-blue-500" : "hover:text-blue-500"}`}
            onClick={toggleMode}
          >
            View Branch
          </button>
        </div>
      </div>

      {isAddBranch ? (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter Branch Name</label>
          <input
            type="text"
            placeholder="Enter Branch Name"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
          >
            Add Branch
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Enter Branch Name"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default BranchDetails;
