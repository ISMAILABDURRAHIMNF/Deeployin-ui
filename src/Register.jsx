import { Link } from 'react-router-dom'
import './index.css'
import axios from 'axios'

export default function Register() {
  const submitResgiter = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log(data)
  

    if (!data.username || !data.password || !data.email) {
      return alert('Please fill all the fields')
    } else {
      try {
        const response = await axios.post('http://localhost:5000/register', data)

        console.log(response.data)
        navigate('/login')
      } catch (error) {
        console.error(error)
      }
    }
  }
  
  return (
    <div>
      <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light ">Create Account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-purple-400 rounded-t-md"></div>
            <div className="px-8 py-6 ">
              <form onSubmit={submitResgiter}>
                <label className="block font-semibold"> Username </label>
                <input type="text" placeholder="Username" name="username" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <label className="block font-semibold"> Email </label>
                <input type="email" placeholder="Email" name="email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <label className="block mt-3 font-semibold"> Password </label>
                <input type="password" placeholder="Password" name="password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                  <div className="flex justify-between items-baseline">
                    <button type="submit" className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
                    <a href="#" className="text-sm hover:underline">Have Account?</a>
                  </div>
              </form>
            </div>      
          </div>
        </div>
      </div>
    </div>
  )
}