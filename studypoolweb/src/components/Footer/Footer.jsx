import React from 'react'
import './Footer.css'
//emailjs 
import emailjs from '@emailjs/browser';

import { useRef } from "react"
const  Footer =()=>{
    const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_of9j5wc', 'template_r5ae86h', form.current, 'FhsCpRN8eOyuuNhjd')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
};
    return (
<div className="Footer" id='Footer'>
    <h1>StudyPool</h1>
<div className="FooterDetails">
    <div className="FooterSubjects">
<h3>Subjects</h3>
        <div>Maths</div>
        <div>Algebraa</div>
         <div>Accounting</div>
          <div>Design</div>
           <div>Maths</div>
            <div>Biology</div> 
            <div>Bussiness</div> 
            <div>Finance</div>
            <div>Technology</div>
    </div>
    <div className="Pages">
    <h3>Pages</h3>
        <div>How it works</div>
        <div>About Us</div>
         <div>Founders</div>
          <div>Features Subjects</div>

    </div>
    <div className="ContactUs">
        <h3>Contact Us</h3>
        <span>Wanna talk , send us an email, we will get back to you!</span>
        <span>
            <form ref={form} on onSubmit={sendEmail}>
            <textarea  id="studypooltextbox"name="user_email" rows="4" cols="50"/>
<br></br>
<button type="sumbit" value="Send">send</button>
            </form>
            </span>
      
    </div>
</div>

</div>
    )
}
export default Footer;