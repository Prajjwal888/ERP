import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/AdminDashboard';
const App = () => {
  return (
    <div className='app'>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/admin' element={<AdminDashboard></AdminDashboard>} />
    </Routes>
    <Toaster />
    </div>
  )
}

export default App
