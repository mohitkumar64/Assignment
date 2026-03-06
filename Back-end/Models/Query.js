const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true
    },
    Reason : String ,
    Status : String , 
    expireAt: {
    type: Date,
   
    index: { expireAfterSeconds: 0 },
    createdAt: {
      type : Date ,
      required : true

    }
  }
   
} ,  {Timestamp : true})



module.exports = mongoose.model('QueryModel' , QuerySchema );