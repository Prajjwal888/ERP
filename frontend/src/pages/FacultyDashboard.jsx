import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const FacultyDashboard = () => {
  return (
    <>
        <div className='faculty-header'>
        <Header role='Faculty'/>
        </div>
        <div className='faculty-dashboard'>
        <Navbar role='faculty'/>
        </div>
    </>
  )
}

export default FacultyDashboard