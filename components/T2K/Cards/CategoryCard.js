import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'

function Card({ propertyIcon, propertyType, propertyDescription }) {
  const router = useRouter()

  return (
    <div className='border shadow rounded-xl md:h-full  md:hover:shadow-2xl md:hover:scale-105 md:hover:transition-all'>
      <div className='pb-8'>
        <div className='p-8'>
          <span>{propertyIcon}</span>
          <h5 className='text-xl font-semibold text-gray-700 mt-5 mb-2 capitalize'>{propertyType}</h5>
          <p className='text-gray-500 tracking-wide font-normal'>{propertyDescription?.substring(0,100)}</p>
        </div>
        <div className='cursor-pointer'>
          <a className='p-9 font-semibold' style={{ color: "#2912d3", }} 
          onClick={()=> {
            localStorage.setItem("property_type" , propertyType);
            router.push('/category')
            }}
          >Read More &nbsp;<FontAwesomeIcon icon={faArrowRight} /> </a>
        </div>

      </div>
    </div>
  )
}

export default Card