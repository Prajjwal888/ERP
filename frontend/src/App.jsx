import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
const App = () => {
  return (
    <div className='app'>
    <Routes>
      <Route path='/' element={<Home></Home>}>
      </Route>
    </Routes>
    </div>
  )
}

export default App
