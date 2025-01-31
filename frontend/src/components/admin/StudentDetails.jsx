import React, { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
const StudentDetails = () => {
  const [isAddStudent, setIsAddStudent] = useState(true);
  const [searchEnrollmentNo, setSearchEnrollmentNo] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const toggleMode = () => {
    setIsAddStudent(!isAddStudent);
    setSearchResult(null);
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newStudent = {
      loginid: Number(formData.get("loginId")),
      password: formData.get("password"),
      enrollmentNo: Number(formData.get("enrollmentNo")),
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: Number(formData.get("phoneNumber")),
      semester: Number(formData.get("semester")),
      branch: formData.get("branch"),
      gender: formData.get("gender"),
      profile: formData.get("profile"),
    };
    console.log(newStudent);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/addStudent",
        newStudent,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      event.target.reset();
      toast.success("Successfully Added Student");
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };
  const handleSearch = async () => {
    try {
      console.log(searchEnrollmentNo);
      const response = await axios.post(
        "http://localhost:4000/api/admin/getStudent",
        { loginid: Number(searchEnrollmentNo) },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSearchResult(response.data.student || null);
      toast.success("Student found!");
    } catch (error) {
      console.log(error.response?.data?.msg || error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    }
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800">
          Student Details
        </h1>
        <div className="flex gap-6 text-gray-600">
          <button
            className={`font-medium transition-all ${
              isAddStudent
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            Add Student
          </button>
          <button
            className={`font-medium transition-all ${
              !isAddStudent
                ? "border-b-2 border-blue-500 text-blue-500"
                : "hover:text-blue-500"
            }`}
            onClick={toggleMode}
          >
            View Student
          </button>
        </div>
      </div>
      {isAddStudent ? (
        <form
          className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleAddStudent}
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
                Enrollment No.
              </label>
              <input
                type="number"
                name="enrollmentNo"
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
                Semester
              </label>
              <input
                type="number"
                name="semester"
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Branch
              </label>
              <input
                type="text"
                name="branch"
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
                Profile
              </label>
              <input
                type="text"
                name="profile"
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
              placeholder="Enrollment No."
              className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchEnrollmentNo}
              onChange={(e) => setSearchEnrollmentNo(e.target.value)}
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
                Student Details
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
                    Enrollment No.
                  </label>
                  <p className="mt-1 text-gray-900">
                    {searchResult.enrollmentNo}
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
                    Semester
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.semester}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Branch
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.branch}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile
                  </label>
                  <p className="mt-1 text-gray-900">{searchResult.profile}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
