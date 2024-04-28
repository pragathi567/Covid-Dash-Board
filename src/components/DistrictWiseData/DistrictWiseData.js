import React from 'react'
import './DistrictWiseData.css'
const DistrictWiseData = (props) => {
    const {number,name} = props
  return (
    <li className='district'>
      <p className='district-number'>{number}</p>
      <p className='district-name'>{name}</p>
    </li>
  )
}

export default DistrictWiseData