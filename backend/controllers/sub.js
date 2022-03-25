const Sub=require("../models/sub");
var slugify = require('slugify')

exports.create=async(req,res)=>{
    try{
        const {name,_id}=req.body;
        const newSub=await new Sub({
            name,
            slug:slugify(name,{lower: false}),
            parent:_id
        }).save();
        res.json(newSub);
    }
    catch(err){
        console.log("sub creation err",err);
        res.status(400).send("sub create failed")
    }
}

exports.remove=async(req,res)=>{
    const {slug}=req.params;
    try{
        const dltedSub=await Sub.findOneAndDelete({slug});
        res.json(dltedSub);
    }
    catch(err)
    {
        console.log("sub deletion failed",err);
        res.status(400).send("sub deletion failed");
    }
}

exports.update=async(req,res)=>{
    const {slug}=req.params;
    const {name,_id}=req.body;
    try{
        const updatedSub=await Sub.findOneAndUpdate({slug},
            {name,
              slug:slugify(name,{lower: false}),
              parent:_id},
            {new:true});
        res.json(updatedSub);
    }
    catch(err)
    {
        console.log("update query on sub failed",err);
        res.status(400).send("sub deletion failed");
    }
}

exports.read=async(req,res)=>{
    const {slug}=req.params;
    try{
        const querySub=await Sub.findOne({slug});
        res.json(querySub);
    }
    catch(err)
    {
        console.log("find query on sub failed",err);
        res.status(400).send("find query on sub failed");
    }
}

exports.list=async(req,res)=>{
    try{
        const querySub=await Sub.find({}).sort({createdAt:-1}).populate('parent').exec();
        res.json(querySub);
    }
    catch(err)
    {
        console.log("list query on sub failed",err);
        res.status(400).send("list query on sub-category failed");
    }
}
