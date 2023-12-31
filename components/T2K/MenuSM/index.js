import React, { useState } from 'react'
import Router from 'next/router';
import Data from '../Data'

function MenuSM({ bgColor }) {

    const [subMenu, setSubMenu] = useState(0);

    return (
        <div>
            <div className={`${bgColor} z-50 absolute inset-0 w-9/12 mx-auto h-44 mt-20 md:h-56 opacity-100 rounded-b-3xl`}>
                <div className='text-center text-slate-800 pt-10 px-10 md:pt-12'>
                    <ul className='text-left'>
                        <li className=' font-medium text-gray-700 hover:text-blue-600 cursor-pointer pb-2' onClick={() => { Router.push(`${window.location.origin}/`) }}>Home</li>
                        <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer pb-2' onClick={() => { Router.push(`${window.location.origin}/aboutus`) }}>About us</li>
                        <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer pb-2' onClick={() => { Router.push(`${window.location.origin}/#location`) }}>Properties</li>
                        <li className='font-medium text-gray-700 hover:text-blue-600 cursor-pointer flex justify-between'
                            onClick={() => setSubMenu(subMenu === 0 ? 1 : 0)}
                        >
                            <span >Places</span>
                            <span> {subMenu === 0 ? '+' : '-'}</span>
                            {subMenu === 0 ? <></> :
                                <ul id='submenu' className={`block absolute top-44 ${bgColor} text-slate-800 py-4 px-5 w-40 text-left rounded-b-3xl`}>
                                    {Data.map((place, index) => {
                                        return (
                                            <li key={index}
                                                onClick={
                                                    //local storage mei save krna hai place{name ,placeid}
                                                    // redirect to place page
                                                    () => {
                                                        localStorage.setItem("place", place.name),
                                                            console.log("pushing")
                                                        Router.push(`${window.location.origin}/place?p=${place.name}`)
                                                    }
                                                }
                                                className='pb-2 border-b border-black capitalize font-medium pt-2 text-gray-700 hover:text-blue-600 hover:text-blue-800 cursor-pointer'>{place?.name}</li>
                                        )
                                    })}
                                </ul>}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MenuSM