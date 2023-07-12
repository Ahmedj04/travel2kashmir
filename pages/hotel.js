import Category from '@/components/T2K/Category';
import Home from '@/components/T2K/Home';
import Locations from '../components/T2K/Locations'
import React, { useState } from 'react'
import Footer from '@/components/T2K/Footer';
import MenuSM from '@/components/T2K/MenuSM';


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

      {menu === true ? <MenuSM bgColor={`bg-slate-50`}/> : <></>}

    </main>

  )
}

export default Hotel;