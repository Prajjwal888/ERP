import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const AdminDashboard = () => {
  return (
    <>
        <div className='admin-header'>
        <Header />
        </div>
        <div className='admin-dashboard'>
        <Navbar />
        </div>
    </>
  )
}

export default AdminDashboard