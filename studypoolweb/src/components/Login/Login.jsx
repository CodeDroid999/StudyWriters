import React,{useState} from 'react'
import './Login.css'



import {NavLink,useNavigate} from 'react-router-dom'
//images
import fb from "../../img/fbicon.png";
import google from "../../img/Googleicon.png";
import LoginImage from "../../img/LoginImage.png";

const Login=()=>{
    const history=useNavigate();
const [email,setEmail]=useState('')
const [password,setPassword]=useState('');
      

const loginUser= async (e)=>{
    //ignore bydefault reload
e.preventDefault();

const res=await fetch('/login',{
method:"POST",
headers:{
    "Content-Type":"application/json"
},body:JSON.stringify({

    email,
    password
})


});


const data=res.json();
if(res.status==400|| !data){
    window.alert("invalid credentials")
}
else{
    window.alert("LOGIN SUCCESSFULLLY")
    history("/home")
}
}
    return (
  
     
        <div className='Login'>


<div className="col1">

</div>
            <div className="col2"> <span>StudyPool</span>
       <img src={LoginImage} />
           </div>
        <div className="col3">
            
<div class="center">
<div className="loginform">
    <form method="POST">
        <span>
        <div className="welcome">
        <span>Welcome to </span><span>StudyPool</span>
        </div>
</span>
        <span className="LoginHeading">Login</span>
        <span>
        <div className="loginbuttons">
        <span><button><img src={fb} alt="fbimage" width="24px"/>SignUp With Fb</button></span>
        <span><button><img src={google} alt="googleimage" width="24px"/>SignUp With Google</button></span></div>
</span>
<span>
<div className="loginformtextfield">
        <span><input type="email"  id="email" name="email"  placeholder='Email'
         value={email} 
        onChange={(e)=> setEmail(e.target.value)}
        
        /></span>
<span><hr></hr></span>
        <span><input type="password" id="pwd" name="password"  placeholder='Password' 
          value={password} 
          onChange={(e)=> setPassword(e.target.value)}
        /></span>
        <span><hr></hr></span>
       </div>
       </span>
        <span>Don't have an Account? <NavLink to="/signin">Signin</NavLink></span>
        <span><button type="submit" name="signup" value="login" onClick={loginUser} className='loginbtn'
        
        >LOGIN</button></span>
        
    </form>
</div>
</div>

        </div>
        </div>
   
    )
}

export default Login;