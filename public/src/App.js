import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/chat'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/' element={<Chat/>} />
   </Routes>
   </BrowserRouter>
  )
}
