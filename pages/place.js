import React, { useState, useEffect } from 'react'
import Footer from '@/components/T2K/Footer';
import Header from '@/components/T2K/Header';
import axios from 'axios';
import { Place } from '@mui/icons-material';
import { useRouter } from 'next/router';


function place() {
    const [place, setPlace] = useState();
    const [placeDetail, setPlaceDetail] = useState([]);
    const [location, setLocation] = useState([]);
    const weatherTemperature = location?.main?.temp;
    const weatherDescription = location?.weather?.[0]?.description;
    const weatherIcon = location?.weather?.[0]?.icon;
    const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    const router = useRouter();
    const { query } =router;
    useEffect(() => {
        
        let place_prop = localStorage.getItem("place")
        setPlace(JSON.parse(place_prop));
        fetchAllPlaceDetails(JSON.parse(place_prop).places_id)
        getWeather(JSON.parse(place_prop).name);
    }, [query])

    
    // getWeather(query.p);


    function getWeather(name) {
        alert("name is"+name)
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



    return (
        <main>
            <Header />
            <div className='text-center bg-slate-100 lg:flex lg:'>
                <div className='p-10 lg:w-8/12'>
                    <h2 className='capitalize text-3xl md:text-5xl text-gray-700 my-auto inline-block border-b-4 border-gray-700 pb-2 mb-5'>{place?.name}</h2>
                    <p className='md:text-base'>{placeDetail?.description}</p>
                </div>
                <div className="lg:4/12">
                    <div className="weatherDetails">
                        <h1>The Temperture in {place?.name} is {weatherTemperature} degree Celcius</h1>
                        <img className='mx-auto' src={imageURL}></img>
                        <p>The weather is currently {weatherDescription}</p>
                    </div>
                </div>

            </div>



            <Footer />
        </main>

    )
}

export default place;