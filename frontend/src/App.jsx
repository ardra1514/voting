import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
 
import Home from './pages/Home'
import Voting from './components/Voting'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/VotingPage' element={<Voting />} />
      </Routes>
    </div>
  )
}

export default App