import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const StudentDashboard = () => {
  return (
    <>
        <div className='student-header'>
        <Header role='Student'/>
        </div>
        <div className='student-dashboard'>
        <Navbar role='student'/>
        </div>
    </>
  )
}

export default StudentDashboard