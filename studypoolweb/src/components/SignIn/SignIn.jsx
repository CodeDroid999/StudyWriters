import React,{useState} from 'react'
import './SignIn.css'

//fetch data from api
import axios from 'axios'


import {NavLink,useNavigate} from 'react-router-dom'

//images
import fb from "../../img/fbicon.png";
import google from "../../img/Googleicon.png";
import LoginImage from "../../img/LoginImage.png";
const SignIn=()=>{

        const history=useNavigate()
      const [user,setUser]=useState({
        name:"",email:"",password:""
      })


      let name,value;
      const handleInputs=(e)=>{
console.log(e);
name=e.target.name;
value=e.target.value;

setUser({...user,[name]:value});

      }


      //Coonect react with backened
      const PostData=async (e)=>{
e.preventDefault();

const {name,email,password}=user;//now no need to use user.name ,just use name


// if(regex.test(str)){
//         validUser=true;
// }

if(user.name==""||user.password==""||user.email=="" ){
        alert('Fill the form')
     }
     let regex=/^[a-zA-Z]([0-9a-zA-Z]){2,10}$/;
let str=user.name;

     if(regex.test(str)==false){
        alert('enter correct name')
     }
let regexemail=/^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
let stremail=user.email;
if(regexemail.test(stremail)==false){
        alert('enter correct email')
     }


     

   if(regex.test(str)==true&&regexemail.test(stremail)){
const res= await fetch("/signin",{
        method:"POST",
        headers:{
"Content-Type":"application/json"
        },
        body:JSON.stringify({
        //    name:name,email:email,password:password
              name,email,password        
        })

});
      
const data=await res.json();

if(data.status==422 || !data){
window.alert("invalid registration")
console.log("invalid registration");
}
else{
        window.alert(" registration sucessfully")
        console.log(" registration sucessfully");    

        history("/login")
}
}



//end of else condition
      }

return (
  
     
        <div className='SignUp'>
     
<div className="col1">
<img src={LoginImage} />
</div>
            <div className="col2"> <span>StudyPool</span>
          
           </div>
        <div className="col3">
            
<div class="center">
<div className="signupform">
    <form method="POST">
        <span>
        <div className="welcome">
        <span>Welcome to </span><span>StudyPool</span>
        </div>
</span>
        <span>SIGN UP</span>
        <span>
        <div className="signupbuttons">
        <span><button><img src={fb} alt="fbimage" width="24px"/>SignUp With Fb</button></span>
        <span><button><img src={google} alt="googleimage" width="24px"/>SignUp With Google</button></span></div>
</span>
<span>
<div className="signuptextfield">
    
<span><input type="text"  id="name" name="name" placeholder='Full Name'  value={user.name} onChange={handleInputs}/>

</span>
<span><hr></hr></span>
        <span><input type="email"  id="email"  name="email" placeholder='Email Address'  value={user.email} onChange={handleInputs} />
      
        </span>
<span><hr></hr></span>
        <span><input type="password" id="pwd"   name="password" placeholder='Password'  value={user.password} onChange={handleInputs}/>
     
        </span>
        <span><hr></hr></span>
       </div>
       </span>
        <span>Don't have an Account?<NavLink  to="/login">Login</NavLink></span>
        {/* //when signup button click so register mtethod call */}
        <span><button type="submit" className="Signinbtn" value="register" onClick={PostData}> SIGN UP</button></span>
        
    </form>
</div>
</div>

        </div>
        </div>
   
    )
}

export default SignIn;