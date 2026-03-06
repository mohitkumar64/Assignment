const mongoose = require('mongoose');

const oAuthAccountSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true
    },
    provider :{
        type:String ,
        enum:["google"],
        required : true
    },
    providerUserId:{
        type : String ,
        required : true ,
       
    }


})

oAuthAccountSchema.index(
  { provider: 1, providerUserId: 1 },
  { unique: true }
);

module.exports = mongoose.model('OAuthAccount' , oAuthAccountSchema );