const admin =require("../firebase");
const User =require("../models/user");

exports.authCheck=(req,res,next)=>{
    // console.log(req.headers);
    admin.auth().verifyIdToken(req.headers.authtoken)
    .then((fbUser)=>{
        // console.log("fireabse User",fbUser);
        req.user=fbUser;
        next();
    })
    .catch((err)=>{
        console.log("Invalid or expired token");
        res.status(401).json({
            err:"Invalid or expired token",
        })
    })
}

exports.adminCheck=async(req,res,next)=>{
    const {email}=req.user;
    const user=await User.findOne({email}).exec();
    if(user.role!=="admin")
    {
        res.status(403).json({
            err:"admin resource, Access denied",
        })
    }
    else{
        next();
    }
}