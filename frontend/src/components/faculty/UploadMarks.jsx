import { useState, useEffect } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import axios from "axios";

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function UploadMarks() {
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [submittedMarks, setSubmittedMarks] = useState({});
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (branch && semester) {
      fetchSubjects();
    }
  }, [branch, semester]);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/faculty/getBranch",
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );
    //   console.log(response.data);
      setBranches(response.data);
    } catch (error) {
      console.error(
        "Error fetching branches:",
        error.response?.data?.message || error.message
      );
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/faculty/getSubject",
        {
          branchName: branch,
          semester: Number(semester),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSubjects(response.data);
    } catch (error) {
      console.error(
        "Error fetching subjects:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleMarkChange = (id, value) => {
    setMarks((prev) => ({ ...prev, [id]: value }));
  };

  const submitMarks = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/faculty/submitMarks",
        {
          studentId: id,
          subjectId: subjects.find((s) => s.name === subject)?.id,
          marks: marks[id],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setSubmittedMarks((prev) => ({ ...prev, [id]: true }));
      } else {
        throw new Error("Failed to submit marks");
      }
    } catch (error) {
      console.error(
        "Error submitting marks:",
        error.response?.data?.message || error.message
      );
      alert("Failed to submit marks. Please try again.");
    }
  };

  const loadStudentData = async () => {
    if (!branch || !semester || !subject) {
      alert(
        "Please select branch, semester, and subject before loading student data."
      );
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/faculty/getStudent",
        {
          params: { branch, semester, subject },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudents(response.data);
    } catch (error) {
      console.error(
        "Error loading student data:",
        error.response?.data?.message || error.message
      );
      alert("Failed to load student data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full bg-white shadow-lg rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Select Branch
          </label>
          <div className="relative">
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none shadow-sm"
            >
              <option value="">Select Branch</option>
              {branches.map((b,index) => (
                <option key={index} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="semester"
            className="block text-sm font-medium text-gray-700"
          >
            Select Semester
          </label>
          <div className="relative">
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none shadow-sm"
            >
              <option value="">Select Semester</option>
              {SEMESTERS.map((sem) => (
                <option key={sem} value={sem.toString()}>
                  Semester {sem}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Select Subject
          </label>
          <div className="relative">
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={!branch || !semester}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none disabled:bg-gray-100 disabled:text-gray-500 shadow-sm"
            >
              <option value="">Select Subject</option>
              {subjects.map((s,index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <button
        onClick={loadStudentData}
        disabled={isLoading}
        className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 shadow-sm transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Load Student Data"
        )}
      </button>

      {students.length > 0 && (
        <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Student List</h3>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Student Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Enter Marks
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={marks[student.id] || ""}
                      onChange={(e) =>
                        handleMarkChange(student.id, e.target.value)
                      }
                      className="w-20 text-center border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => submitMarks(student.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-colors duration-200"
                    >
                      Submit
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {submittedMarks[student.id] && (
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
