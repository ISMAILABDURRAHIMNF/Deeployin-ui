import { Link } from 'react-router-dom'
import './index.css'

export default function Login() {
  const submitResgiter = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log(data)
  
  }
  
  return (
    <div>
      <div class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div class="relative py-3 sm:w-96 mx-auto text-center">
          <span class="text-2xl font-light ">Create Account</span>
          <div class="mt-4 bg-white shadow-md rounded-lg text-left">
            <div class="h-2 bg-purple-400 rounded-t-md"></div>
            <div class="px-8 py-6 ">
              <form onSubmit={submitResgiter}>
                <label class="block font-semibold"> Username </label>
                <input type="text" placeholder="Username" name="username" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <label class="block font-semibold"> Email </label>
                <input type="email" placeholder="Email" name="email" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <label class="block mt-3 font-semibold"> Password </label>
                <input type="password" placeholder="Password" name="password" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                  <div class="flex justify-between items-baseline">
                    <button type="submit" class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
                    <a href="#" class="text-sm hover:underline">Have Account?</a>
                  </div>
              </form>
            </div>      
          </div>
        </div>
      </div>
    </div>
  )
}