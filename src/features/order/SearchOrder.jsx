import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
const [query,setQuery]=useState('')
const navigate=useNavigate()
function handleSubmit(e){
    e.preventDefault();
    if(!query)return
    navigate(`/order/${query}`)
    setQuery("")
}
  return (
        <form onSubmit={handleSubmit}>
            <input className='px-2 py-2 rounded-full w-full lg:px-4 outline-none bg-yellow-200 focus: placeholder:text-stone-700' placeholder='Search order #' value={query} onChange={e=>setQuery(e.target.value)}/>
        </form>
  )
}

export default SearchOrder
