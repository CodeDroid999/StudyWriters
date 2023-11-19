
const jwt=require('jsonwebtoken')
const express = require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const cookieParser = require('cookie-parser')
router.use(cookieParser())
const authenticate = require('../middleware/authenticate');


require('../db/conn')
const User= require('../models/userSchema');

router.get('/',(req,res)=>{
    res.send(`hello from router.js`)
})


// router.post('/signin',(req,res)=>{
//     const {name,email,password }=req.body //now we can use only name ,email instead of req.body.name

 
// if(!name || !email || !password ){
//     return res.status(422).json({error:"fill all field"})
// }


// User.findOne({ email:email })
// .then((userExist)=>{
//     if(userExist){
//         return res.status(422).json({error:"email alredy exist"})
//     }
//         const user=new User({name,email,password});

// user.save().then(()=>{
//     res.status(201).json({message:"user register successfully"});
// }).catch((err)=> res.status(500).json({error:"failed register"}));        
    
// }).catch(err=>{
//     console.log(err);});
// });



router.post('/signin',async(req,res)=>{
    const {name,email,password }=req.body //now we can use only name ,email instead of req.body.name

 
if(!name || !email || !password ){
    return res.status(422).json({error:"fill all field"})
}
try{


const userExist=await User.findOne({ email:email })
if(userExist){
    return res.status(422).json({error:"email alredy exist"})
}
else{


const user=new User({name,email,password});
await user.save();
// console.log(`${user} user Registered successfully`)
// console.log(userRegistration);    


    res.status(201).json({message:"user register successfully"});
}

}

catch(err){
    console.log(err)
}

});






//login route
router.post('/login',async(req,res)=>{
// console.log(req.body);
// res.json({message:"awaesome"})
    
try{
let token;

const {email,password}=req.body;
if(!email || !password){
    return res.status(400).json({error:"plz filled the data"})

}
//findOne ==> if email match so it will guve all info
const userLogin=await User.findOne({email:email})


if(userLogin){

    const isMatch=await bcrypt.compare(password,userLogin.password)
  //TOKEN
  token=await userLogin.generateAuthToken();
  console.log(token);

  //store JWT token in cookie for authentication
res.cookie("jwtoken",token,{
   //time for expire the token
    expires:new Date(Date.now()+25892000000),
    httpOnly:true
});
  
    if(!isMatch){
        res.status(400).json({error:"invalid credentials pass"})
   
    }
    else{
    res.status(201).json({message:"user signin successfully"})
    
    }
}
else{
res.status(400).json({error:"Invalid credential "})
}}
catch(err){
    console.log(err);
    
}
})



//about us page
router.get('/Account',authenticate ,(req,res)=>{
    console.log('about us page');
    
    res.send(req.rootUser)
})


//get user data for contact us page & homepage
router.get('/getData',authenticate ,(req,res)=>{
    console.log('contact page');
    
    res.send(req.rootUser)
})



//contact us page
//contactus page converted into notes 
router.post("/contact",authenticate,async(req,res)=>{
   try{
    //object destructing
const {name,email,message}=req.body;
if(!name|| !email ||!message){
    console.log('error in contact form');
    return res.json({error:"plz filled the contact form"})
    
}  
//to check is user present in db
const userContact=await User.findOne({_id:req.userID});
if(userContact){
    const userMessage=await userContact.addMessage(name,email,message)
    //now will message in userSchema

    await userContact.save();
    res.status(201).json({message:"user contact successfully"})
}
}
   catch(err){
console.log(err);

   } 
})


//notes link from Account Page
router.post("/Account",authenticate,async(req,res)=>{
    try{
     //object destructing
 const {noteslink}=req.body;
 if(!noteslink){
     console.log('error in account(notes link) form');
     return res.json({error:"plz filled the account(notes link) form"})
     
 }  
 //to check is user present in db
 const userAccount=await User.findOne({_id:req.userID});
 if(userAccount){
     const userNotesLink=await userAccount.addNotesLink(noteslink)
     //now will message in userSchema
 
     await userAccount.save();
     res.status(201).json({message:"user Account successfully"})
 }
 }
    catch(err){
 console.log(err);
 
    } 
 })

module.exports=router;

//mine=video
//login=sigin
//sigin=register