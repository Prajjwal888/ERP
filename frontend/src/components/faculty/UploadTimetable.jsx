import { useState, useRef } from "react";

export default function UploadTimetable() {
  const [department, setDepartment] = useState("Computer Science And Engineering");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Reference to the file input

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!semester || !file) {
      alert("Please select a semester and upload a file.");
      return;
    }
    alert(`Timetable uploaded for ${department}, Semester: ${semester}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Add TimeTable
      </h1>
    <div className="max-w-lg mx-auto p-6 bg-gray-520 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Timetable</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <select
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300"
            value={department}
            disabled
          >
            <option>Computer Science And Engineering</option>
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
              <option key={sem} value={sem}>Semester {sem}</option>
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
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
        >
          Add Timetable
        </button>
      </form>
    </div>
    </div>
  );
}
