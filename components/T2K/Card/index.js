import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCarBuilding
} from "@fortawesome/free-solid-svg-icons";



function Card({propertyIcon,propertyType,propertyDescription}) {
  return (
    <div className='py-12'>
        <div>
            <div className='p-8'>
                {/* <span>{propertyIcon}</span> */}
                <span>
                <FontAwesomeIcon icon={faCarBuilding} size="2xl" style={{color: "#446aab",}} />
                </span>
                {/* <h5>{propertyType}</h5> */}
                {/* <p>{propertyDescription}</p> */}
            </div>

        </div>
    </div>
  )
}

export default Card