import Category from '@/components/T2K/Category';
import Home from '@/components/T2K/Home';
import Locations from '../components/T2K/Locations'
import React from 'react'
import Footer from '@/components/T2K/Footer';

function Hotel() {
  return (
    <main className=''>

      <Home />

      <Category />
      
      <Locations />

      <Footer />

    </main>

  )
}

export default Hotel;