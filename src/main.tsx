import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import './index.css'

const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null
}

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Home/> : <Login/>} />
        <Route path="/login" element={isAuthenticated() ? <Home/> : <Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuthenticated() ? <Home/> : <Login/>} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

const rootElement = document.getElementById('root') as NonNullable<HTMLElement>

createRoot(rootElement).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
