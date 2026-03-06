const User = require('../Models/Users');
const Appointment = require('../Models/Appointment')
const Mongoose = require('mongoose')



async function getAppointments(req,res) {
      const {role , userId} = req.user ;
     
      
      let appointment;
      if(role === 'student'){
          appointment = await Appointment.find({ studentId: userId }).populate("TeacherId", "name subjects")
          .populate("studentId" , 'name email');
        
          
      }else if(role === 'Teacher'){
          appointment = await Appointment.find({ TeacherId: userId }).populate("TeacherId", "name subjects")
          .populate("studentId" , 'name email');
        
          
      }
      
      
      else if(role === 'Admin'){
               appointment = await Appointment.find().populate("TeacherId", "name subjects")
          .populate("studentId" , 'name email');;              
      }else{
          res.status(400).json('you are not authorised')
      }
     
    res.status(200).json(appointment);
}

async function PostAppointments(req,res) {

     const data = req.body
     const body =  { ...data ,expireAt: new Date(Date.parse(data.date) + 2 * 24 * 60 * 60 * 1000)};
     console.log("body"  ,body);
     
     
      try {
          const appointment = await Appointment.create(body);
          console.log("new Appointment" ,appointment);
          
       res.status(200).json({
            status : true , appointment
       })   
     }  catch (error) {

               // Mongoose validation error
               if (error.name === "ValidationError") {
                    const errors = Object.values(error.errors).map(err => err.message);

                    return res.status(400).json({
                    success: false,
                    errors
                    });
               }

               // fallback
               res.status(500).json({
                    success: false,
                    message: "Something went wrong"
               });
               }
               };
         
    

async function DeleteAppointment(req,res) {
    
    
}
async function updateAppointment(req,res) {
     try {
           const {_id , Status} = req.body;
           console.log("status" + Status);
           
          const appointment = await Appointment.findByIdAndUpdate(_id , {
              Status: Status
          } , {
          new : true , runValidators : true
     })
     console.log(appointment);
     
     if(appointment){
          res.status(200).json({output : "sucess"})
     }  
     } catch (error) {
          res.status(500).json({error : "error"})
         console.log("update appointment error --" , error);
          
     }
    
    
}

async function getTeacher(req,res) {
      const Teacher = (await User.find({role : "Teacher"}));
      

      const data = Teacher.map(({name , _id , TeacherInfo})=>{
           return( { "name" : name , "_id" : _id , "subjects" : TeacherInfo.Subjects , "TimeSlot"  :TeacherInfo.TimeSlot })
      })
     
      res.status(200).json(data);
      
    
}

async function UpdateTimeSlots(req, res) {
  try {
    // Only teachers should reach here
    if (req.user.role !== "Teacher") {
      return res.status(403).json({ message: "Only teachers can update slots" });
    }

    const { TimeSlots } = req.body;
    console.log(TimeSlots);
    

    if (!Array.isArray(TimeSlots)) {
      console.log("Time slot is not array");
      
      return res.status(400).json({ message: "TimeSlots must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: {
          "TeacherInfo.TimeSlot": TimeSlots
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    console.log(user);
    
    return res.status(200).json({
      TimeSlots: user.TeacherInfo.TimeSlot
    });

  } catch (error) {
    console.error("Error updating timeslots:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
async function getTimeSlot(req, res) {
  try {
    // Role guard (important)
    if (req.user.role !== "Teacher") {
      console.log("acess denied somone else then Teacher try to acess it ");
      
      return res.status(403).json({ message: "Access denied" });
    }

    const teacher = await User.findById(
      req.user.userId
    );
    console.log(teacher);
    

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Always return array
    const slots = teacher.TeacherInfo?.TimeSlot || [];

    res.status(200).json(slots);

  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ message: "Server error" });
  }
}



module.exports = {getAppointments , PostAppointments , DeleteAppointment , getTeacher , updateAppointment , UpdateTimeSlots , getTimeSlot}