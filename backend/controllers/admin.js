import admin from "../models/adminModel.js";

const loginHandler = async (req, res) => {
let emailid=req.body.emailid;
let password=req.body.password;

try{
    const user = await admin.findOne({emailid:emailid,password:password});
if(!user){
    return res.status(400).json({message:"Invalid Credentials"});
}
if(password!=user.password){
    return res.status(400).json({message:"Invalid Credentials"});
}

const data={
    success:true,
    message:"Login Successfull",
    loginid:user.loginid,
    id:user.id

};
res.json(data);

}

catch(error){
    res.status(500).json({message:"Something went wrong"});
}
}


const registerHandler = async (req, res) => {   
    let{loginid,password}=req.body;
    try{
let user = await admin.findOne({loginid});  //yeh h db  query

if(user){ 
    return res.status(400).json({message:"User already exists"});
    }
}
catch(error){
    res.status(500).json({message:"Something went wrong"});
}
}


export {loginHandler, registerHandler};