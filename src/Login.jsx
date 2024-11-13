import { useNavigate } from 'react-router-dom'
import './index.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const [dataLogin, setDataLogin] = useState(null)

  const submitLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    
    if (!data.username || !data.password) {
      return alert('Please fill all the fields')
    } else {
      try {
        const response = await axios.post('http://localhost:5002/login', data)
  
        setDataLogin(response.data)
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        window.location.replace('/home')
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.replace('/login')
  }

  useEffect(() => {
    if (location.pathname === '/logout') {
      handleLogout()
    }
  }, [location])

  
  return (
    <div>
      <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light ">Login to your account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-purple-400 rounded-t-md"></div>
            <div className="px-8 py-6 ">
              <form onSubmit={submitLogin}>
                <label className="block font-semibold"> Username </label>
                <input type="text" placeholder="Username" name="username" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <label className="block mt-3 font-semibold"> Password </label>
                <input type="password" placeholder="Password" name="password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                  <div className="flex justify-between items-baseline">
                    <button type="submit" className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Login</button>
                    <a href="register" className="text-sm hover:underline">Buat Akun?</a>
                  </div>
              </form>
            </div>      
          </div>
        </div>
      </div>
    </div>
  )
}