const jwt = require('jsonwebtoken');
const Reader = require('../models/reader')

module.exports.verifyUser = function(req, res, next){
try{
const token = req.headers.authorization.split(" ")[1];
const data = jwt.verify(token, 'anysecretkey');  
Reader.findOne({_id:data.userId})
.then(function(userData){
    res.user = userData;
    next();
})
.catch(function(ee){
    res.status(401).json({error: ee});
})
}

catch(e){
    res.status(401).json({error : e})
}
}

module.exports.verifyAdmin = function(req,res,next){
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized!"})
    }
    else if(req.user111!=="Admin"){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    next();
}