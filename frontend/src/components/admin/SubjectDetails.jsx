import React, { useState, useEffect } from "react";
import { Search, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const SubjectDetails = () => {
  const [isAddSubject, setIsAddSubject] = useState(true);
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    loginid: "",
    subjectCode: "",
    name: "",
    branch: "",
    semester: "1",
  });
  const [searchParams, setSearchParams] = useState({
    branch: "",
    semester: "1",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/getBranch",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBranches(response.data.allBranch);
      } catch (error) {
        console.log(error.response?.data?.msg || error);
        toast.error(error.response?.data?.msg || "An error occurred!");
      }
    }
    fetchData();
  }, [branches]);

  const toggleMode = () => setIsAddSubject(!isAddSubject);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    formData.loginid=Number(formData.loginid);
    formData.semester=Number(formData.semester);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/addSubject",formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/getSubject",searchParams,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSubjects(response.data.subjects);
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/admin/deleteSubject/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSubjects(subjects.filter((subj) => subj.id !== id));
      handleSearch();
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800">
          Subject Details
        </h1>
        <div className="flex gap-6 text-gray-600">
          <button
            className={`font-medium transition-all ${
              isAddSubject
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            Add Subject
          </button>
          <button
            className={`font-medium transition-all ${
              !isAddSubject
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            View Subject
          </button>
        </div>
      </div>

      {isAddSubject ? (
        <form
          className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleAddSubject}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <input
              type="text"
              name="loginid"
              placeholder="Faculty ID"
              value={formData.loginid}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="subjectCode"
              placeholder="Subject Code"
              value={formData.subjectCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Subject Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
            >
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Subject
          </button>
        </form>
      ) : (
        <div>
          <div className="flex justify-center items-center gap-4 bg-white p-8 rounded-lg shadow-lg">
            <select
              name="branch"
              value={searchParams.branch}
              onChange={(e) =>
                setSearchParams({ ...searchParams, branch: e.target.value })
              }
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
            <select
              name="semester"
              value={searchParams.semester}
              onChange={(e) =>
                setSearchParams({ ...searchParams, semester: e.target.value })
              }
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
            >
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            {subjects.length > 0 ? (
              <ul>
                {subjects.map((subject) => (
                  <li
                    key={subject._id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span>
                      {subject.subjectCode} - {subject.name}
                    </span>
                    <button
                      onClick={() => handleDelete(subject._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No subjects found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
