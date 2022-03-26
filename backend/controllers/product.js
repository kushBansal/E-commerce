const Product=require("../models/product");
var slugify = require('slugify')

exports.create=async(req,res)=>{
    try{
        req.body.slug=slugify(req.body.title);
        const newProduct=await new Product(req.body).save();
        res.json(newProduct);
    }
    catch(err){
        console.log("create query on product failed",err);
        res.status(400).send("create query on product failed")
    }
}

exports.remove=async(req,res)=>{
    const {slug}=req.params;
    try{
        const dltedProduct=await Product.findOneAndDelete({slug});
        res.json(dltedProduct);
    }
    catch(err)
    {
        console.log("delete query on product failed",err);
        res.status(400).send("delete query on product failed");
    }
}

exports.update=async(req,res)=>{
    const {slug}=req.params;
    req.body.slug=slugify(req.body.title);
    try{
        const updatedProduct=await Product.findOneAndUpdate({slug},
            req.body,
            {new:true});
        res.json(updatedProduct);
    }
    catch(err)
    {
        console.log("update query on product failed",err);
        res.status(400).send("update query on product failed");
    }
}

exports.read=async(req,res)=>{
    const {slug}=req.params;
    try{
        const queryProduct=await Product.findOne({slug});
        res.json(queryProduct);
    }
    catch(err)
    {
        console.log("find query on product failed",err);
        res.status(400).send("find query on product failed");
    }
}

exports.list=async(req,res)=>{
    try{
        const queryProduct=await Product.find({}).sort({createdAt:-1}).exec();
        res.json(queryProduct);
    }
    catch(err)
    {
        console.log("list query on product failed",err);
        res.status(400).send("list query on product failed");
    }
}
