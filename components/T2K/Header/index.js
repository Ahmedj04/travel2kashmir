import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Router from 'next/router';
import Data from '../Data'


function Header({bgColor='bg-gradient-to-r from-blue-100 to-rose-100', menu, setMenu}) {

  return (
    <section className={bgColor}>
      <div className='py-3 lg:py-5 px-2 lg:px-5 border border-b-2 flex justify-between'>
        {/* mobile view  and tablet view */}
        <img src='/t2k.png' className='h-12 md:h-16 lg:hidden'></img>
        <h2 className='lg:hidden font-medium text-xl md:text-3xl my-auto' style={{ color: '#2912d3' }}>Travel2Kashmir</h2>
        
        {menu === true ? <i className='lg:hidden' onClick={() => setMenu(!menu) }><CloseIcon fontSize='large' /></i> :<i className='lg:hidden' onClick={() => setMenu(!menu) }><MenuIcon fontSize='large' /></i>}

        {/* desktop view */}
        <div className='hidden lg:flex cursor-pointer'>
          <img className='h-20' onClick={() => Router.push(window.location.origin)} src='/t2k.png' />
        </div>
        
        <ul className='hidden lg:mr-20 lg:justify-end lg:block lg:flex lg:gap-10 lg:my-auto lg:ml-auto'>
          <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/'>Home</a></li>
          <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/aboutus'>About us</a></li>
          <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer' onClick={()=>{Router.push(`${window.location.origin}/#location`)}}>Properties</li>
          <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer' onClick={() => document.getElementById('sublist').className === 'hidden' ? document.getElementById('sublist').className = 'block absolute bg-slate-100 py-4 px-5 w-36 text-left rounded-b-3xl' : document.getElementById('sublist').className = 'hidden'}>
          <span >Places</span>
            <ul id='sublist' className='hidden'>
              {Data.map((place,index) => {
                return (
                  <li key={index} 
                  onClick={
                    //local storage mei save krna hai place{name ,placeid}
                    // redirect to place page
                    ()=>{
                      localStorage.setItem("place",place.name),
                      console.log("pushing")
                      Router.push(`${window.location.origin}/place?p=${place.name}`)
                    }
                  }
                  className='pb-2 border-b border-black capitalize font-medium pt-2 text-gray-700 hover:text-blue-600 hover:text-blue-800 cursor-pointer'>{place?.name}</li>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Header