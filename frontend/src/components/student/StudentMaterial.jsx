import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentMaterial = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "/api/student/getSubject",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSubjects(response.data.subjectList);
      } catch (error) {
        console.log(error.response?.data?.msg || error);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!selectedSubject) {
      setMaterials([]);
      return;
    }

    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          `/api/student/getMaterial/${selectedSubject}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.materialList);
        setMaterials(response.data.materialList);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setMaterials([]);
      }
    };
    fetchMaterials();
  }, [selectedSubject]);
  const handleClick = (file) => {
    console.log(file);
    const link = document.createElement('a');
    const url= file.split("\\").pop();
    const imageUrl = `/uploads/${url}`;
    link.href = imageUrl;
    // link.download = `${semester}_sem_timetable.png`;
    link.click();
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Study Materials
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Subject:
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose a Subject --</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {materials.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Materials for{" "}
              {subjects.find((sub) => sub._id === selectedSubject)?.name}
            </h2>
            <div className="space-y-4">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {material.title}
                    </h3>
                  </div>
                  <button onClick={()=>handleClick(material.file)} className="text-blue-500 font-medium hover:underline">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          selectedSubject && (
            <div className="mt-6 text-center text-gray-500">
              No materials found for this subject.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentMaterial;