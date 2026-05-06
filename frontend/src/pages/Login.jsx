import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Authprovider'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { login, loading } = useContext(AuthContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const message = await login(formData)

      if (message) {
        navigate('/home')
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='min-h-screen flex items-center justify-center  px-4'>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-8  shadow-md w-full max-w-sm'
      >

        <h1 className='text-2xl font-bold text-center mb-6 text-gray-700'>
          Login
        </h1>

        <div className='flex flex-col gap-4'>

          <input
            type="email"
            name='email'
            placeholder='Enter email'
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg outline-none focus:border-gray-500"
          />

          <input
            type="password"
            name='password'
            placeholder='Enter password'
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg outline-none focus:border-gray-500"
          />

          <button
            type='submit'
            disabled={loading}
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? 'Logging...' : 'Login'}
          </button>

        </div>

      </form>

    </div>
  )
}

export default Login