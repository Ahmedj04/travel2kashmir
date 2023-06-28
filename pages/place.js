import React, { useState, useEffect } from 'react'
import Footer from '@/components/T2K/Footer';
import Header from '@/components/T2K/Header';
import axios from 'axios';
import { useRouter } from 'next/router';
import PropertyCard from '@/components/T2K/Cards/PropertyCard';


function place() {
    const [place, setPlace] = useState();
    const [placeDetail, setPlaceDetail] = useState([]);
    const [location, setLocation] = useState([]);

    const weatherTemperature = location?.main?.temp;
    const weatherDescription = location?.weather?.[0]?.description;
    const weatherIcon = location?.weather?.[0]?.icon;
    const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        let place_prop = localStorage.getItem("place")
        setPlace(JSON.parse(place_prop));
        fetchAllPlaceDetails(JSON.parse(place_prop).places_id)
        getWeather(JSON.parse(place_prop).name);
        fetchAllProperties(JSON.parse(place_prop).name)
    }, [query])

    // getWeather function is used to get the weather from the openweather api.
    function getWeather(name) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=62779ab6389dbe138a06a5f268fee0d2&units=metric`
        axios.get(url).then((response) => {
            console.log(response)
            setLocation(response.data)
        }).catch((err) => {
            alert(JSON.stringify(err))
        })
    }

    function fetchAllPlaceDetails(id) {
        let url = `/api2/places/${id}`;
        axios.get(url, {
            headers: {
                "x-hasura-admin-secret": process.env.NEXT_PUBLIC_PASS
            }
        }).then((response) => {
            setPlaceDetail(response.data.places[0])
            console.log(response.data.places[0])
        })
            .catch((error) => {
                alert(error.message)
                console.log(error.message)
            })
    }

    const [allFullProperties, setAllFullProperties] = useState([]);
    const [showUI, setShowUI] = useState(0);
    const [onlyBasicDetails, setOnlyBasicDetails] = useState([]);
    const [allCities, setAllCities] = useState(['city']);
    const [selectedCity, setSelectedCity] = useState()
    const [hotelRoomPrice, setHotelRoomPrice] = useState({})
    const [empty, setEmpty] = useState(false)
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
                final = { "property_id": property_id, "price": temp_rates[i].price, "currency": temp_rates[i].currency }
            }
        }
        return final;
    }


    function fetchAllProperties(name) {
        const url = `/api/all_properties_data/${name}`;
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
                    setShowUI(1);
                    setEmpty(false)
                
            }
            )
            .catch((error) => {
                setEmpty(true)
                console.log('error in fetching data of all properties')
            })
    }


    return (
        <main>
            <Header bgColor={'bg-transparent  absolute z-20 w-full'} />
            <div className='relative flex justify-center items-center bg-[url("/dalLake.jpg")] bg-no-repeat bg-cover h-screen text-center'>
                <div className='lg:bg-blur backdrop-blur-sm py-2'>
                    <h2 className='text-white border-b-white capitalize text-5xl md:text-8xl lg:text-8xl  text-gray-700  inline-block border-b-4 border-gray-700 pb-2 mb-5'>{place?.name}</h2>
                    <p className='text-white md:text-2xl lg:text-xl px-5'>{placeDetail?.description}</p>
                </div>
            </div>
            <div className='text-center bg-white md:flex md:flex-row flex flex-col flex-col-reverse z-10 '>
                <div className='py-10 px-3 md:w-9/12 lg:w-8/12'>
                    <h2 className='capitalize text-3xl md:text-4xl text-gray-700 my-auto inline-block border-b-4 border-gray-700 pb-2 mb-5'>HOTELS</h2>
                    {empty === false ? 
                    <div className='md:flex md:flex-wrap md:gap-2 lg:gap-5 md:justify-center'>
                        {onlyBasicDetails?.map((hotel, idx) =>
                        (hotel?.address[0].address_city === selectedCity ?
                            <div key={idx} className=' md:w-5/12 lg:w-2/5 ' >
                                <PropertyCard bgcolor={"bg-white"} hotel={hotel} price={hotelRoomPrice.filter(price => price.property_id === hotel.property_id)[0]} />
                            </div> : <></>
                        ))}
                    </div> :
                    <div className='md:flex md:flex-wrap md:gap-2 lg:gap-5 md:justify-center text-xl'>
                     <h1 >No Registered Property Found !!!</h1>
                     </div>}


                </div>

                <div className="md:w-3/12 md:my-10 md:mx-5 lg:w-4/12">
                    <div>
                        <img className='mx-auto inline-block' src={imageURL}></img>
                        <span className='text-2xl font-medium'>{weatherTemperature}°C</span>
                    </div>

                    <div className='flex flex-wrap justify-center gap-5 md:flex-col lg:flex-row'>
                        <div className='w-5/12 md:w-full lg:w-5/12 border shadow rounded-xl bg-slate-100 py-5 px-2'>
                            <p>Latitude: {placeDetail?.latitude}°</p>
                            <p>Longitude: {placeDetail?.longitude}°</p>
                        </div>
                        <div className='w-5/12 md:w-full lg:w-5/12 border shadow rounded-xl bg-slate-100 p-5 flex'>
                            <p className='m-auto'>Airport: {placeDetail?.airport_distance} km</p>
                        </div>

                    </div>
                </div>

            </div>

            <Footer />

        </main>

    )
}

export default place;