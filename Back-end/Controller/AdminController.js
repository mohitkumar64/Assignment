const User = require('../Models/Users');
const Appointment = require('../Models/Appointment');
const Mongoose = require('mongoose');
const QueryModel = require('../Models/Query')


async function getallusers(req ,res) {
    try {
        const users = await User.find();
        if(res){
            res.status(200).json(users)
        }

    } catch (error) {
        res.status(400).json({error : "something is wrong"})
        console.log({admincontroller : error});
        
    }

}

async function UpdateUser(req , res) {
   
    
    
   const { role , subject} = req.body.value

  
   const data = {
    role ,  TeacherInfo : {
        "Subjects" : subject
    }
   }
    
    
    

    const user = await User.findByIdAndUpdate(req.body.id , data  , {
        new : true ,
        runValidators : true
    }); 
    console.log("user after admin update : " , user);
    
   
   if(!user){
    res.status(404);
   } 
   res.status(200).json(user);
    
} 
async function getuserdata(req,res) {
    try {
    const {_id} = req.body;
    const user = await User.findById(_id);
    console.log(  "user data",user);

    const data = {
        name : user.name ,
        email : user.email ,
        role : user.role ,
        subject : user.TeacherInfo.Subjects || [] ,
        image : user.ProfileImage || ""
    }
    
    res.status(200).json(data)
    } catch (error) {
        res.status(400);
        console.log(  "error from admin controller" , error);
        
    }
    
}

async function getQuery(req , res) {
    try {
        
        const query = await QueryModel.find();
            res.status(200).json(query);
        


    } catch (error) {
        res.status(404).json({error : "not find"})   
        console.log(error);
        
    }
    

    
}

async function delQuery(req , res) {
    try {
       
        
    const {id} = req.params;

    
     const del =  await QueryModel.findByIdAndDelete(id);
   
     if (!del) {
      return res.status(404).json({ error: "Query not found" });
    }
     res.status(200).json({
        message : true
     })
        


    } catch (error) {
        res.status(404).json({error : "not find"})   
        console.log(error);
        
    }
    
    
}


module.exports = {getallusers , UpdateUser , getuserdata , getQuery , delQuery}