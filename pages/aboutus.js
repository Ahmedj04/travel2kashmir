import React, { useState } from 'react'
import AboutusComponent from '@/components/T2K/Aboutus'
import Footer from '@/components/T2K/Footer'
import Header from '@/components/T2K/Header'
import MenuSM from '@/components/T2K/MenuSM';


function Aboutus() {

  // set menu for small screen
  const [menu, setMenu] = useState(false);

  return (
    <main>

      <Header
        menu={menu}
        setMenu={setMenu}
      />

      <AboutusComponent />

      <Footer />

      {/*-------------------- menu bar for small and medium screen----------- */}
      {menu === true ? <MenuSM bgColor={`bg-slate-100`} /> : <></>}


    </main>
  )
}

export default Aboutus