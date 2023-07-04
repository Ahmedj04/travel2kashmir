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
                    <div className='w-6/12'>
                        <p className='text-6xl font-medium text-slate-600 inline-block mr-5 md:mr-10 lg:mr-10'>{place?.name} </p>
                        <div className='flex flex-wrap w-3/4 pt-5'>
                            {cat.map((item, index) => {
                                return <span key={index} className='bg-gray-500 text-white py-2 px-2 mx-1 rounded-xl text-xs'>{item}&nbsp;</span>
                            })}

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
                                <div className='city-description'>
                                    <p className='text-slate-500'>{placeDetail?.description}</p>
                                </div>

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
                                <h3 className='lg:text-2xl flex leading-none pl-6 font-bold my-auto'>Seasons</h3>
                                <div className='flex justify-end items-center lg:flex-row md:flex-row flex-col w-6/12  lg:ml-auto lg:pr-4'>
                                    <img className='inline-block h-12' src={imageURL}></img>
                                    <span className='text-lg font-medium text-sm'>{weatherTemperature}°C</span>
                                </div>
                            </div>
                            <div className='px-6'>
                                {seasonDetail?.map((season, index) => {
                                    return (
                                        <div key={index} className='flex justify-between border-b pt-2'>
                                            <p>{season.season_name}</p>
                                            <p>{season.period}</p>
                                            <div>
                                                <span>{season.min_temp}°C to </span>
                                                <span>{season.max_temp}°C</span>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                                <h3 className='lg:text-2xl font-bold pl-6 pt-6'>Languages</h3>
                                <div className='px-6 mt-2 flex'>
                                    {placeDetail?.languages_spoken?.map((place, index) => {
                                        return (
                                            <div className=''>
                                                <p key={index} className='bg-orange-500 text-white py-2 px-2 mx-1 rounded-xl text-xs'>{place?.language}</p>

                                            </div>

                                        );
                                    })}
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
                <div className='lg:w-8/12 border shadow h-96 flex'>
                    <div className='lg:w-6/12'><h2 className='font-medium text-xl text-slate-600  py-5 text-center'>Things To Do</h2></div>
                    <div className='lg:w-6/12'><h2 className='font-medium text-xl text-slate-600 py-5 text-center'>Attractions</h2></div>
                </div>


                {/* <div className='flex my-10'>
                    <div className='lg:w-4/12'>hello</div>
                    <div className='lg:w-4/12'>world</div>
                    <div className='hidden lg:block lg:w-4/12 lg:sticky lg:top-0  lg:float-right z-10'>
                        <div className='lg:ml-9 rounded-2xl bg-slate-200 '>
                            <BookingForm />
                        </div>
                    </div>
                </div> */}

                {/* <hr /> */}

                {/* hotels div */}
                <div className='w-full lg:w-8/12'>
                    {empty === false ?
                        <div className='md:flex md:flex-wrap md:gap-2 lg:gap-5 md:justify-start md:py-10'>
                            <Carousel cols={3} rows={1} gap={20} autoPlay={5000} loop={true}
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

            <Footer />


        </main>
    )
}

export default place