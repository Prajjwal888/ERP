import React, { useState } from "react";

const BranchDetails = () => {
  const [isAddBranch, setIsAddBranch] = useState(true);

  const toggleMode = () => {
    setIsAddBranch(!isAddBranch);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold border-l-4 border-red-500 pl-2">
          Branch Details
        </h1>
        <div className="flex gap-4 text-black">
          <button
            className={`font-medium ${isAddBranch ? "border-b-2 border-blue-500" : "hover:underline"}`}
            onClick={toggleMode}
          >
            Add Branch
          </button>
          <button
            className={`font-medium ${!isAddBranch ? "border-b-2 border-blue-500" : "hover:underline"}`}
            onClick={toggleMode}
          >
            View Branch
          </button>
        </div>
      </div>
      {isAddBranch ? (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md shadow-blue-100">
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input type="text" className="mt-1 border border-gray-300 rounded-md px-4 py-2 w-full" required />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-32"
            >
              Add Branch
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center items-center gap-6 bg-white p-8 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Enter Branch Name"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            View Branch
          </button>
        </div>
      )}
    </div>
  );
};

export default BranchDetails;
