import { useEffect, useState } from "react";
import { IdCard, Phone, Mail, UserRound, Crown } from "lucide-react";
import axios from "axios";
const FacultyProfile = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/faculty/getFaculty",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response?.data?.msg || error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 text-gray-800 mb-6">
        Faculty Profile
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="space-y-6">
            <div className="flex items-center">
                <UserRound className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Faculty Name</p>
                  <p className="text-lg font-medium text-gray-900">
                    {data.firstName} {data.middleName} {data.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <IdCard className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Faculty ID</p>
                  <p className="text-lg font-medium text-gray-900">
                    {data.loginid}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-lg font-medium text-gray-900">
                    {data.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-medium text-gray-900">
                    {data.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Crown className="w-6 h-6 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Post</p>
                  <p className="text-lg font-medium text-gray-900">
                    {data.post}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
