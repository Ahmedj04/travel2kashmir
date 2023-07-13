import PropertyCategory from '@/components/T2K/Category/PropertyCategory';
import Footer from '@/components/T2K/Footer'
import Header from '@/components/T2K/Header'
import React,{useState} from 'react';
import MenuSM from '@/components/T2K/MenuSM';



function Category() {

  const [menu, setMenu] = useState(false);


  return (

    <main>
      <Header 
        menu={menu}
        setMenu={setMenu}
      />
      <PropertyCategory />
      <Footer />

      {/*-------------------- menu bar for small and medium screen----------- */}

      {menu === true ? <MenuSM bgColor={`bg-slate-50`}/> : <></>}
    </main>
  )
}

export default Category