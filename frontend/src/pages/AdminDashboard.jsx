import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const AdminDashboard = () => {
  return (
    <>
        <div className='admin-header'>
        <Header role='Admin'/>
        </div>
        <div className='admin-dashboard'>
        <Navbar role='admin'/>
        </div>
    </>
  )
}

export default AdminDashboard