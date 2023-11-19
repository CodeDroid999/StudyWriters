import React from 'react'
import {Link} from 'react-scroll';
import Login from '../Login/Login'
import SignIn from '../SignIn/SignIn'
import SellDocs from '../SellDocs/SellDocs'
import Notes from '../Notes/Notes'

import {NavLink} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className='BrandName' ><li>StudyPool</li></div>
        <div className='NavbarItem'>


{/* Drop down for Home Pages */}

<div class="dropdown2">
    <button class="dropbtn2"><p>Home</p> 
      <i class="fa fa-caret-down2"></i>
    </button>
    <div class="dropdown2-content">
   
     {/* Homepage items */}
     <button id='NavWork'>
          <Link spy={true} to='Work' smooth ={true} >
            How it works
            </Link></button>

            <button id='NavAbout'>
            <Link spy={true} to='About' smooth ={true} >
            About
            </Link></button>

            <button id='NavContact'>
            <Link spy={true} to='Footer' smooth ={true} >
          ContactUs
            </Link></button>

         
    </div>
   
</div>



{/* Drops down for Sell docs         */}
  
  <div class="dropdown">
    <button class="dropbtn"><p>Sell Docs</p>
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
    <button id="notesbtn"><NavLink to="/Notes">Upload</NavLink></button>
        <button id="selldocsbtn"><NavLink to="/SellDocs">MyUploads</NavLink></button>
    </div>
   
</div>










          {/* Homepage items */}
          {/* <button id='NavWork'>
          <Link spy={true} to='Work' smooth ={true} >
            How it works
            </Link></button>

            <button id='NavAbout'>
            <Link spy={true} to='About' smooth ={true} >
            About
            </Link></button>

            <button id='NavContact'>
            <Link spy={true} to='Footer' smooth ={true} >
          ContactUs
            </Link></button> */}

         
        {/* <button id="notesbtn"><NavLink to="/Notes">Notes</NavLink></button>
        <button id="selldocsbt"><nNavLink to="/SellDocs">SellDocs</NavLink></button> */}
         <button id="loginbtn"><NavLink to="/login">Login</NavLink></button>
          <button id="signupbtn"><NavLink to="/signin"><p>SignIn</p></NavLink></button>
        
          </div>
      





          <div class="menu" id="toggle-button">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
      </div>
    </div>
  )
}

export default Navbar