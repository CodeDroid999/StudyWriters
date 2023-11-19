import React from 'react'
import './PricingPlanFloatingDiv.css'
import earn from "../../img/earn.png";
import verify from "../../img/verify.png";
import upload from "../../img/upload.png";

const PricingPlanFloatingDiv = ({plan,price,priceDetail1,priceDetail2,priceDetail3,boxShadow}) => {
 
    return (
    <div className='PricingPlanFloatingDiv' >
      <div className="pricingDiv">
        <div className="plan"><h1>PLAN    {plan}</h1></div>
        <div className="price"><h2>${price}</h2></div>
      <div className="pricedetails"><span>{priceDetail1}</span>
      <span>{priceDetail2}</span>
      <span>{priceDetail3}</span>
      </div>
<div className="plandetails">
    <div className="detail1"><img src={earn}/><span>Lorem ipsum dolor sit amet.</span></div>
    <div className="detail1"><img src={verify}/><span>Lorem ipsum dolor sit amet.</span></div>
    <div className="detail1"><img src={upload}/><span>Lorem ipsum dolor sit amet.</span></div>
    
</div>
<div className="planBuyBtn">
    <button >Buy Now</button>
</div>
      </div>
    </div>
  )
}

export default PricingPlanFloatingDiv
