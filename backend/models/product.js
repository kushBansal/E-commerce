const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        text:true,
        maxlength:32
    },
    slug:{
        type:String,
        unique:true,
        index:true,
        lowercase:true
    },
    description:{
        type:String,
        text:true,
        maxlength:2000,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
    },
    quantity:{
        type:Number,
        trim:true,
    },
    sold:{
        type:Number,
        default:0,
    },
    category:{
        type:ObjectId,
        ref:"Categoty"
    },
    subs:[{
        type:ObjectId,
        ref:"Sub",
    }],
    shipping:{
        type:String,
        enum:["yes","no"],
    },
    brand:{
        type:String
    },
    color:{
        type:String
    },
    images:[{
        type: Array,
    }]
    // rating:[{
    //     star:Number,
    //     postedBy:{
    //         type:ObjectId,
    //         ref:"User"
    //     }
    // }]
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema);
