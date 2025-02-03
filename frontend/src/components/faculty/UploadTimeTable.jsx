import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadTimetable() {
  const [branches, setBranches] = useState([]);
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "https://erp-sxpm.onrender.com/api/faculty/getBranch",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBranches(response.data);
      } catch (e) {
        setError(e.response?.data?.message || "Error fetching branches");
        console.error("Error details:", e);
      }
    };

    fetchBranches();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Only PDF, PNG, and JPG are allowed.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department || !semester || !file) {
      toast.error("Please select a department, semester, and upload a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("branch", department);
    formData.append("semester", semester);
    formData.append("file", file);

    try {
      await axios.post(
        "https://erp-sxpm.onrender.com/api/faculty/uploadTimetable",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Timetable uploaded successfully");
      setDepartment("");
      setSemester("");
      setFile(null);
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "An error occurred while uploading the timetable"
      );
      console.error("Error details:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Upload Timetable
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Timetable
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <select
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">-- Select Department --</option>
            {branches.length > 0 ? (
              branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))
            ) : (
              <option disabled>Loading branches...</option>
            )}
          </select>

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

          <div className="flex flex-col items-center">
            <div
              className="w-full p-4 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="application/pdf, image/png, image/jpeg"
                onChange={handleFileChange}
              />
              <span>📂 Upload Timetable (PDF, PNG, JPG)</span>
            </div>
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected file: {file.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Timetable"}
          </button>
        </form>
      </div>
    </div>
  );
}
