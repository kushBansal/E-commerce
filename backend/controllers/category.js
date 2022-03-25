const Category=require("../models/category");
const Sub=require("../models/sub");
var slugify = require('slugify')

exports.create=async(req,res)=>{
    try{
        const {name}=req.body;
        const newCategory=await new Category({
            name,
            slug:slugify(name,{lower: false}),
        }).save();
        res.json(newCategory);
    }
    catch(err){
        console.log("category creation err",err);
        res.status(400).send("category create failed")
    }
}

exports.remove=async(req,res)=>{
    const {slug}=req.params;
    try{
        const dltedCategory=await Category.findOneAndDelete({slug});
        const dltedSubCategory=await Sub.deleteMany({parent:dltedCategory});
        res.json({...dltedCategory,...dltedSubCategory});
    }
    catch(err)
    {
        console.log("category deletion failed",err);
        res.status(400).send("category deletion failed");
    }
}

exports.update=async(req,res)=>{
    const {slug}=req.params;
    const {name}=req.body;
    try{
        const updatedCategory=await Category.findOneAndUpdate({slug},
            {name,slug:slugify(name)},
            {new:true});
        res.json(updatedCategory);
    }
    catch(err)
    {
        console.log("update query on category failed",err);
        res.status(400).send("category deletion failed");
    }
}

exports.read=async(req,res)=>{
    const {slug}=req.params;
    try{
        const queryCategory=await Category.findOne({slug});
        res.json(queryCategory);
    }
    catch(err)
    {
        console.log("find query on category failed",err);
        res.status(400).send("find query on category failed");
    }
}

exports.list=async(req,res)=>{
    try{
        const queryCategory=await Category.find({}).sort({createdAt:-1}).exec();
        res.json(queryCategory);
    }
    catch(err)
    {
        console.log("list query on category failed",err);
        res.status(400).send("list query on category failed");
    }
}
