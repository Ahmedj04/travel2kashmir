import React, { useEffect, useState } from 'react';

import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { Router } from 'next/router';
import Link from 'next/link';

function PropertyCard({ hotel = {}, price, bgcolor }) {
    const [loc, setLoc] = useState()
    const [lang, setLang] = useState()
    useEffect(() => {
        setLoc('https://hangul-release.vercel.app/');
        setLang(Router.locale === undefined ? 'en' : Router.locale)
    }, [])

    return (
        <>
            <div className={` border rounded-xl md:h-full  md:hover:shadow-2xl md:hover:scale-105 md:hover:transition-all ${bgcolor}`}>
                {/* hotel image */}
                <div className='p-4'>
                    {JSON.stringify(Object.keys(hotel).includes('images')) === "true" ? <img src={hotel?.images[0]?.image_link} className='h-48 w-full' alt="property_image" /> :
                        <img src='https://pix-placewise.vercel.app/assets/img/featured-img-1.jpg' className='h-48 w-full' alt="property_image" />}

                    {/* hotel name  */}
                    <h2 className='text-base m-2 flex justify-start items-center'>
                        <ApartmentIcon sx={{ fontSize: '20px' }} />
                        <span className='mx-2'>{hotel?.property_name}</span>
                    </h2>

                    {/* hotel address  */}
                    <span className='bold text-sm flex justify-start  items-center m-2 '>
                        <LocationOnIcon sx={{ fontSize: '20px' }} />
                        <h2 className='mx-2'>{`${hotel?.address[0]?.address_street_address},${hotel?.address[0]?.address_city}`}</h2>
                    </span>

                    {/* hotel rate  */}
                    {price?.price != 0 ? <div className='text-sm m-2 flex justify-start items-center'>
                        <CreditCardIcon sx={{ fontSize: '20px' }} />
                        <h3 className='m-2 capitalize'>{price?.currency}{price?.price}<span className='text-xs'>/Night + taxes</span></h3>
                    </div> : <></>}



                    <button className={`${price?.price === 0 ? `mt-11` : ``} mx-auto h-9 w-full bg-blue-700 border-none rounded-2xl text-white`}>
                        <Link
                            href={
                                `${loc}/${lang}/${hotel?.address[0].address_province.replace(
                                    /\s+/g,
                                    "-"
                                )}/${hotel?.address[0].address_city}/${hotel?.property_category
                                }s/${hotel?.property_name?.replaceAll(' ', '-')?.toLowerCase()}`
                            }
                            prefetch={true}>

                            Learn More

                        </Link>
                    </button>


                </div>
            </div>
        </>
    )
}

export default PropertyCard