import './index.css'
import axios from 'axios'
import { FormEvent } from 'react'

interface RegisterResponse {
  message: string;
}

export default function Register() {
  const apiBackend2: string = import.meta.env.VITE_API_BACKEND2

  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as { username: string; password: string; email: string}
    console.log(data)


    if (!data.username || !data.password || !data.email) {
      return alert('Please fill all the fields')
    }

    try {
      const response = await axios.post<RegisterResponse>(`${apiBackend2}/register`, data)

      console.log(response.data)
      alert(response.data.message)
      window.location.replace('/login')
    } catch (err) {
      if(axios.isAxiosError(err) && err.response){
        alert(err.response.data.message)
      }else {
        alert('AN error occured')
      }
      console.error('Registration failed:', err)
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
              <form onSubmit={submitRegister}>
                <label className="block font-semibold"> Username </label>
                <input type="text" placeholder="Username" name="username" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <label className="block font-semibold"> Email </label>
                <input type="email" placeholder="Email" name="email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <label className="block mt-3 font-semibold"> Password </label>
                <input type="password" placeholder="Password" name="password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                  <div className="flex justify-between items-baseline">
                    <button type="submit" className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
                    <a href="login" className="text-sm hover:underline">Punya Akun?</a>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
