import React, { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const FacultyDetails = () => {
  const [isAddFaculty, setIsAddFaculty] = useState(true);
  const [loginId, setLoginId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const toggleMode = () => {
    setIsAddFaculty(!isAddFaculty);
    setSearchResult(null);
  };

  const handleAddFaculty = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newFaculty = {
      loginid: Number(formData.get("loginId")),
      password: formData.get("password"),
      employeeId: Number(formData.get("employeeId")),
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: Number(formData.get("phoneNumber")),
      profile: formData.get("profile"),
      department: formData.get("department"),
      gender: formData.get("gender"),
      experience: Number(formData.get("experience")),
      post: formData.get("post"),
    };
    console.log(newFaculty);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/addFaculty",
        newFaculty,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      event.target.reset();
      toast.success("Successfully Added Faculty");
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/getFaculty",
        { loginid: Number(loginId) },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSearchResult(response.data.existingFaculty || null);
      toast.success("Faculty found!");
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800">
          Faculty Details
        </h1>
        <div className="flex gap-6 text-gray-600">
          <button
            className={`font-medium transition-all ${
              isAddFaculty
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            Add Faculty
          </button>
          <button
            className={`font-medium transition-all ${
              !isAddFaculty
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            View Faculty
          </button>
        </div>
      </div>
      {isAddFaculty ? (
        <form
          className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleAddFaculty}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Login ID
              </label>
              <input
                type="number"
                name="loginId"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <input
                type="number"
                name="employeeId"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile
              </label>
              <input
                type="text"
                name="profile"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Post
              </label>
              <input
                type="text"
                name="post"
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
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-center items-center gap-6">
            <input
              type="number"
              placeholder="Employee ID"
              className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleSearch}
            >
              <span className="sr-only">Search</span>
              <Search className="w-5 h-5" />
            </button>
          </div>
          {searchResult && (
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Faculty Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Login ID
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.loginid}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Employee ID
                  </label>
                  <p className="mt-1 text-gray-900">
                    {searchResult.employeeId}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <p className="mt-1 text-gray-900">
                    {searchResult.middleName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="mt-1 text-gray-900">
                    {searchResult.phoneNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.profile}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <p className="mt-1 text-gray-900">
                    {searchResult.department}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience
                  </label>
                  <p className="mt-1 text-gray-900">
                    {searchResult.experience}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Post
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.post}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyDetails;
