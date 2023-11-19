'use strict'
const SingleFile =require('../models/singlefile') 

const MultipleFile =require('../models/multipleFiles') 


const singleFileUpload=async(req,res,next)=>{
    try{
// const file=req.file;
const file=new SingleFile({
    fileName:req.file.originalname,
    filePath:req.file.path,
    fileType:req.file.mimetype,
    //define FilesizeFormat below
    fileSize:fileSizeFormatter(req.file.size,3)//0.00
    // fileSize:fileSizeFormatter(req.file.size,3)//0.000
    
});
//save file to databse
await file.save();
console.log(file);

res.status(200).send('file uploaded successfully')

}
    catch(error){
        res.status(400).send(error.message)
    }
}




//multiple file upload
//next middleware use
const multipleFileUpload=async(req,res,next)=>{
    try{
        let filesArray=[];
        req.files.forEach(element=>{
            const file={
fileName:element.originalname,
filePath:element.path,
fileType:element.mimetype,
//define FilesizeFormat below
fileSize:fileSizeFormatter(element.size,2)

            }
            filesArray.push(file)
        })
        const multipleFiles=new MultipleFile({
            title:req.body.title,
            files:filesArray
        })
        await multipleFiles.save();
res.status(201).send('File uploaded successfully')
    }
    catch(err){
        res.send(400).send(err.message)

    }
}




//get all single file

const getallSingleFiles=async(req,res,next)=>{
    try{
const files=await SingleFile.find()
res.status(200).send(files)
    }
    catch(err){
        res.status(400).send(err.message)
    }
}


//get all multiple file

const getallMultipleFiles=async(req,res,next)=>{
    try{
const files=await MultipleFile.find()
res.status(200).send(files)
    }
    catch(err){
        res.status(400).send(err.message)
    }
}


const fileSizeFormatter=(bytes,decimal)=>{
    if(bytes==0){
        return '0 byte'
    }
    else{
        const dm=decimal||2;
        const sizes=['Bytes','KB','MB','GB','TB','PB','EB','YB','ZB']
const index=Math.floor(Math.log(bytes)/Math.log(1000));
return parseFloat((bytes/Math.pow(1000,index)).toFixed(dm))+'-'+sizes[index]
    }
}


module.exports={
    singleFileUpload,
    multipleFileUpload
    ,getallSingleFiles,
    getallMultipleFiles
}