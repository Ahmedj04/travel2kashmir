import Header from '@/components/T2K/Header'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Carousel from 'better-react-carousel';
import PropertyCard from '@/components/T2K/Cards/PropertyCard';
import Footer from '@/components/T2K/Footer';
import BookingForm from '@/components/T2K/utils/BookingForm';
import Loader from '@/components/T2K/Loaders/Loader';


function place() {
    SwiperCore.use([Navigation, Pagination, Autoplay]);

    const [place, setPlace] = useState();
    const [placeDetail, setPlaceDetail] = useState([]);
    const [seasonDetail, setSeasonDetail] = useState([]);
    const [location, setLocation] = useState([]);

    const [allFullProperties, setAllFullProperties] = useState([]);
    const [showUI, setShowUI] = useState(0);
    const [onlyBasicDetails, setOnlyBasicDetails] = useState([]);
    const [allCities, setAllCities] = useState(['city']);
    const [selectedCity, setSelectedCity] = useState()
    const [hotelRoomPrice, setHotelRoomPrice] = useState({})

    // loaders
    const [seasonLoader, setSeasonLoader] = useState(0);
    const [placeDetailLoader, setPlaceDetailLoader] = useState(0);
    const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
    const [weatherDetailLoader, setWeatherDetailLoader] = useState(0);

    const [empty, setEmpty] = useState(false)
    const [cat, setCat] = useState([])

    const weatherTemperature = location?.main?.temp;
    // const weatherDescription = location?.weather?.[0]?.description;
    const weatherIcon = location?.weather?.[0]?.icon;
    const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        let place_prop = localStorage.getItem("place")
        setPlace(JSON.parse(place_prop));
        fetchAllPlaceDetails(JSON.parse(place_prop).places_id)
        fetchAllSeasonDetails(JSON.parse(place_prop).places_id)
        getWeather(JSON.parse(place_prop).name);
        fetchAllProperties(JSON.parse(place_prop).name)
    }, [query])

    // getWeather function is used to get the weather from the openweather api.
    function getWeather(name) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=62779ab6389dbe138a06a5f268fee0d2&units=metric`
        axios.get(url).then((response) => {
            console.log(response)
            setLocation(response.data)
            setWeatherDetailLoader(1)
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
            manageCat(response.data.places[0]?.categories)
            setPlaceDetailLoader(1)
            console.log(response.data.places[0])
        })
            .catch((error) => {
                alert(error.message)
                console.log(error.message)
            })
    }

    function fetchAllSeasonDetails(id) {
        let url = `/api2/seasons/${id}`;
        axios.get(url, {
            headers: {
                "x-hasura-admin-secret": process.env.NEXT_PUBLIC_PASS
            }
        }).then((response) => {
            setSeasonDetail(response.data.place_seasons)
            setSeasonLoader(1);
            console.log(response.data.place_seasons)
        })
            .catch((error) => {
                alert(error.message)
                console.log(error.message)
            })
    }


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
                setHotelDetailLoader(1);

            }
            )
            .catch((error) => {
                setEmpty(true)
                console.log('error in fetching data of all properties')
            })
    }

    function manageCat(allCat) {
        let categories = allCat?.map(cat => cat.cat_name);
        let temp = [... new Set(categories)]
        setCat(temp)
        console.log("Set: " + cat)
    }

    return (
        <main>

            <Header bgColor='white' />

            <div className='px-3 h-full '>
                <div className='my-8 flex items-center'>
                    <div className='w-full md:w-6/12'>
                        {placeDetailLoader === 0 ? <><Loader size={`w-6/12 h-20`} /></> : <>
                            <p className='text-6xl font-medium text-slate-600  inline-block mr-5 md:mr-10 lg:mr-10'>{place?.name} </p>

                        </>}
                        <div className='flex flex-wrap w-3/4 pt-5'>
                            {placeDetailLoader === 0 ? <><Loader size={`w-16 h-8 rounded-3xl`} /><Loader size={`w-16 h-8 ml-1 rounded-3xl`} /> </> : <>
                                {cat.map((item, index) => {
                                    return <span key={index} className='bg-gray-500 text-white py-2 px-2 mx-1 rounded-xl text-xs'>{item}&nbsp;</span>
                                })}
                            </>}

                        </div>
                    </div>

                    {/* weather for place */}
                    {/* <div className='flex justify-end items-center lg:flex-row md:flex-row flex-col w-6/12  lg:ml-auto lg:pr-4'>
                        <img className='inline-block h-20' src={imageURL}></img>
                        <span className='text-lg font-medium'>{weatherTemperature}°C</span>
                    </div> */}

                </div>

                {/* -------------------------------------------------------------------------- */}
                {/* for now commented this code because need to change the UI. Needed to add season section */}
                {/* <div className='hidden lg:block lg:w-4/12 lg:sticky lg:top-0  lg:float-right z-10'>
                    <div className='lg:ml-9 rounded-2xl bg-slate-200 '>
                        <BookingForm />
                    </div>
                </div>

                <div className='w-full lg:w-8/12'>
                    <div>
                        <div>
                            <Swiper
                                centeredSlides={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}

                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper rounded-xl">
                                <SwiperSlide>
                                    <img
                                        className="object-fill w-full h-96"
                                        src='dalLake.jpg'
                                        alt="image slide 1"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        className="object-fill w-full h-96"
                                        src='categoryPic.jpg'
                                        alt="image slide 1"
                                    />
                                </SwiperSlide>
                            </Swiper>

                            <div className='mt-10'>
                                <div className='city-description'>
                                    <p className='text-slate-500'>{placeDetail?.description}</p>
                                </div>

                            </div>

                            <div>
                                {empty === false ?
                                    <div className='md:flex md:flex-wrap md:gap-2 lg:gap-5 md:justify-center md:py-10'>
                                        <Carousel cols={3} rows={1} gap={10} autoPlay={5000} loop={true}
                                            responsiveLayout={[
                                                {
                                                    breakpoint: 480,
                                                    cols: 1,
                                                    rows: 1,
                                                    gap: 10,
                                                    loop: true,
                                                    autoplay: 1000
                                                },
                                                {
                                                    breakpoint: 810,
                                                    cols: 2,
                                                    rows: 1,
                                                    gap: 10,
                                                    loop: true,
                                                    autoplay: 1000
                                                },
                                                {
                                                    breakpoint: 1200,
                                                    cols: 2,
                                                    rows: 1,
                                                    gap: 10,
                                                    loop: true,
                                                    autoplay: 1000
                                                },
                                            ]}
                                        >
                                            {onlyBasicDetails?.map((hotel, idx) =>
                                            (hotel?.address[0].address_city === selectedCity ?
                                                <Carousel.Item key={idx}>
                                                    <div>
                                                        <PropertyCard bgcolor={"bg-white"} hotel={hotel} price={hotelRoomPrice.filter(price => price.property_id === hotel.property_id)[0]} />
                                                    </div>
                                                </Carousel.Item>

                                                : <></>
                                            ))}
                                        </Carousel>
                                    </div> :
                                    <div className='md:flex md:flex-wrap md:gap-2 md:py-10 lg:gap-5 md:justify-center text-xl '>
                                        <h1 >No Registered Property Found !!!</h1>
                                    </div>}
                            </div>
                        </div>

                        <div></div>
                    </div>
                </div> 
                */}
                {/* ------------------------------------------------------------------------------------- */}

                <div className='flex mb-10'>
                    <div className='w-full lg:w-8/12'>
                        <div>
                            <Swiper
                                centeredSlides={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}

                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper rounded-xl">
                                <SwiperSlide>
                                    <img
                                        className="object-fill w-full h-96"
                                        src='dalLake.jpg'
                                        alt="image slide 1"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        className="object-fill w-full h-96"
                                        src='categoryPic.jpg'
                                        alt="image slide 1"
                                    />
                                </SwiperSlide>
                            </Swiper>

                            <div className='mt-10'>
                                {placeDetailLoader === 0 ? <Loader size={`w-full h-20`} /> : <>
                                    <div className='city-description'>
                                        <p className='text-slate-500'>{placeDetail?.description}</p>
                                    </div>
                                </>}


                            </div>

                            {/* hotel carousel commented and actually taken out of this div */}
                            {/* <div>
                                {empty === false ?
                                    <div className='md:flex md:flex-wrap md:gap-2 lg:gap-5 md:justify-center md:py-10'>
                                        <Carousel cols={3} rows={1} gap={10} autoPlay={5000} loop={true}
                                            responsiveLayout={[
                                                {
                                                    breakpoint: 480,
                                                    cols: 1,
                                                    rows: 1,
                                                    gap: 10,
                                                    loop: true,
                                                    autoplay: 1000
                                                },
                                                {
                                                    breakpoint: 810,
                                                    cols: 2,
                                                    rows: 1,
                                                    gap: 10,
                                                    loop: true,
                                                    autoplay: 1000
                                                },
                                                {
                                                    breakpoint: 1200,
                                                    cols: 2,
                                                    rows: 1,
                                                    gap: 10,
                                                    loop: true,
                                                    autoplay: 1000
                                                },
                                            ]}
                                        >
                                            {onlyBasicDetails?.map((hotel, idx) =>
                                            (hotel?.address[0].address_city === selectedCity ?
                                                <Carousel.Item key={idx}>
                                                    <div>
                                                        <PropertyCard bgcolor={"bg-white"} hotel={hotel} price={hotelRoomPrice.filter(price => price.property_id === hotel.property_id)[0]} />
                                                    </div>
                                                </Carousel.Item>

                                                : <></>
                                            ))}
                                        </Carousel>
                                    </div> :
                                    <div className='md:flex md:flex-wrap md:gap-2 md:py-10 lg:gap-5 md:justify-center text-xl '>
                                        <h1 >No Registered Property Found !!!</h1>
                                    </div>}
                            </div> */}

                        </div>
                    </div>

                    {/* for now hidden for sm and md screen */}
                    <div className='hidden lg:block lg:w-4/12'>
                        <div className='ml-9 py-6 border rounded-lg shadow-lg'>
                            <div className='flex pb-2'>
                                <div className='pl-6'>
                                    <h3 className='lg:text-2xl flex leading-none  font-bold my-auto border-b-2 border-slate-600 inline-block'>Seasons</h3>
                                </div>
                                <div className='flex justify-end items-center lg:flex-row md:flex-row flex-col w-6/12  lg:ml-auto lg:pr-4'>
                                {weatherDetailLoader === 0 ? <Loader size={`w-8 h-7`}/> :<img className='inline-block h-12' src={imageURL}></img> }
                                {weatherDetailLoader === 0 ? <Loader size={`w-8 h-7`}/> :<span className='text-lg font-medium text-sm'>{weatherTemperature}°C</span> }
                                    
                                    
                                </div>
                            </div>
                            <div className='px-6'>
                                {seasonLoader === 0 ? <> <Loader size={`w-full h-6 mb-1`} /> <Loader size={`w-full h-6 mb-1 `} /><Loader size={`w-full h-6 mb-1 `} /><Loader size={`w-full h-6 mb-1 `} /></> : <>
                                    {seasonDetail?.map((season, index) => {
                                        return (
                                            <div key={index} className='flex justify-between border-b pt-2 text-sm text-slate-500'>
                                                <p>{season.season_name}</p>
                                                <p className='pl-2 truncate overflow-hidden'>{season.period}</p>
                                                <div>
                                                    <span>{season.min_temp}°C to </span>
                                                    <span>{season.max_temp}°C</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>}

                            </div>

                            <div>
                                <div className=' pl-6 pt-6'>
                                    <h3 className='lg:text-2xl font-bold border-b-2 border-slate-600 inline-block'>Languages</h3>
                                </div>
                                <div className='px-6 mt-4 flex'>
                                    {placeDetailLoader === 0 ? <><Loader size={`w-20 h-8  rounded-3xl`} /><Loader size={`w-20 h-8 ml-1 rounded-3xl`} /><Loader size={`w-20 h-8 ml-1 rounded-3xl`} /></> : <>
                                        {placeDetail?.languages_spoken?.map((place, index) => {
                                            return (
                                                <div className=''>
                                                    <p key={index} className='bg-orange-500 text-white py-2 px-2 mx-1 rounded-xl text-sm'>{place?.language}</p>
                                                </div>
                                            );
                                        })}
                                    </>}

                                </div>
                            </div>

                            <div>
                                <div className='pl-6 pt-6'>
                                    <h3 className='lg:text-2xl font-bold border-b-2 border-slate-600 inline-block'>More about place</h3>
                                </div>
                                <div className='px-6 mt-4 flex flex-wrap gap-3'>
                                    {placeDetailLoader === 0 ? <><Loader size={`w-5/12 h-16  rounded-xl`} /><Loader size={`w-5/12 h-16  rounded-xl`} /></> : <>
                                        <p className='bg-slate-200 w-5/12 text-center rounded-xl  text-slate-500 py-2 px-2 mx-1  text-sm'>Distance form Airport:- {placeDetail?.airport_distance}km</p>
                                        <p className='bg-slate-200 w-5/12 text-center rounded-xl  text-slate-500 py-2 px-2 mx-1  text-sm'>Best time to visit:- {placeDetail?.best_time_to_visit}</p>
                                        <p className='bg-slate-200 w-5/12 text-center rounded-xl  text-slate-500 py-2 px-2 mx-1  text-sm'><span className='text-left'>Latitude:- {placeDetail?.latitude}°</span><br /><span>Longitude:- {placeDetail?.longitude}°</span></p>


                                    </>}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <hr className='pb-10' />

                <div className='hidden lg:block lg:w-4/12 lg:sticky lg:top-0  lg:float-right z-10'>
                    <div className='lg:ml-9 rounded-2xl bg-slate-50 shadow '>
                        <BookingForm />
                    </div>
                </div>

                <div className='w-full lg:w-8/12'>
                    <div className='py-5 text-center'>
                        <h2 className='font-bold text-2xl lg:text-2xl  border-b-2 border-slate-600 inline-block'>Attractions</h2>
                    </div>
                    <div className='flex flex-wrap md:gap-1 lg:gap-8 md:justify-center pb-14 border-b'>
                        {placeDetailLoader === 0 ? <><Loader size={`w-full mb-1 h-40 block md:inline-block md:w-3/12 md:rounded-xl md:h-40 `} /><Loader size={`w-full h-40 block md:inline-block md:w-3/12 md:rounded-xl md:h-40 `} /></> : <>
                            {placeDetail?.attractions?.map((place, index) => {
                                return (
                                    <div key={index} className='md:w-60 lg:w-3/12 border rounded-xl  md:hover:shadow-2xl md:hover:scale-105 md:hover:transition-all'>
                                        <div className='p-5'>
                                            <div className='mb-5'>
                                                <h5 className='text-xl font-semibold text-gray-700 capitalize  border-b-2 border-slate-600 inline-block'>{place.attraction_name}</h5>

                                            </div>
                                            <img src='/imghome.webp' className=' rounded-md w-full h-36'></img>
                                            <p className='text-gray-500 tracking-wide text-sm font-normal pt-5'>{place.attraction_description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>}

                    </div>


                    {/* -----------------------------------------------------------------------------------------------------------          */}
                    {/* just commented because this code contains the two sections first things to do and attractions */}
                    {/* <div className='lg:w-6/12'><h2 className='font-medium text-xl text-slate-600  py-5 text-center'>Things To Do</h2></div> */}
                    {/* <div className='lg:w-6/12 border'>
                        <h2 className='font-medium text-xl text-slate-600 py-5 text-center'>Attractions</h2>
                        <div className='flex flex-wrap'>
                            {placeDetail?.attractions?.map((place, index) => {
                                return (
                                    <div className='w-6/12 border rounded-xl  md:hover:shadow-2xl md:hover:scale-105 md:hover:transition-all'>
                                        <div className='pb-8'>
                                            <div className='p-8'>
                                                <h5 className='text-xl font-semibold text-gray-700 mt-5 mb-2 capitalize'>{place.attraction_name}</h5>
                                                <img src='/dalLake.jpg' className='h-36'></img>
                                                <p className='text-gray-500 tracking-wide font-normal'>{place.attraction_description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div> */}
                    {/* -------------------------------------------------------------------------------------------- */}

                </div>

                {/* hotels div */}
                <div className='w-full lg:w-8/12'>
                    <div className='py-5 text-center '>
                        <h2 className='font-bold text-2xl lg:text-2xl  border-b-2 border-slate-600 inline-block'>Hotels</h2>
                    </div>
                    {empty === false ?
                        <div className='md:flex md:flex-wrap md:gap-2 lg:gap-5 md:justify-start pb-10'>
                            {hotelDetailLoader === 0 ? <>
                                <Loader size={`w-full h-44 md:w-5/12 md:h-44`} /><Loader size={`h-0 md:w-5/12 md:h-44`} /> </> : <>
                                <Carousel
                                    cols={3} rows={1} gap={20} autoPlay={5000} loop={true}
                                    responsiveLayout={[
                                        {
                                            breakpoint: 480,
                                            cols: 1,
                                            rows: 1,
                                            gap: 10,
                                            loop: true,
                                            autoplay: 1000
                                        },
                                        {
                                            breakpoint: 810,
                                            cols: 2,
                                            rows: 1,
                                            gap: 10,
                                            loop: true,
                                            autoplay: 1000
                                        },
                                        {
                                            breakpoint: 1200,
                                            cols: 2,
                                            rows: 1,
                                            gap: 10,
                                            loop: true,
                                            autoplay: 1000
                                        },
                                    ]}
                                >
                                    {onlyBasicDetails?.map((hotel, idx) =>
                                    (hotel?.address[0].address_city === selectedCity ?
                                        <Carousel.Item key={idx}>
                                            { }

                                            <PropertyCard bgcolor={"bg-white z-50"} hotel={hotel} price={hotelRoomPrice.filter(price => price.property_id === hotel.property_id)[0]} />

                                        </Carousel.Item>

                                        : <></>
                                    ))}
                                </Carousel>
                            </>}

                        </div> :
                        <div className='md:flex md:flex-wrap md:gap-2 md:py-10 lg:gap-5 md:justify-center text-xl '>
                            <h1 >No Registered Property Found !!!</h1>
                        </div>}
                </div>

            </div>

            <Footer />


        </main>
    )
}

export default place