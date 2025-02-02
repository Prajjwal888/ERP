import {React,useState,useEffect} from 'react'
import { Download } from 'lucide-react';
import axios from 'axios';
const StudentTimeTable = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [semester, setSemester] = useState('');
    useEffect(() => {
        const fetchTimeTable = async () => {
          try {
            const response = await axios.get(
              "https://erp-sxpm.onrender.com/api/student/getTimeTable",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            const fileName = response.data.timetable.image.split("\\").pop();
            setImageUrl(`https://erp-sxpm.onrender.com/uploads/${fileName}`);
            setSemester(response.data.semester);
          } catch (error) {
            console.log(error.response?.data?.msg || error);
          }
        };
        fetchTimeTable();
      }, []);
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${semester}_sem_timetable.png`;
        link.click();
      };
    
      return (
        <>
          <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800">
                Current Timetable
              </h1>
              <button 
                className="flex items-center text-gray-800 hover:text-gray-600" 
                onClick={handleDownload}
              >
                <Download className="w-5 h-5 mr-2" /> Download
              </button>
            </div>
            <div className="flex justify-center items-center">
                <img src={imageUrl} alt={`${semester}th Semester Timetable`} style={{height:'500px', display: 'block', margin: '20px 0' }} />
            </div>
          </div>
        </>
      );
}

export default StudentTimeTable