import axios from 'axios'
const apiUrl='http://localhost:8000/api/';



//single files upload
export const singleFileUpload=async (data)=>{
    try{
await axios.post(apiUrl+'singleFile',data)
    }
    catch(err){
        throw err;
    }
}
//get single file

export const getSingleFiles=async ()=>{
    try{
const {data}=await axios.get(apiUrl+'getSingleFiles');
return data;    

}
    catch(err){
throw err
    }
}


//multiple files upload

export const multipleFileUpload=async (data)=>{
    try{
await axios.post(apiUrl+'multipleFiles',data);
    }
    catch(err){
        throw err;
    }
}


export const getMultipleFiles=async () =>{
    try{
const data=await axios.get(apiUrl+'getMultipleFiles');
return data;
    }
    catch(err){
     throw err;   
    }
}