import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Router from 'next/router';


function Header() {
  return (
    <section className='bg-white bg-gradient-to-r from-blue-100 to-rose-100'>
      <div className='py-3 lg:py-5 px-2 lg:px-5 border border-b-2 flex justify-between'>
        {/* mobile view  and tablet view */}
        <i className='lg:hidden'><AccountCircleIcon fontSize='large' /></i>
        <h2 className='lg:hidden font-medium text-xl ' style={{ color: '#2912d3' }}>Travel2Kashmir</h2>
        <i className='lg:hidden'><MenuIcon fontSize='large' /></i>

        {/* desktop view */}
        <div className='hidden lg:flex '>
          {/* <div className='flex justify-center'> */}
          <img onClick={() => Router.push(window.location.origin)} src='/t2k.png' />


        </div>
        <ul className='hidden lg:mr-20 lg:justify-end lg:block lg:flex lg:gap-10 lg:my-auto lg:ml-auto'>

          <li className=' text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/'>Home</a></li>
          <li className=' text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/'>About us</a></li>
          <li className='font-medium text-gray-700 hover:text-blue-600 hover:text-blue-600 cursor-pointer'>Properties</li>
          <li className='font-medium text-gray-700 hover:text-blue-600 hover:text-blue-600 cursor-pointer'><span   onClick={() => document.getElementById('sublist').className === 'hidden' ?
            document.getElementById('sublist').className = 'block absolute bg-white py-5 px-4 rounded' : document.getElementById('sublist').className = 'hidden'}>Places</span>
            <ul id='sublist'
              onClick={() => document.getElementById('sublist').className === 'hidden' ?
            document.getElementById('sublist').className = 'block absolute bg-white py-5 px-4 rounded' : document.getElementById('sublist').className = 'hidden'} className='hidden'>
              <li className='border-b border-black font-medium text-sm text-gray-700 hover:text-blue-600  cursor-pointer'>Srinagar</li>
              <li className='border-b border-black font-medium pt-3 text-sm text-gray-700 hover:text-blue-600  cursor-pointer'>Jammu</li>
              <li className='border-b border-black font-medium pt-3 text-sm text-gray-700 hover:text-blue-600 cursor-pointer'>Gulmarg</li>
            </ul>

          </li>
        </ul>
      </div>
    </section>
  )
}

export default Header