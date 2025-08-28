import React from 'react'
import { useSelector } from 'react-redux'
import { useFetcher } from 'react-router-dom'

function UserName() {
  const username=useSelector(state=>state.user.username)
  if(!username)return null
  return (
    <p className='text-sm font-semibold hidden md:block'>
        {username}
    </p>
  )
}

export default UserName
