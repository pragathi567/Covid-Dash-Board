import React from 'react'
import './SearchBar.css'
import { BsSearch } from 'react-icons/bs'
const SearchBar = (props) => {
    const {onChangeSearchInput,searchInput} = props
    const onChangeSearch = (event) =>{
        onChangeSearchInput(event)
    }
  return (
    <div className='search-container'>
       <BsSearch className='search-icon'/>
       <input className='search' type='search' placeholder='search state' onChange={onChangeSearch} value={searchInput}/>
    </div>
  )
}

export default SearchBar