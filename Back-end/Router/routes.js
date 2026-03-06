const express = require('express');
const router = express.Router();

 router.route('/h').get((req,res)=>{
    res.send('hello')
 })

module.exports = router;