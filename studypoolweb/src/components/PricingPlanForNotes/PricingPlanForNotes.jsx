import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

import PricingPlanFloatingDiv from '../PricingPlanFloatingDiv/PricingPlanFloatingDiv'
import './PricingPlanForNotes.css'
const PricingPlanForNotes=()=>{
    return (
        <div className='PricingPlanForNotes'>
            <Navbar/>
            <div className="PricingPlanHeading">
                <span>Pricing Plan</span>
            </div>
<div className="pricingPlan">
<div className="planA"><PricingPlanFloatingDiv plan="A" price="2.91" priceDetail1="Lorem ipsum dolor sit am" priceDetail2="Lorem ipsum dolor " priceDetail3="Lorem ipsum"/></div>
<div className="planB"><PricingPlanFloatingDiv plan="B" price="5.67" priceDetail1="Lorem ipsum dolor sit am" priceDetail2="Lorem ipsum dolor " priceDetail3="Lorem ipsum" /></div>
<div className="planC"><PricingPlanFloatingDiv plan="C" price="12.56" priceDetail1="Lorem ipsum dolor sit am" priceDetail2="Lorem ipsum dolor " priceDetail3="Lorem ipsum" /></div>
        </div>
        <Footer/>
        </div>
    )
}
export default PricingPlanForNotes

