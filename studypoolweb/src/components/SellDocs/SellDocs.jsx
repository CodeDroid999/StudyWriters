import React , { useEffect,useState } from 'react'
//images
import main from "../../img/main.jpeg";
import earn from "../../img/earn.png";
import verify from "../../img/verify.png";
import upload from "../../img/upload.png";
import Approved from "../../img/Approved.png";
import Decline from "../../img/Decline.png";
import View from "../../img/DocsView.png";

//css
import './SellDocs.css'


//navbar componenet
import Navbar from '../Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
//picture

import WhatToUpload from '../WhatToUpload/WhatToUpload';


//notes uploading
import { FileUploadScreen } from '../../screens/FileUploadScreen';

import { getMultipleFiles } from '../../data/api';
import { getSingleFiles } from '../../data/api';
const SellDocs=()=>{

    const history=useNavigate() 
    const [userData , setUserData]=useState({});

    const callAboutPage=async ()=>{
        try{
const res=await fetch('/Account',{
    method:"GET",
    headers:{
        Accept:"appllication/json",
        "Content-Type":"application/json"
    },
    //we are sending token here
    credentials:"include"

});
const data=await res.json();
console.log(data);
setUserData(data)



if(!res.status==200){
    const error=new Error(res.error);
    throw error;
}
}
        catch(err){
console.log(err);
history("/login");
        }
    }
    useEffect(()=>{
callAboutPage();
    },[]);



    //account  notes
     //storing data in states

    const handleInputAccount=(e)=>{
     const name=e.target.name;
        const value=e.target.value;
    
        setUserData({...userData,[name]:value})
        
    
      }
    


    const accountform=async (e)=>{
    e.preventDefault();

    const {noteslink}=userData


    const res =await fetch('/Account',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            noteslink
        })
    })

    const data=await res.json()
    //if data is not find
    if(!data){
        console.log("notes link not recieved")
    }
    else{
        alert("notes link recived")
        setUserData({...userData,noteslink})
    }
}




//notes uploading
const [singleFile,setSingleFile]=useState([])
const [multipleFiles,setMultipleFiles]=useState([])


const getSingleFileslist=async ()=>{
  try{
const fileslist=await getSingleFiles();
setSingleFile(fileslist)
  }
  catch(err){
    console.log(err);
    
  }
}



const getMultipleFileslist=async ()=>{
  try{
const filesList=await getMultipleFiles();
setMultipleFiles(filesList)
  console.log(multipleFiles)
}
  catch(err){
console.log(err);
  }
}
useEffect(()=>{
  getSingleFileslist();
  getMultipleFileslist()
},[]);
    return (
<div className="Selldocs">
    <Navbar/>
<div className="mainimage">



    <img  src={main} />
</div>
<WhatToUpload/>
<form method="GET">
<div className="UploadDocument">
    <h4 id="uploadName"> Hello {userData.name} !!</h4>
{/* <span>Before Uploading Document please refer to Do's and Dont's</span> */}
</div>
{/* <img src={userData.name=="ki"?upload:earn}/> */}

    {/* <h1>{userData.email}</h1>
    <h2>{userData.name}</h2> */}


   
    {/* <button type="submit">Edit profile</button> */}


 </form>



 {/* <form method="POST">

 <input type="text" placeholder="notes link" name="noteslink" value={userData.accountmessage} onChange={handleInputAccount}></input>
 <br></br>
 <button type="submit" onClick={accountform}>send message</button>
 </form> */}






{/* <Navbar/> */}



<div className='Uploadcontainer'>
  <h1>Upload your document here</h1>
  <span>Before Uploading Document please refer to Do's and Dont's</span>
  <FileUploadScreen getsingle={()=>getSingleFileslist()}></FileUploadScreen>
<div className="docsDetail">
  <div className="docsApproved">
    <p>Docs Approved</p>
    <img src={Approved}/><span>2</span>
  </div>
  <div className="DocsDeclined">
  <p>Docs Decline</p>
    <img src={Decline}/><span>0</span>
  </div>
  <div className="Pending">
  <p>Docs Pending</p>
    <img src={View}/><span>8</span>
  </div>
</div>
</div>

 {/* //for showing all files  */}
<div className='YoursUpload'>

<div className='UploadedFiles'>
<h2>Your's Uploaded files</h2>
{singleFile.map((file,index)=>
<div>
{/* 
  <img src={`http://localhost:8000/${file.filePath}`} height="200" alt={`${file.fileName}`}></img> */}
  <h5>{`${file.fileName}`}</h5>
  <hr></hr>

</div>
)}
</div>

</div>
</div>
    )
}
export default SellDocs;