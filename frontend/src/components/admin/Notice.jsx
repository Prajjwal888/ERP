import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const Notice = () => {
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [notices, setNotices] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    link: "",
    type: "both",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddNotice = () => {
    setNotices([
      ...notices,
      { ...formValues, date: new Date().toLocaleString() },
    ]);
    setFormValues({ title: "", description: "", link: "", type: "both" });
    setIsAddingNotice(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">Notices</h1>
      <div className="space-y-6 mb-6">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md space-y-2"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {notice.title}
            </h3>
            <p className="text-gray-600">{notice.description}</p>
            {notice.link && (
              <a
                href={notice.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {notice.link}
              </a>
            )}
            <div className="text-sm text-gray-500 mt-2">{notice.date}</div>
          </div>
        ))}
      </div>

      {isAddingNotice ? (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add New Notice</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Notice Title"
              value={formValues.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="description"
              placeholder="Notice Description"
              value={formValues.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <input
              type="text"
              name="link"
              placeholder="Notice Link (If any, else leave blank)"
              value={formValues.link}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="type"
              value={formValues.type}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="both">Both</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={handleAddNotice}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 focus:ring-2 focus:ring-blue-400"
            >
              <Plus size={16} /> Add Notice
            </button>
            <button
              onClick={() => setIsAddingNotice(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2 focus:ring-2 focus:ring-red-400"
            >
              <X size={16} /> Close
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => setIsAddingNotice(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 focus:ring-2 focus:ring-blue-400"
          >
            <Plus size={16} /> Add Notice
          </button>
        </div>
      )}
    </div>
  );
};

export default Notice;
