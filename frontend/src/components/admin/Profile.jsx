import React from 'react'
import { IdCard,Phone,Mail } from 'lucide-react'
const Profile = () => {
  return (
    <div className='profile'>
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Employee Profile</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <IdCard className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="text-base font-medium text-gray-900">EMP123456</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-base font-medium text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-base font-medium text-gray-900">john.doe@company.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-8">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
