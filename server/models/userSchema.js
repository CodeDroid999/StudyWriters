
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
              name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true   
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
                    name:{
                    type:String,
                    required:true
                    },
                    email:{
                    type:String,
                    required:true
                    },
                    message:{
                    type:String,
                  required:true
                    }
    }
],
noteslinks:[{
    noteslink:{
        type:String,
        required:true
    }
}],
    tokens:[
        {
token:{
    type:String,
    required:true
}
        }
    ]
})


//hashing the password

//whenever save method called and password change so this method call
userSchema.pre('save',async function(next){
    console.log('helo');
    
    //when password change
    if(this.isModified('password')){
this.password=await bcrypt.hash(this.password,12)
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken=async function(){
    try{
        //it will generate an id
let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);

    
this.tokens=this.tokens.concat({token:token})//after concat you have to save it using save()

await this.save();
return token;
}
    catch(err){
console.log(err);

    }
}


//stored the message
//userSchema is an instance of Mongodb schema
userSchema.methods.addMessage=async function(name,email,message){
try{
this.messages=this.messages.concat({name,email,message})//after concat you have to save it using save()ju
await this.save();
return this.message;
}
catch(err){
  console.log(err);
  
}
}





//stored the noteslink
//userSchema is an instance of Mongodb schema
userSchema.methods.addNotesLink=async function(noteslink){
try{
this.noteslinks=this.noteslinks.concat({noteslink})//after concat you have to save it using save()ju
await this.save();
return this.noteslink;
}
catch(err){
  console.log(err);
  
}
}
//collection creation
const User=mongoose.model('USER',userSchema)
module.exports=User;