import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Capsule from './Capsule';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faHotel
} from "@fortawesome/free-solid-svg-icons";
import PropertyCard from '../Cards/PropertyCard';


function index() {
  const [allFullProperties, setAllFullProperties] = useState([]);
  const [onlyBasicDetails, setOnlyBasicDetails] = useState([]);
  const [allCities, setAllCities] = useState(['city']);
  const [selectedCity, setSelectedCity] = useState()
  const [hotelRoomPrice, setHotelRoomPrice] = useState({})
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
    let final = { "property_id": room.property_id, "price": temp_rates[0].price, "currency": temp_rates[0].currency }
    for (let i = 0; i < temp_rates.length; i++) {
      if (min > temp_rates[i].price) {
        min = temp_rates[i].price
        final = { "property_id": room.property_id, "price": temp_rates[i].price, "currency": temp_rates[i].currency }
      }
    }
    return final;
  }


  function fetchAllProperties() {
    const url = `/api/all_properties_data`;
    axios.get(url)
      .then((response) => {
        setAllFullProperties(response.data)
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

      }
      )
      .catch((error) => {
        console.log('error in fetching data of all properties')
      })
  }
  useEffect(() => { 
    fetchAllProperties()
   }, [])

  return (
    <>
      {/* location selector  */}
      <section >
        <div >
          <div className='py-4'>
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
                lg:justify-normal lg:gap-2 lg:items-center max-w-fit lg:ml-4'>

                {allCities?.map((city, index) => {
                  return (
                    <Capsule title={city} action={(e) => setSelectedCity(e)} selected={selectedCity === city} />
                  )
                })}


              </div>


            </div>


          </div>

        </div>
      </section>

      {/* properties based on location  */}
      <section className='mb-4'>
        <div className='py-1'>
          <div className='px-3 text-center'>
            <div className='md:flex md:flex-wrap md:gap-10 md:justify-center md:mt-10
              lg:flex lg:flex-wrap lg:gap-4 lg:justify-center lg:mt-4'>

              {onlyBasicDetails?.map((hotel, idx) =>
              (hotel?.address[0].address_city === selectedCity ?
                <div className='lg:w-3/12' >
                  <PropertyCard hotel={hotel} price={hotelRoomPrice.filter(price=>price.property_id===hotel.property_id)[0]}/>
                  </div> :

                <></>
              ))}
            </div>
            
          </div>
        </div>
      </section >
    </>
  )
}

export default index