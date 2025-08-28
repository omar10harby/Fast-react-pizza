import React from 'react'
import { FadeLoader } from 'react-spinners'

function Loader() {
  return (
    <div className=' absolute bg-slate-200/50 backdrop-blur-sm flex items-center justify-center inset-0'>
        <FadeLoader/>
    </div>
  )
}

export default Loader
