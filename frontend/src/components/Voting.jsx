// pages/VotingPage.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Voting = () => {

  const {
    votes,
    voteColor,
    selectedVote
  } = useContext(AuthContext)



  return (

    <div className='min-h-screen flex items-center justify-center bg-gray-100'>

      <div className='flex gap-8 flex-wrap'>



        

        <div className='w-56 h-72 bg-red-500 rounded-3xl  flex flex-col items-center justify-center text-white'>

          <h1 className='text-4xl font-bold mb-4'>
            Red
          </h1>

          <p className='text-2xl mb-6'>
            Votes : {votes.red}
          </p>

          <button
            onClick={() => voteColor('red')}
            className='bg-white text-red-500 px-6 py-3 rounded-xl font-semibold'
          >
            {selectedVote === 'red'
              ? 'Remove Vote'
              : 'Vote'}
          </button>

        </div>

        <div className='w-56 h-72 bg-yellow-400 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white'>

          <h1 className='text-4xl font-bold mb-4'>
            Yellow
          </h1>

          <p className='text-2xl mb-6'>
            Votes : {votes.yellow}
          </p>

          <button
            onClick={() => voteColor('yellow')}
            className='bg-white text-yellow-500 px-6 py-3 rounded-xl font-semibold'
          >
            {selectedVote === 'yellow'
              ? 'Remove Vote'
              : 'Vote'}
          </button>

        </div>



       

        <div className='w-56 h-72 bg-green-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white'>

          <h1 className='text-4xl font-bold mb-4'>
            Green
          </h1>

          <p className='text-2xl mb-6'>
            Votes : {votes.green}
          </p>

          <button
            onClick={() => voteColor('green')}
            className='bg-white text-green-500 px-6 py-3 rounded-xl font-semibold'
          >
            {selectedVote === 'green'
              ? 'Remove Vote'
              : 'Vote'}
          </button>

        </div>


      </div>

    </div>
  )
}

export default Voting