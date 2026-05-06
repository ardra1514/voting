

import React, { createContext, useEffect, useState } from 'react'
import API from '../app/axios'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false)

  const [votes, setVotes] = useState({
    red: 0,
    yellow: 0,
    green: 0
  })

  const [selectedVote, setSelectedVote] = useState(null)


  const register = async (formData) => {

    try {

      setLoading(true)

      const res = await API.post('/auth/register', formData)

      return res.data.message

    } catch (error) {

      throw error?.response?.data?.message

    } finally {

      setLoading(false)
    }
  }



  
  const login = async (formData) => {

    try {

      setLoading(true)

      const res = await API.post('/auth/login', formData)

      localStorage.setItem("token", res.data.token)

      return res.data.message

    } catch (error) {

      throw error?.response?.data?.message

    } finally {

      setLoading(false)
    }
  }

  
  const getVotes = async () => {

    try {

      const res = await API.get('/votes')

      setVotes(res.data)

    } catch (error) {

      console.log(error)
    }
  }



  
  const voteColor = async (color) => {

    try {

      const token = localStorage.getItem("token")

      const res = await API.post(
        '/vote',
        { color },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      
      if (selectedVote === color) {

        setSelectedVote(null)

      } else {

        setSelectedVote(color)
      }

      await getVotes()

      return res.data.message

    } catch (error) {

      console.log(error)
    }
  }



  useEffect(() => {

    getVotes()

  }, [])



  return (

    <AuthContext.Provider
      value={{
        register,
        login,
        loading,
        votes,
        voteColor,
        selectedVote
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}

export default AuthProvider