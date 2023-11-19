import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  as Router} from 'react-router-dom';
import App from './App';


 ReactDOM.render(
 <React.StrictMode>
    <Router>
 <App/>
 </Router>
 </React.StrictMode>
 
 ,document.getElementById('root'));
//  import React from 'react'
//  import './NotesFloatingDiv.css'
//  import comma from '../../img/comma.png'
//  import viewimage from '../../img/viewimage.jpg'
//  import { useState ,useEffect} from 'react'
 
 
//  function NotesFloatingDiv({image,heading,text}){
//      let initTodo;
 
//      if(localStorage.getItem("likecount")===null){
//        initTodo=[];
   
//      }
//      else{
//        initTodo=JSON.parse(localStorage.getItem("likecount"));
//      }
 
 
 
 
//      const like=()=>{
//          console.log("bbtn clicked");
 
//          setLikecount(likecount+1);
//          console.log(likecount)
 
     
//                 }
     
//      const state=useState();
//      const [likecount,setLikecount]=useState(initTodo);
 
 
//  useEffect(()=>{
   
//      localStorage.setItem("likecount",JSON.stringify(likecount))
//    } ,[likecount])
   
   
 
 
//  return (
//  <div  className='NotesFloatingDiv'>
//      <div className="card">
//          <div className="notesimage">
//          <img src={image}></img>
//          </div>
//          <div className="notestext">
//              <h3>{heading}</h3>
//              <p>{text}</p>
//          </div>
//          <div className="likes">
           
//        <button onClick={like}><img src={viewimage}></img></button>
//        <p>{likecount}</p>
//          </div>
//      </div>
//  </div>
//  )
//  }
 
 
//  export default NotesFloatingDiv;