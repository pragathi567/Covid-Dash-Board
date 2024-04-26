import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { IoMenu } from 'react-icons/io5'
import { MdOutlineCancel } from 'react-icons/md'
const Header = () => {
  const [menuIcon,setMenuIcon] = useState(false);
  const toggleMenu = () =>{
    menuIcon ? setMenuIcon(false) : setMenuIcon(true)
  }
  const closeMenu = () =>{
    setMenuIcon(false)
  }
  return (
    <header>
      <nav>
        <div>
            <Link to="/" className='header-heading'>
            <h1>COVID19<span className='india'>INDIA</span></h1>
            </Link>
        </div>
        <IoMenu className='menu-icon' onClick={toggleMenu}/>
        <ul className={menuIcon ? "" : 'hide'}>
          <li><Link to="/" className='nav-link'>Home</Link></li>
          <li><Link to="/about" className='nav-link'>About</Link></li>
          <li><MdOutlineCancel className='menu-icon-cancel' onClick={closeMenu}/></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
