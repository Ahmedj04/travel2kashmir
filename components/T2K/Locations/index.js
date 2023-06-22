import React from 'react';
import Capsule from './Capsule';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowRight,
    faHotel
} from "@fortawesome/free-solid-svg-icons";


function index() {
  return (
    <section className='border border-t-2'>
    <div className='py-10'>
        <div className='py-8'>
            <div className='px-3 text-center'>
                <div className='text-center mb-6'>
                    <span className='bg-blue-100 pr-2 py-2 rounded-2xl'>
                        <span><FontAwesomeIcon icon={faCircleArrowRight} size="2xl" style={{ color: "#2912d3", }} /></span>
                        <span className='text-blue-800 text-xl font-medium pl-3 tracking-wide'>Properties</span>
                    </span>
                    <h2 className='mt-4 mb-6 text-3xl font-medium text-gray-700'>Explore Properties</h2>
                    <p className='text-gray-500 tracking-wide font-medium'>
                      Explore our wide range of properties through out kashmir.
                    </p>
                </div>
                <div className='md:flex md:flex-wrap md:gap-10 md:justify-start lg:flex lg:flex-wrap
                lg:justify-normal lg:gap-2 lg:items-center'>
                <Capsule title={'srinagar'} action={(e)=>alert(e)}/>
                <Capsule title={'srinagar'} action={(e)=>alert(e)}/>
                <Capsule title={'srinagar'} action={(e)=>alert(e)}/>
                </div>


            </div>


        </div>

    </div>
</section>
  )
}

export default index