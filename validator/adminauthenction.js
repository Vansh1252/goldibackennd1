const jwt =require('jsonwebtoken');
const respondmanger =require('../utilities/responseManager');

const ensureAuthenticates =(req,res,next) =>{
    const auth =req.headers['authorization'];
    if(!auth){
        return respondmanger.badrequest(res,"Unauthorized , Jwt token is require");
    }
    try {
        const decoded =jwt.verify(auth,process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
     return respondmanger.badrequest(res,"Unauthorized , JWT token wrong or expired");   
    }
}

module.exports =ensureAuthenticates;