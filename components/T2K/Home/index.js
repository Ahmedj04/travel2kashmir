import React from 'react'

function Home() {
  return (
    <section className='lg:flex lg:flex-wrap rounded justify-between shadow drop-shadow lg:pb-32'>
      <div className='hidden lg:block lg:h-96 lg:w-3/12 lg:flex  lg:items-center'>
        {/* <img src='/home3.jpg' className='lg:h-80 lg:rotate-12 lg:rounded-tl-3xl lg:rounded-br-3xl'></img> */}
        <img src='/home3.jpg' className='lg:h-72 relative top-36'></img>
      </div>

      <div className='py-10 md:py-14 lg:w-6/12 my-auto'>
        <div className='px-5 md:px-14'>
          <div className="text-center">
            <h1 className='text-3xl font-semibold text-gray-700 pb-10'>Finding the Ideal Property in Kashmir is Simple</h1>
            <p className='text-xl text-gray-500 tracking-wide'>With our convenient search, browse extensive real estate listings by category. Locate the ideal partner!</p>
          </div>
        </div>
      </div>
      <div className='hidden lg:block lg:h-96 lg:w-3/12 lg:flex lg:justify-end'>
        {/* <img src='/home2.jpg' className='lg:h-80 lg:rounded-3xl lg:-rotate-12 lg:mt-16 '></img> */}
        <img src='/home2.jpg' className='lg:h-72'></img>

      </div>
    </section>
  )
}

export default Home;