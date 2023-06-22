import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHotel
} from "@fortawesome/free-solid-svg-icons";
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HouseSidingOutlinedIcon from '@mui/icons-material/HouseSidingOutlined';



function Card({ propertyIcon, propertyType, propertyDescription }) {

  return (
    <div className='border rounded-xl md:h-full  md:hover:shadow-2xl'>
      <div className='pb-8'>
        <div className='p-8'>
          <span>{propertyIcon}</span>
          <h5 className='text-xl font-semibold text-gray-700 mt-5 mb-2 capitalize'>{propertyType}</h5>
          <p className='text-gray-500 tracking-wide font-normal'>{propertyDescription?.substring(0,100)}</p>
        </div>
        <div>
          <a className='p-9 font-semibold' style={{ color: "#2912d3", }}>Read More &nbsp;<FontAwesomeIcon icon={faArrowRight} /> </a>
        </div>

      </div>
    </div>
  )
}

export default Card