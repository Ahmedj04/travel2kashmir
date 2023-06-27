import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../Cards/PropertyCard';
import Loader from '@/components/T2K/Loaders/Loader';


function PropertyCategory() {

    const [propertyType, setPropertyType] = useState();
    const [allFullProperties, setAllFullProperties] = useState([]);
    const [showUI, setShowUI] = useState(0);
    const [onlyBasicDetails, setOnlyBasicDetails] = useState([]);
    const [allCities, setAllCities] = useState(['city']);
    const [selectedCity, setSelectedCity] = useState()
    const [hotelRoomPrice, setHotelRoomPrice] = useState({})
    const [data, setData] = useState(true)

    useEffect(() => {
        let property_type = localStorage.getItem("property_type")
        setPropertyType(property_type);
        getPropertyDetails(property_type);
    }, [])


    function room_price(all_property) {
        let property_id = all_property.property_id;
        let temp_rates = [];

        if (Object.keys(all_property).includes('rooms') === false) {
            return ({
                property_id, price: 0, currency: 'none'
            })
        }

        all_property.rooms.map(room => {
            
            if (Object.keys(room).includes("unconditional_rates") === false) {
                temp_rates.push({
                    property_id, price: 0, currency: "none"
                })
               
            }
            else {
                temp_rates.push({
                    property_id, "price": room.unconditional_rates[0].baserate_amount,
                    "currency": room.unconditional_rates[0].baserate_currency
                })
            }
        })

        if (temp_rates.length === 0 || temp_rates.length === 1) {
            return (temp_rates[0])
        }

        
        let min = temp_rates[0].price;
        
        let final = { "property_id": property_id, "price": temp_rates[0].price, "currency": temp_rates[0].currency }
       
        for (let i = 0; i < temp_rates.length; i++) {
            if (min > temp_rates[i].price) {
                min = temp_rates[i].price
                final = { "property_id": room.property_id, "price": temp_rates[i].price, "currency": temp_rates[i].currency }
            }
        }
        return final;
    }


    function getPropertyDetails(property_type) {
        let url = `/api/category_all_properties_data/${property_type.replaceAll(' ', '-')}`;
        axios.get(url)
            .then((response) => {
                if (response.data == `{message:"No ${property_type} Found"}`) {
                    setData(false)
                    setShowUI(1)
                }
                else {
                    setAllFullProperties(response.data);
                    const all_property_room_data = response.data.map(item => (
                        {
                            "property_id": JSON.parse(item.property_data).property_id,
                            ...JSON.parse(item.room_data)
                        }))
                    setHotelRoomPrice(all_property_room_data.map(all_property => room_price(all_property)))
                    setOnlyBasicDetails(response.data.map(property => (JSON.parse(property.property_data))))
                    let property_data = response.data.map(property => (JSON.parse(property.property_data)))
                    // unique list of cities having properties
                    let all_cities = [...new Set(property_data.map((item) => item?.address[0]?.address_city))];
                    setAllCities(all_cities)
                    setSelectedCity(all_cities[0])
                    setShowUI(1);
                }

            }
            )
            .catch((error) => {
                console.log('error in fetching data of all properties')
            })
    }

    return (
        <section>
            {data === false ? <>
                <div className='py-52 '>
                    <h1 className='text-3xl font-medium md:text-6xl text-gray-700 text-center pb-2 md:pb-5'>OOPS!</h1>
                    <h2 className='text-lg md:text-4xl text-gray-700 text-center capitalize'>no {propertyType} found!</h2>
                </div>
            </> : <>
                <div className=' h-40 text-center flex justify-center bg-slate-100'>
                    <h2 className='capitalize text-3xl md:text-5xl text-gray-700 my-auto border-b-4 border-gray-700 pb-2'>{propertyType + "s"}</h2>
                </div>

                <section className='pb-20 bg-slate-100'>
                    <div className='py-1'>
                        <div className='px-3 text-center'>
                            <div className='md:flex md:flex-wrap md:gap-10 md:justify-center md:mt-10 lg:flex lg:flex-wrap lg:gap-4 lg:justify-center lg:mt-4'>
                                {showUI === 0 ? <>
                                    <Loader size={`w-3/12 h-40 py-3 mb-5 `} />
                                    <Loader size={`w-3/12 h-40 py-3 mb-5 `} />
                                    <Loader size={`w-3/12 h-40 py-3 mb-5 `} />
                                </> :
                                    <>
                                        {onlyBasicDetails?.map((hotel, idx) => {
                                            return (
                                                <div key={idx} className='lg:w-3/12 pb-3 md:pb-0 lg:pb-0' >
                                                    <PropertyCard hotel={hotel} price={hotelRoomPrice.filter(price => price.property_id === hotel.property_id)[0]} bgcolor={'bg-white'} />
                                                </div>
                                            )
                                        })
                                        }
                                    </>

                                }
                            </div>
                        </div>
                    </div>
                </section >
            </>}
        </section>
    )
}

export default PropertyCategory