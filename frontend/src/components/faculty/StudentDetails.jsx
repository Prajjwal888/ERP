import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import axios from "axios";
const StudentDetails = () => {
  const [scholarNo, setScholarNo] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudentDetails = async () => {
    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const response = await axios.post(
        "/api/faculty/getStudent",
        {
          loginid: scholarNo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudent(response.data);
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "An error occurred while fetching student details"
      );
      console.error("Error details:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
      Student Information
    </h1>
    <div className="flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Enter scholar number to fetch details
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Scholar No"
                value={scholarNo}
                onChange={(e) => setScholarNo(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <button
                onClick={fetchStudentDetails}
                className={clsx(
                  "px-6 py-2 rounded-md text-white font-semibold flex items-center justify-center gap-2 transition duration-200",
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                )}
                disabled={loading}
              >
                {loading ? (
                  "Fetching..."
                ) : (
                  <>
                    Fetch <Search className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-6 py-4 bg-red-50 border-t border-red-200">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {student && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">
                Student Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", value: student.firstName },
                  { label: "Middle Name", value: student.middleName || "-" },
                  { label: "Last Name", value: student.lastName },
                  { label: "Branch", value: student.branch },
                  { label: "Semester", value: student.semester },
                  { label: "Email", value: student.email },
                  {
                    label: "Phone No",
                    value: student.phoneNo || "Not Available",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium text-black">{item.label}:</p>
                    <p className="text-gray-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDetails;