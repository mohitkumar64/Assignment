function admin(req,res,next){

   try {    
    const {role} = req.user ;

    if(role === 'Admin'){

        next()
    }else{
        res.status(404).json({message : "unauth"})
        console.log("somone else other then admin try to hit it")
    }

     
   } catch (error) {
        console.log({error : error})
        res.send(400).json({error : "error check terminal"})
   }


}
module.exports = admin