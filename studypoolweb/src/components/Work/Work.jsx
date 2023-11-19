import React from "react";
import './Work.css';

//pictures
import upload from "../../img/upload.png";
import earn from "../../img/earn.png";
import verify from "../../img/verify.png";

const Work =()=>{



    return (
        <div className="Work" id='Work'>
<div className="workDiv">
            <div className="wheading">
            <span>How </span><span>StudyPool</span><span>Works</span>
            </div>
<div className="workdetail">
    <div className="box1">
        <img src={upload} alt="upload image"/>
        <h4>Post Your Study Material</h4>
        <p>You can post your study<br/>
             stuff related to any<br/>
             subject.</p>
    </div>
    <div className="box2">  <img src={earn} alt="upload image" />
        <h4>Wait till your docs get verified</h4>
        <p>After uploading your<br/>
             docs,wait from sometimes <br/>
             till our system verifies.<br/>your docs</p></div>
    <div className="box3">  <img src={verify} alt="upload image"/>
        <h4>Earn money everytime <br/>someone views your docs</h4>
        <p>Every time someone<br/>
             views your uploaded <br/>
            study material you will be<br/>earning money.</p></div>
</div>


</div>
        </div>
    )
}
export default Work;