const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const User  = require('../Models/Users')



router.get('/me', auth ,async (req , res)=>{
    try {
    const user = await User.findById(req.user.userId);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({error : "error "})
    }

    } catch (error) {
        console.log(" error inside me " , error)
    }
   
});



module.exports = router;

