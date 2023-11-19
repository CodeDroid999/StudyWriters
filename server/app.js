const dotenv=require("dotenv")
const mongoose=require('mongoose')
const express=require("express")

const app=express();

dotenv.config({path:'./config.env'})

require('./db/conn')
app.use(express.json())
app.use(require('./router/auth'));
//database connection
// const DB=process.env.DATABASE
const PORT=process.env.PORT;




// app.get("/about",(req,res)=>{
//     res.send("shflksj")
// })



// app.get("/contact",(req,res)=>{
//     // res.cookie("test","kasha")
//     res.send("contact")
// })

//Middleware
// const middleware=(req,res,next)=>{
//     console.log('about page');
//     next();}




// app.get("/hello",middleware,(req,res)=>{
//    console.log('helloo');
//     res.send("shflksj")
// })


app.get("/",(req,res)=>{
    res.send("shflksj")
})




app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
    
})