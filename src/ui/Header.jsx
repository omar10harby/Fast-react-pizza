import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import UserName from '../features/users/UserName'

function Header() {
  return (
    <header className='flex items-center justify-between   bg-yellow-500 uppercase px-4 sm:px-6 py-3  border-b border-stone-200'>
        <Link to={'/'} className='uppercase w-3/4 sm:w-auto lg:tracking-[3px] '>Fast React Pizza Co.</Link>
        <SearchOrder/>
        <UserName/>
    </header>
  )
}

export default Header
