import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Card from '../Card';


import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HouseSidingOutlinedIcon from '@mui/icons-material/HouseSidingOutlined';
import BungalowOutlinedIcon from '@mui/icons-material/BungalowOutlined';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';

function Category() {

    const [allPropertyTypes, setPropertyTypes] = useState([]);

    useEffect(() => {
        getPropertyTypes()
    }, []);


    function getPropertyTypes() {
        let url = "/api/all_property_types";
        axios.get(url)
            .then((response) => {
                setPropertyTypes(response.data)
                console.log("property categories loaded succesfully")
                console.log(allPropertyTypes)

            })
            .catch((err) => {
                console.log(JSON.stringify(err))
            })
    }


    let icons = {
        "hotel": <ApartmentOutlinedIcon sx={{ fontSize: '60px', color: '#2912d3' }} />,
        "resort": <HouseSidingOutlinedIcon sx={{ fontSize: '60px', color: '#6BB477 ' }} />,
        "motel": <BungalowOutlinedIcon sx={{ fontSize: '60px', color: '#B69716' }} />,
        "home stay": <HomeOutlinedIcon sx={{ fontSize: '60px', color: '#2912d3' }} />,
        "guest house": <HomeWorkOutlinedIcon sx={{ fontSize: '60px', color: '#2912d3' }} />,
        "lodge": <CottageOutlinedIcon sx={{ fontSize: '60px', color: '#B69716 ' }} />,
        "hostel": <GiteOutlinedIcon sx={{ fontSize: '60px', color: '#2912d3' }} />,
        "hut": <HolidayVillageOutlinedIcon sx={{ fontSize: '60px', color: '#6BB477' }} />,
    }


    return (
        <section>
            <div className='py-10'>
                <div className='py-8'>
                    <div className='px-3 text-center'>
                        <div className='text-center mb-6'>
                            <span className='bg-blue-100 pr-2 py-2 rounded-2xl'>
                                <span><FontAwesomeIcon icon={faCircleArrowRight} size="2xl" style={{ color: "#2912d3", }} /></span>
                                <span className='text-blue-800 text-xl font-medium pl-3 tracking-wide'>Category</span>
                            </span>
                            <h2 className='mt-4 mb-6 text-3xl font-medium text-gray-700'>Select From Our Categories</h2>
                            <p className='text-gray-500 tracking-wide font-medium'>Choose from luxurious huts, cozy hotel rooms, beautiful home stays, wonderful lodges, or serene countryside resort estates for your perfect vacation.</p>
                        </div>
                        <div className='md:flex md:flex-wrap md:gap-10 md:justify-center md:mt-10'>
                            {allPropertyTypes.map((item, index) =>
                                <div className='mb-5 md:mb-0 md:w-5/12  lg:w-3/12'>
                                    <Card
                                        key={index}
                                        propertyIcon={icons[item?.property_type]}
                                        propertyType={item?.property_type}
                                        propertyDescription={item?.description}
                                    />
                                </div>

                            )}
                        </div>


                    </div>


                </div>

            </div>
        </section>
    )
}

export default Category;