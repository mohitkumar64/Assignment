const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String ,
    email : {
        type : String ,
        index  :true
    },
    password: {
        type: String,
        required: false,
        select : false

        }
        ,
    role : {
        type : String ,
        default : "student"
    },
    FatherName : String ,
    MotherName : String ,
    DateOfBirth : Date ,
    ProfileImage : {
        type : String
        
    },
    College : {
        type : String ,
        default : "....",
    },

    studentInfo : {
        RollNumber: Number ,
        Course : String ,
        Branch : String ,
        Year : String ,    
    },
   TeacherInfo : {
     Subjects : [String] ,
     TimeSlot : [] ,
    

   }
   

});


module.exports = mongoose.model('User' , UserSchema);