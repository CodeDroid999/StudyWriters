import React, { useEffect,useState }  from 'react'
import Footer from '../Footer/Footer'
//css
import './Notes.css'

import Navbar from '../Navbar/Navbar'
import NotesFloatingDiv from '../NotesFloatingDiv/NotesFloatingDiv';



//images
import Algebra from "../../img/Algebra.jpeg";
import Biology from "../../img/Biology.jpeg";
import chemistry from "../../img/chemistry.jpeg";
import economics from "../../img/economics.jpeg";


import Approved from "../../img/Approved.png";
import Decline from "../../img/Decline.png";
import View from "../../img/DocsView.png";
import Earning from "../../img/Earning.png";


import MyNotes from "../../img/notes.jfif";

const Notes = () => {

   
  const [userData , setUserData]=useState({name:"",  email:"",message:""});

  const userContact=async ()=>{
      try{
const res=await fetch('/getData',{
  method:"GET",
  headers:{
      
      "Content-Type":"application/json"
  },
});
const data=await res.json();
console.log(data);
// serUserData(data)
//but we want only specific info

setUserData({...userData,name:data.name,email:data.email})//we want dynamic data so [name]:value


if(!res.status==200){
  const error=new Error(res.error);
  throw error;
}
}
      catch(err){
console.log(err);

      }
  }
  useEffect(()=>{
userContact();
  },[]);



  //storing data in states

  const handleInput=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setUserData({...userData,[name]:value})
    

  }


  //send the data to backened
  const contactform=async (e)=>{
// console.log("data recieved")
e.preventDefault();// for data ignoring auto refresh

const {name,email,message}=userData;

const res=await fetch('/contact',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    // name:name,email:email,message:message 
   name,email,message 
  })
})

const data=await res.json()

//if data is not find
if(!data){
  console.log("message not recieved");
}
else{
  alert("message send")
  setUserData({...userData , message:""})
}
}
  return (
    <div>
        <Navbar/>
     <div className="Myuploads">

     <div className="myUploaddocsDetail">
     <div className="myUploadEarning">
  <p className='DocsTitle'>Docs Earning</p>
    <img src={Earning}/><span className='numOfUploadDetails'>500</span>
  </div>
  <div className="myUploaddocsApproved">
    <p className='DocsTitle'>Docs Approved</p>
    <img src={Approved}/><span className='numOfUploadDetails'>2</span>
  </div>
 
  <div className="myUploadDecline">
  <p className='DocsTitle'>Docs Declined</p>
    <img src={Decline}/><span className='numOfUploadDetails'>0</span>
  </div>
  <div className="withdrawEarningBtn">
    <button><p className='withdrawbtn'>Withdraw Earning</p></button>
  </div>
</div>


     </div>



     <div className='Notes'>
<div className="row1">
      <NotesFloatingDiv image={MyNotes} heading={"Physics Notes"}  text="50"/>
      <NotesFloatingDiv image={MyNotes} heading={"Chemistry Notes"}  text="40"/>
      <NotesFloatingDiv image={MyNotes} heading={"Programming"}  text="400"/>
     
      {/* <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
     */}
    </div>
    {/* <div className="row2">
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
    
</div>
<div className="row3">
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
      <NotesFloatingDiv image={Algebra} heading={"Algebra Notes"} text={"jfhkjfh shfskjfls hsklsjlfsdj"}/>
    
</div> */}
     </div>
     
      {/* <form method="POST">
        <input type="text" placeholder='Your name'  name="name"value={userData.name} onChange={handleInput}>

        </input>
        <br></br>
        <input type="email" placeholder='Your name'  name="email"value={userData.email} onChange={handleInput}></input>
     <br></br>
        
        <textarea cols="30" rows="10" placeholder="message" name="message"value={userData.message} onChange={handleInput}></textarea>
        <br></br>
        <button type="submit" onClick={contactform}>send message</button>
      </form> */}
      
      <Footer/>
    </div>
  )
}

export default Notes
