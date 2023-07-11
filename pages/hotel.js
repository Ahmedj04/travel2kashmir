import Category from '@/components/T2K/Category';
import Home from '@/components/T2K/Home';
import Locations from '../components/T2K/Locations'
import React, { useState } from 'react'
import Footer from '@/components/T2K/Footer';
import Router from 'next/router';


function Hotel() {

  const [menu, setMenu] = useState(false);

  return (
    <main>

      <Home
        menu={menu}
        setMenu={setMenu}
      />

      <Category />

      <Locations />

      <Footer />

      {/*-------------------- menu bar for small and medium screen----------- */}

      {menu === true ?
        <React.Fragment>
          <div className='absolute inset-0 w-9/12 mx-auto h-44 mt-20 md:h-56 bg-white opacity-100 rounded-b-3xl'>
            <div className='text-center text-slate-800 pt-10 px-10 md:pt-12'>
              {/* <ul className='inline-block font-semibold'>
                {
                  [
                    { "label": "Home", "id": "/" },
                    { "label": "About", "id": "/aboutus" },
                    { "label": "Properties", "id": "#location"},
                    { "label": "Places", "id": "places" },
                  ].map((item, index) => {
                    return (
                  <li key={index} className='pb-1 md:pb-2 hover:text-slate-500' onClick={()=>{setMenu(false);Router.push(`${window.location.origin}/${item.id}`)}}>{item?.label}</li>
                    )
                  })
                  }

              </ul> */}
              <ul className='text-left'>
                <li className=' font-medium text-gray-700 hover:text-blue-600 cursor-pointer pb-2'><a href='/'>Home</a></li>
                <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer pb-2'><a href='/aboutus'>About us</a></li>
                <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer pb-2' onClick={() => { Router.push(`${window.location.origin}/#location`) }}>Properties</li>
                <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer flex justify-between'>
                  <span onClick={() => document.getElementById('submenu').className === 'hidden' ?
                    document.getElementById('submenu').className = 'block absolute top-44 bg-white text-slate-800 py-3 px-4' : document.getElementById('submenu').className = 'hidden'}>Places</span><span>+</span>
                  <ul id='submenu' className='hidden'>
                    <li>heloo world</li>
                    <li>heloo world</li>
                    <li>heloo world</li>
                    <li>heloo world</li>
                    <li>heloo world</li>
                    <li>heloo world</li>
                    {/* {places.map((place,index) => {
      return (
        <li key={index} 
        onClick={
          //local storage mei save krna hai place{name ,placeid}
          // redirect to place page
          ()=>{
            localStorage.setItem("place",JSON.stringify(place)),
            console.log("pushing")
            Router.push(`${window.location.origin}/place?p=${place.name}`)
          }
        }
        className='border-b border-black capitalize font-medium pt-2 text-gray-700 hover:text-blue-600 hover:text-blue-800 cursor-pointer'>{place?.name}</li>

      )
    })} */}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </React.Fragment>
        : <></>
      }

    </main>

  )
}

export default Hotel;