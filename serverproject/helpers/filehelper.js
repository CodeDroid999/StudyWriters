'use strict'
const multer=require('multer')
const path=require('path')


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g,'-')+'-'+file.originalname)
    }
});
//filefilter for specific file whcih we want to store
const filefilter=(req,file,cb)=>{
    //ppt,pdf,doc

    //add docx,pptx
    if(file.mimetype==='appplication/vnd.ms-powerpoint'||file.mimetype==='application/pdf'||file.mimetype==='application/msword'||file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='text/html'||file.mimetype==='image/jfif'||file.mimetype==='image/jpeg'){
        cb(null,true)//means callback return true
    }
    else{
        cb(null,false)
    }
}
const upload =multer({storage:storage,fileFilter:filefilter});
module.exports={upload}