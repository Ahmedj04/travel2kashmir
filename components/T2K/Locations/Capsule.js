import React from 'react'

function Capsule({title,action,selected}) {
  return (
    <div 
    onClick={(e)=>action(title)}
    className={`h-12
      ${selected=== true ?`bg-blue-700`:`bg-blue-400`} text-white
      border rounded-3xl border-none
      p-4 capitalize flex justify-center items-center`}>
        {title}
        </div>
  )
}

export default Capsule