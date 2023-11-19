'use strict'

const mongoose=require('mongoose')
module.exports=()=>{

    mongoose.connect('mongodb://localhost/upload-file-database',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true,
        // usseFindAndModify:true
    }).then(()=>{
        console.log('connect to mongodb');
        
    })
}