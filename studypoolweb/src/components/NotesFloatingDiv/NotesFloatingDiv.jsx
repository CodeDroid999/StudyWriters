import React from 'react'
import './NotesFloatingDiv.css'
import comma from '../../img/comma.png'
import viewimage from '../../img/viewimage.jpg'
import { useState ,useEffect} from 'react'
import View from "../../img/DocsView.png";

function NotesFloatingDiv({image,heading,text}){
    let initTodo;

    if(localStorage.getItem("likecount")===null){
      initTodo=[];
  
    }
    else{
      initTodo=JSON.parse(localStorage.getItem("likecount"));
    }




    const like=()=>{
        console.log("bbtn clicked");

        setLikecount(likecount+1);
        console.log(likecount)

    
               }
    //if its not first remove 0 then write 0 instead of init Todo then again change ,localstorage.clear()
    const state=useState(0);
    const [likecount,setLikecount]=useState(initTodo);


useEffect(()=>{
  
    localStorage.setItem("likecount",JSON.stringify(likecount))
  } ,[likecount])
  
  


return (
<div  className='NotesFloatingDiv'>
    <div className="card">
        <div className="notesimage">
        <img src={image}></img>
        </div>
        <div className="notestext">
            <h3>{heading}</h3>
          
        </div>
        <div className="likes">
          
      <img src={View}></img><span className='numofviews'>{text}</span>
        </div>
    </div>
</div>
)
}


export default NotesFloatingDiv;