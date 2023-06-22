import React from 'react'

function Capsule({title,action}) {
  return (
    <div 
    onClick={(e)=>action(title)}
    className='h-12
     bg-blue-700 hover:bg-blue-900 text-white
      border rounded-3xl border-none
      p-4 capitalize flex justify-center items-center'>
        {title}
        </div>
  )
}

export default Capsule