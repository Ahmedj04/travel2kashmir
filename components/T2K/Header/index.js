import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Router from 'next/router';
import axios from 'axios';


function Header({bgColor='bg-gradient-to-r from-blue-100 to-rose-100', menu, setMenu}) {

  const [places, setPlaces] = useState([]);

  let url = `/api2/places`;

  useEffect(() => {
    fetchAllPlaces()
  }, [])

  function fetchAllPlaces() {
    axios.get(url, {
      headers: {
        "x-hasura-admin-secret": process.env.NEXT_PUBLIC_PASS
      }
    }).then((response) => {
      setPlaces(response.data.places)
      console.log("PLACES:"+JSON.stringify(response.data.places))
    })
      .catch((error) => {
        alert(error.message)
        console.log(error.message)
      })
  }


  return (
    <section className={bgColor}>
      <div className='py-3 lg:py-5 px-2 lg:px-5 border border-b-2 flex justify-between'>
        {/* mobile view  and tablet view */}
        {/* <i className='lg:hidden'><AccountCircleIcon fontSize='large' /></i> */}
        <img src='/t2k.png' className='h-14 lg:hidden'></img>
        <h2 className='lg:hidden font-medium text-xl ' style={{ color: '#2912d3' }}>Travel2Kashmir</h2>
        <i className='lg:hidden' onClick={() => setMenu(!menu) }><MenuIcon fontSize='large' /></i>

        {/* desktop view */}
        <div className='hidden lg:flex cursor-pointer'>
          <img className='h-20' onClick={() => Router.push(window.location.origin)} src='/t2k.png' />
        </div>
        
        <ul className='hidden lg:mr-20 lg:justify-end lg:block lg:flex lg:gap-10 lg:my-auto lg:ml-auto'>

          <li className='  font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/'>Home</a></li>

          <li className=' font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><a href='/aboutus'>About us</a></li>
          <li className='font-medium text-gray-700 hover:text-blue-600  cursor-pointer' onClick={()=>{Router.push(`${window.location.origin}/#location`)}}>Properties</li>
          <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer'><span onClick={() => document.getElementById('sublist').className === 'hidden' ?
            document.getElementById('sublist').className = 'block absolute bg-white py-3 px-4' : document.getElementById('sublist').className = 'hidden'}>Places</span>
            <ul id='sublist' className='hidden'>
              {places.map((place,index) => {
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
              })}
            </ul>


          </li>

        </ul>
      </div>
    </section>
  )
}

export default Header