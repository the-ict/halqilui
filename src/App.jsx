import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Search from './pages/Search'
import SingleProblem from './pages/SingleProblem'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search/?' element={<Search />} />
        <Route path='/single/:id' element={<SingleProblem />} />
        <Route path='*' element={<div className='text-center text-red-900 text-2xl'>404 not found!</div>} />
      </Routes>
    </BrowserRouter>
  )
}
