import React,{useState} from 'react'
import {singleFileUpload,multipleFileUpload} from '../data/api'
import './FileUploadScreen.css'

export const FileUploadScreen = (props) => {

const [singleFile,setSingleFile]=useState('')
const [multipleFiles,setMultipleFiles]=useState('')
 
const [title,setTitle]=useState('')
 

const SingleFileChange=(e)=>{
  setSingleFile(e.target.files[0]);

}

const MultipleFileChange=(e)=>{
  setMultipleFiles(e.target.files);
  
}

const UploadSingleFile=async()=>{
  
  const formData=new FormData();
  formData.append('file',singleFile)
  await singleFileUpload(formData)
  // console.log(singleFile);


  props.getsingle();
  
  
}


const UploadMultipleFiles=async()=>{
  
  const formData=new FormData();
  formData.append('title',title);
  
  for(let i=0;i<multipleFiles.length;i++){
    
    formData.append('files',multipleFiles[i])
    
  }

  await multipleFileUpload(formData);
 props.getMultiple();

 
}
return (
    <div>
        <div>
        {/* <h6>Select single file</h6> */}
      <input id="notesfile" type="file" onChange={(e)=>SingleFileChange(e)}></input>
      <button id="notesfilebtn" type="submit" onClick={()=>UploadSingleFile()}>Upload</button>
</div>
{/* <div>
    <h1>Title</h1>
    <input type="text" onChange={(e)=>setTitle(e.target.value)}></input>


    <h1>Select multiple file</h1>
      <input type="file" onChange={(e)=>MultipleFileChange(e)}></input>
      <button type="submit" onClick={()=>UploadMultipleFiles()}>Upload</button>
</div> */}
</div>

  );
}
