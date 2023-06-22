import Category from '@/components/T2K/Category';
import Header from '@/components/T2K/Header';
import Home from '@/components/T2K/Home';
import Locations from '../components/T2K/Locations'
import React from 'react'

function Hotel() {
  return (
    <main className=''>
      <Header />
      <Home />
      <Category />
      
      <Locations />

    </main>

  )
}

export default Hotel;