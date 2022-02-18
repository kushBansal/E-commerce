const User=require("../models/user");

exports.deleteUpdateUser=(req,res)=>{
    const {name,email,picture}=req.user;
    User.findOneAndUpdate({email},
        {name,picture},
        {new:true})
    .then(async(user)=>{
        if(user)
        {
            console.log("user Updated",user);
            res.json(user);
        }else{
            const newUser=await new User({
                email,
                name,
                picture,
            }).save();
            console.log("user Created",newUser);
            res.json(newUser);
        }
        
    })
    .catch((err)=>{
        console.log("user creation/updation failed",err);
        res.json(err);
    })
}
exports.currentUser=(req,res)=>{
    const {email}=req.user;
    User.findOne({email})
    .then(async(user)=>{
        if(user)
        {
            res.json(user);
        }else{
            console.log("user not found in database");
            throw new Error("user not found in database");
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}