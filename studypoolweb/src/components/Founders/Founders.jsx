import React from "react";
import './Founders.css'
import FounderFloatingDiv from "../FounderFloatingDiv/FounderFloatingDiv";
import kpic from '../../img/kp.png'
import hpic from '../../img/hpic.jpeg'
import github from '../../img/github.png'
import linkedin from '../../img/linkedin.png'



const Founders=()=>{
    return (
        <div className="Founder">
        <div className="FoundersHeading">
            <h4>Our Founders</h4>
        </div>
    
         <div className="Founders">
<div className="first">
<FounderFloatingDiv image={kpic} width="7px" height="7px" name="Kashaf Abdullah" logo1={linkedin} logo2={github} text1="When we have clearly defined our goals,"  text2="hear what they have to say. Put active listening"  text3="first; people value it when their opinions are heard" linkedin="https://www.linkedin.com/in/kashaf-abdullah-482246207/" github="https://github.com/Kashaf-Abdullah"/>
</div>
<div className="second">
<FounderFloatingDiv image={hpic} width="7px" height="7px" name="Hira Amir" logo1={linkedin} logo2={github} text1="A good leader can both direct their team and"  text2="they can become more efficient, productive and"  text3="motivated to exceed the expectations." linkedin="https://www.linkedin.com/in/hiraamirbux/" github="https://github.com/Hira-Amir"/>
</div>
 </div>
 </div>
    )
}
export default Founders;