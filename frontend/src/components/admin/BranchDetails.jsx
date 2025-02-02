import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BranchDetails = () => {
  const [isAddBranch, setIsAddBranch] = useState(true);
  const [branchName, setBranchName] = useState("");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "https://erp-sxpm.onrender.com/api/admin/getBranch",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBranches(response.data.allBranch);
      } catch (error) {
        console.log(error.response?.data?.msg || error);
        toast.error(error.response?.data?.msg || "An error occurred!");
      }
    };
    fetchBranches();
  }, []);

  const toggleMode = () => {
    setIsAddBranch(!isAddBranch);
  };

  const addBranch = async () => {
    if (!branchName) return;
    try {
      const response = await axios.post(
        "https://erp-sxpm.onrender.com/api/admin/addBranch",
        { name: branchName },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.msg);
      setBranchName("");
      setBranches([
        ...branches,
        { name: branchName, _id: response.data.branchId },
      ]);
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };

  const deleteBranch = async (id) => {
    try {
      await axios.delete(`https://erp-sxpm.onrender.com/api/admin/deleteBranch/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Branch deleted successfully");
      setBranches(branches.filter((branch) => branch._id !== id));
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800">
          Branch Details
        </h1>
        <div className="flex gap-4 text-gray-600">
          <button
            className={`font-medium transition-all ${
              isAddBranch
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            Add Branch
          </button>
          <button
            className={`font-medium transition-all ${
              !isAddBranch
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            View Branch
          </button>
        </div>
      </div>

      {isAddBranch ? (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Branch Name
          </label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="Enter Branch Name"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            type="submit"
            onClick={addBranch}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
          >
            Add Branch
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          {branches.length > 0 ? (
            <ul className="w-full divide-y divide-gray-300 rounded-lg overflow-hidden bg-gray-50 shadow">
              {branches.map((branch) => (
                <li
                  key={branch._id}
                  className="p-3 flex justify-between items-center text-gray-800 hover:bg-gray-100 transition-all"
                >
                  {branch.name}
                  <button
                    onClick={() => deleteBranch(branch._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No branches available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BranchDetails;
