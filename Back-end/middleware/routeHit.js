

function routehit(req ,res,next){

    console.log("route hit : " , req.path);
    next();
}

module.exports = routehit