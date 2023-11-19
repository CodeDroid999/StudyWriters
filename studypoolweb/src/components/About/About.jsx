import React from 'react';
//About css file import
import './About.css';


//image import
import WhoWeAre from "../../img/who are we.jpeg";

const About=()=>{

    

    return (
        <div className="About" id='About'>
            <div className="Aboutheading">
                <h1>Who We Are!</h1></div>

                
                <div className="AboutDetail">
                    <div className="AboutLeft">
                        <img src={WhoWeAre} alt="image here"/>
                    </div>
                    <div className="AboutRight">
  <span>Our goal is to equip students with<br/>
the knowledge and skills they need<br/>
to acquire, shov articulate, and<br/>
respect themselves.</span>
  <p><span>StudyPool </span>
  <span>is an educational website<br/>
that was primarily made for people<br/>
who are interested in education and<br/>
studies. It is a central location for all<br/>
study materials, and users can upload<br/>
their own study materials in exchange<br/>
for money. In this way StudyPool aids<br/>
in students acquisition of knowledge</span></p>

                    </div>
                
            </div>
        </div>
    )
}
export default About;