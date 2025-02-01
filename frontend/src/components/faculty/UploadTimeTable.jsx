import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function UploadTimetable() {
  const [branches, setBranches] = useState([]);
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // Reference to the file input

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/faculty/getBranch", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!semester || !file || !department) {
      alert("Please select a department, semester, and upload a file.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("branch", department);
    formData.append("semester", semester);
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/faculty/uploadTimetable",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Timetable added successfully");
    } catch (e) {
      setError(e.response?.data?.message || "An error occurred while uploading the timetable");
      console.error("Error details:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Add Timetable
      </h1>

      <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Timetable</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <select
              className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">-- Select Department --</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <select
              className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">-- Select Semester --</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 flex flex-col items-center">
            <div
              className="w-full p-4 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
              onClick={() => fileInputRef.current.click()} // Open file manager on click
            >
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <span>📂 Upload Timetable</span>
            </div>
            {file && <p className="text-sm text-gray-600 mt-2">Selected file: {file.name}</p>}
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white transition-all ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Timetable"}
          </button>
        </form>
      </div>
    </div>
  );
}