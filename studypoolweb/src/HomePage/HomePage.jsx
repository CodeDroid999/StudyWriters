import React from 'react'
import Header from '../components/Header/Header';

import Slider from '../components/Slider/Slider';
import Work from '../components/Work/Work';
import About from '../components/About/About';
import Founders from '../components/Founders/Founders';
import Footer from '../components/Footer/Footer';

import Navbar from '../components/Navbar/Navbar';


const HomePage = ({setLoginUser}) => {
  return (
    <div>
       <Navbar/>
<Header/>
<Slider/>
<Work/>
<About/>
<Founders/>
<Footer/> 
    </div>
  )
}

export default HomePage