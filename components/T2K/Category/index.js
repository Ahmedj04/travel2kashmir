import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowRight
} from "@fortawesome/free-solid-svg-icons";
import Card from '../Card';


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

    return (
        <section>
            <div className='py-10'>
                <div className='py-8'>
                    <div className='px-3'>
                        <div className='text-center'>
                            <span className='bg-blue-100 pr-2 py-2 rounded-2xl'>
                                <span><FontAwesomeIcon icon={faCircleArrowRight} size="2xl" style={{ color: "#2912d3", }} /></span>
                                <span className='text-blue-800 text-xl font-medium pl-3 tracking-wide'>Category</span>
                            </span>
                            <h2 className='mt-4 mb-6 text-3xl font-medium text-gray-700'>Select From Our Categories</h2>
                            <p className='text-gray-500 tracking-wide font-medium'>Choose from luxurious huts, cozy hotel rooms, beautiful home stays, wonderful lodges, or serene countryside resort estates for your perfect vacation.</p>
                        </div>
                        <Card />

                    </div>


                </div>

            </div>
        </section>
    )
}

export default Category;