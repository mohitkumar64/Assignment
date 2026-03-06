const mongoose = require('mongoose')

const ConnecDB = (key)=>{
   
   return mongoose.connect(key);
}

module.exports = ConnecDB