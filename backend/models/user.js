const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        index:true,
    },
    role:{
        type:String,
        default:"subsciber"
    },
    cart:{
        type:Array,
        default:[]
    },
    // wishlist:[{
    //     type:ObjectId,
    //     ref:"Product"
    // }],
    address: String,
},{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports=User;