import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';


function Header() {
  return (
    <section className='bg-white'>
        <div className='py-3 lg:py-5 px-2 lg:px-5 shadow shadow-lg flex justify-between'>
            {/* mobile view  and tablet view */}
            <i className='lg:hidden'><AccountCircleIcon fontSize='large'/></i>
            <i className='lg:hidden'><MenuIcon fontSize='large'/></i>

            {/* desktop view */}
            <ul className='hidden lg:block lg:flex lg:gap-10'>
              <li className='ml-32 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/'>Home</a></li>
              <li className='font-medium text-gray-700 hover:text-blue-600 hover:text-blue-800 cursor-pointer'>Listings</li>
              <li className='font-medium text-gray-700 hover:text-blue-600 hover:text-blue-800 cursor-pointer'>Places</li>
              
            </ul>
            <i className='hidden lg:block'><AccountCircleIcon fontSize='large'/></i>

        </div>
    </section>
  )
}

export default Header