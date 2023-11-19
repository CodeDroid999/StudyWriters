const jwt = require("jsonwebtoken");
const User= require('../models/userSchema');
const cookieParser = require('cookie-parser')


const authenticate=async (req,res,next)=>{
    try{
const token=req.cookies.jwtoken;
const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

//user token match 
const rootUser= await User.findOne({ _id:verifyToken._id,
     "tokens.token" : token})//in db ,we get
if(!rootUser){

    throw new Error('User not found')
}
req.token=token;
//rootUser has all the user data
req.rootUser=rootUser;
//if only user id find
req.userID=rootUser._id;
next(); 

    }
    catch(err){
        res.status(401).send("Unauthorized:No token pprovided")
        console.log(err)
    }


}

module.exports=authenticate;