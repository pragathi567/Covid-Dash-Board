import React from 'react'
import { Link } from 'react-router-dom'
import './TotalStateDetails.css'
const TotalStateDetails = (props) => {
    const {details} = props
    const {confirmed,recovered,deceased,population,stateCode,stateName,other} = details
    const active = confirmed - recovered - deceased - other
  return (
    <li className='state'>
        <div className='table'>
           <div className='table-name state-ut'>
             <Link to={`/state/${stateCode}`}>
                <p className='state-name'>{stateName}</p>
             </Link>
           </div>
           <div className='table-para confirmed'>
             <p>{confirmed}</p>
           </div>
           <div className='table-para active'>
             <p>{active}</p>
           </div>
           <div className='table-para recovered'>
             <p>{recovered}</p>
           </div>
           <div className='table-para deceased'>
             <p>{deceased}</p>
           </div>
           <div className='table-para population'>
             <p>{population}</p>
           </div>
        </div>
    </li>
  )
}

export default TotalStateDetails