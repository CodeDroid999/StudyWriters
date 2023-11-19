import React from 'react'
import './Header.css'


const Header = () => {
  return (
    <div className='Header'>
  <div className="Headerleft"><h1>24/7 Study Help</h1></div>
  <div className="Headerright">
   <p>  Access more than a billion study papers and<br/>
     recieve assistance with your homework employing<br/>
 Studypool</p>
    <input className='HaederSearch' type="text" placeholder="Search.."/>


  </div>

    </div>

)
}

export default Header