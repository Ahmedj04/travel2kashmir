import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';


function Header() {
  return (
    <section className='bg-white bg-gradient-to-r from-blue-100 to-rose-100'>
      <div className='py-3 lg:py-5 px-2 lg:px-5 border border-b-2 flex justify-between'>
        {/* mobile view  and tablet view */}
        <i className='lg:hidden'><AccountCircleIcon fontSize='large' /></i>
        <h2 className='lg:hidden font-medium text-xl ' style={{ color: '#2912d3' }}>Travel To Kashmir</h2>
        <i className='lg:hidden'><MenuIcon fontSize='large' /></i>

        {/* desktop view */}
        <div className='hidden lg:flex'>
          {/* <div className='flex justify-center'> */}
            <img src='/t2k.png' className='h-16'></img>
          {/* </div> */}

          <h2 className='hidden lg:block lg:font-medium lg:text-2xl lg:flex lg:my-auto' style={{ color: '#2912d3' }}>Travel To Kashmir</h2>

        </div>
        <ul className='hidden lg:block lg:flex lg:gap-10 lg:my-auto'>
          <li className=' text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/'>Home</a></li>
          <li className='font-medium text-gray-700 hover:text-blue-600 hover:text-blue-800 cursor-pointer'>Listings</li>
          <li className='font-medium text-gray-700 hover:text-blue-600 hover:text-blue-800 cursor-pointer'>Places</li>
        </ul>


        {/* <i className='hidden lg:block'><AccountCircleIcon fontSize='large' /></i> */}

      </div>
   

    </section>
  )
}

export default Header