import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';


function Header() {
  return (
    <section className='bg-white'>
        <div className='py-3 px-2 shadow shadow-lg flex justify-between'>
            <i><AccountCircleIcon fontSize='large'/></i>
            <i><MenuIcon fontSize='large'/></i>
        </div>
    </section>
  )
}

export default Header