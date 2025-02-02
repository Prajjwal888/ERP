import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadMaterial() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf", "video/mp4"];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Only PNG, JPG, PDF, and MP4 are allowed.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subject || !file) {
      toast.error("Please enter title, select subject, and upload a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file);
    

    try {
      await axios.post("/api/faculty/uploadMaterial", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Material uploaded successfully");
    } catch (e) {
      setError(e.response?.data?.message || "An error occurred while uploading material");
      console.error("Error details:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Upload Materials
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col items-center">
        <div className="max-w-lg w-full p-8 bg-gray-50 rounded-lg shadow-lg text-center flex flex-col justify-center min-h-[500px]">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Material</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300 placeholder-gray-500"
              placeholder="Material Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">-- Select Subject --</option>
              <option value="DBMS">DBMS</option>
              <option value="ADA">ADA</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
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
                  accept="image/png, image/jpeg, application/pdf, video/mp4"
                  onChange={handleFileChange}
                />
                <span>📂 Upload Material (JPG, PNG, PDF, MP4)</span>
              </div>
              {file && <p className="text-sm text-gray-600 mt-2">Selected file: {file.name}</p>}
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Material"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}