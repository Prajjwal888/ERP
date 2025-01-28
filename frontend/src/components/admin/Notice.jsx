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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notices</h2>
      <div className="mb-4">
        {notices.map((notice, index) => (
          <div key={index} className="mb-4 border rounded-lg p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {notice.title}
            </h3>
            <p>{notice.description}</p>
            <div className="text-sm text-gray-500 mt-2">{notice.date}</div>
          </div>
        ))}
      </div>

      {isAddingNotice ? (
        <div className="border p-4 mb-4">
          <h3 className="text-lg font-bold mb-4">Add New Notice</h3>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Notice Title"
              value={formValues.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              name="description"
              placeholder="Notice Description"
              value={formValues.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            ></textarea>
            <input
              type="text"
              name="link"
              placeholder="Notice Link (If any, else leave blank)"
              value={formValues.link}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />
            <select
              name="type"
              value={formValues.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="both">Both</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddNotice}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} /> Add Notice
            </button>
            <button
              onClick={() => setIsAddingNotice(false)}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <X size={16} /> Close
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingNotice(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Add Notice
        </button>
      )}
    </div>
  );
};

export default Notice;
