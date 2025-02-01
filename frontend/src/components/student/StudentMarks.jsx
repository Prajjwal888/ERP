import React, { useEffect, useState } from "react";
import axios from "axios";
const StudentMarks = () => {
  const [marks, setMarks] = useState([]);
  const [semester, setSemester] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/student/getMarks",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.marks);
      setMarks(response.data.marks);
      setSemester(response.data.semester);
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Semester {semester} Marksheet
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-10">
          <div className="space-y-4">
            {marks.map((mark, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 pb-2"
              >
                <h2 className="text-lg font-medium text-gray-700">
                  {mark.subject}
                </h2>
                <span className="text-lg font-semibold text-gray-900">
                  {mark.marks !== null ? mark.marks : "--"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;
