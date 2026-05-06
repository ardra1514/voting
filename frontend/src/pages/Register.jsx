import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Authprovider'
import toast from 'react-hot-toast'

const Register = () => {

  const {register , loading } = useContext(AuthContext)
  const [formData, setFormdata] = useState({
    name:"",
    email:"",
    password:""
  })
  const handleChange = (e) => {
      setFormdata({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
     const message = await register(formData)
      toast.success(message)
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form  onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='name' onChange={handleChange} required/><br />
        <input type="email" name='email' placeholder='email' onChange={handleChange} required/> <br />
        <input type="password" name='password' placeholder='password' onChange={handleChange} required/> 
        <button type='submit' disabled={loading}>
          {loading ? 'registering' : 'register'}
        </button>
      </form>
    </div>
  )
}

export default Register