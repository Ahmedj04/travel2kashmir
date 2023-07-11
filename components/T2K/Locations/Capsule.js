import React from 'react'

function Capsule({title,action,selected}) {
  return (
    <div 
    onClick={(e)=>action(title)}
    className={`h-8 p-4 md:h-12 mt-1
      ${selected=== true ?`bg-blue-700`:`bg-blue-400`} text-xs md:text-lg text-white
      border rounded-3xl border-none md:p-4 capitalize flex justify-center items-center`}>
        {title}
        </div>
  )
}

export default Capsule