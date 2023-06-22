import React from 'react'
import Header from '../Header';

function Home() {
  return (
    <section className='h-screen lg:h-screen bg-gradient-to-r from-blue-100 to-rose-100 border-b-2'>

      <Header />
      
      <section>
        <div className='lg:flex lg:flex-wrap rounded justify-between'>

          {/* image only visible for lg screen */}
          <div className='hidden lg:block lg:h-96 lg:w-3/12 lg:flex lg:justify-center lg:mt-36 lg:mb-5'>
            <img src='/winter1.jpg' className='home-img h-96 lg:rounded-tr-full'></img>
          </div>

          <div className='py-52 md:py-96 lg:my-auto lg:py-0 lg:w-6/12  z-10'>
            <div className='px-5 md:px-14'>
              <div className="text-center">
                <h1 className='text-3xl lg:text-4xl font-semibold pb-10' style={{ color: '#2912d3' }}>Finding the Ideal Property in Kashmir is Simple</h1>
                <p className='text-xl text-gray-500 tracking-wide'>With our convenient search, browse extensive real estate listings by category. Locate the ideal partner!</p>
              </div>
            </div>

          </div>

          {/* image only visible for lg screen */}
          <div className='hidden lg:block lg:h-96 lg:w-3/12 lg:flex lg:justify-center lg:mt-5'>
            <img src='/chinar2.jpg' className='home-img lg:h-96 lg:rounded-bl-full'></img>
          </div>

        </div>
      </section>


      <style jsx>
        {`
                
                @media (min-width: 1020px) and (max-width:1280px) {
                    .home-img {
                        height:300px
                    }
                }    
                @media (min-width: 1280px) {
                    .home-img {
                        height:400px
                    }
                }    
                `}
      </style>
    </section>

  )
}

export default Home;