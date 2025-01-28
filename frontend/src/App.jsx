import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
const App = () => {
  return (
    <div className='app'>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/admin' element={<AdminDashboard></AdminDashboard>} />
      <Route path='/student' element={<StudentDashboard></StudentDashboard>} />
      <Route path='/faculty' element={<FacultyDashboard></FacultyDashboard>} />
    </Routes>
    <Toaster />
    </div>
  )
}

export default App