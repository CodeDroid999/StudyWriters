import React from 'react'
import './WhatToUpload.css'
//img
import upload from "../../img/upload.png";
import earn from "../../img/earn.png";
import verify from "../../img/verify.png";


const WhatToUpload=()=>{
    return(
<div className="WhatToUpload">
<div className="uploadheading">
            <span>What to Upload?</span>
            </div>
<div className="uploaddetail">
    <div className="upload1">
        <img src={upload} alt="upload image"/>
        <h4>Old Assignment</h4>
        <p>Post homeworks projects<br/>
             report presnetation,papers<br/>
              etc that students can review as<br/>
             refrence</p>
             
    </div>
    <div className="upload2">  <img src={earn} alt="upload image" />
        <h4>Class Notes</h4>
        <p>Detail class and lecture notes<br/>
             to help students learn and<br/>
             understand academic concepts</p></div>
    <div className="upload3">  <img src={verify} alt="upload image"/>
        <h4>Multi language content</h4>
        <p>we accept content in all  <br/>
             views your uploaded <br/>
            languages from all countries.</p></div>
</div>

</div>
    )
}

export default WhatToUpload;