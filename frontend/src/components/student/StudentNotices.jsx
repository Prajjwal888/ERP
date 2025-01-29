import React from "react";
import { Calendar, Trash2, Edit } from "lucide-react";

const notices = [
  {
    id: 1,
    title: "Tomorrow Is Half Day 🎉",
    description: "So Enjoy My Friends!",
    date: "11/12/2023",
    time: "13:34:10",
    audience: "Both",
  },
  {
    id: 2,
    title: "Exam Schedule Released",
    description: "Check the portal for more details.",
    date: "10/12/2023",
    time: "15:20:00",
    audience: "Students",
  },
];

const StudentNotices = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold border-l-4 border-red-500 pl-2 text-gray-800">
          Notices
        </h1>
      </div>
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {notice.title}
                </h2>
                <p className="text-sm text-gray-600">{notice.description}</p>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{notice.date} {notice.time}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-blue-500 text-white rounded-md px-4 py-1">
                {notice.audience}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentNotices;
