import React from 'react'
import './FounderFloatingDiv.css'
import comma from '../../img/comma.png'
import comma2 from '../../img/comma2.png'



const FounderFloatingDiv = ({image,width,height,name,logo1,logo2,text1,linkedin,github,text2,text3}) => {
  return (
    <div className="Founder">
    <div className="Founderdetail">
    <div className='FounderPicture'>
    <img src={image}  alt="img"></img>
    </div>
    <h3>{name}</h3>
    <div className="logo">
   <a href={linkedin}><img src={logo1} alt="" Width={width} Height={height}></img></a>
  <a href={github}><img src={logo2} alt=""></img></a>
    </div>
    <div className="foundertext">
    
    <span><img src={comma}/>{text1}</span>
    <span>{text2}</span>
    <span>{text3}<img src={comma2}/></span>
</div>

    
    </div>
    
    </div>
    
  )
}

export default FounderFloatingDiv
