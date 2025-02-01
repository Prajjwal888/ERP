import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import axios from "axios";

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/student/getNotice",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotices(response.data.notices);
    };
    fetchData();
  }, [notices]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold border-l-4 border-red-500 pl-2 text-gray-800">
          Notices
        </h1>
      </div>
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="border border-blue-300 rounded-lg p-3 bg-white shadow-md max-w-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {notice.title}
                </h2>
                <p className="text-sm text-gray-600 break-words">
                  {notice.description}
                </p>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2 whitespace-nowrap">
                <Calendar className="w-4 h-4" />
                <span>{notice.date} {notice.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentNotices;