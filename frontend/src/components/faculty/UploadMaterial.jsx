import { useState, useRef } from "react";

export default function UploadMaterial() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !subject || !file) {
      alert("Please enter title, select subject, and upload a file.");
      return;
    }
    alert(`Material uploaded: ${title}, Subject: ${subject}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Upload Materials
      </h1>
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
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
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
                onChange={handleFileChange}
              />
              <span>📂 Upload Material</span>
            </div>
            {file && <p className="text-sm text-gray-600 mt-2">Selected file: {file.name}</p>}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Add Material
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
