const express=require("express");

const router=express.Router();
// import controllers
const {create,remove,list,read,update}=require("../controllers/product")

// import middlewares
const {authCheck,adminCheck}=require("../middlewares/auth");
// const { route } = require("./auth");

// routes
router.get("/products",list);
router.post("/product/",authCheck,adminCheck,create);
router.get("/product/:slug",authCheck,adminCheck,read);
router.put("/product/:slug",authCheck,adminCheck,update);
router.delete("/product/:slug",authCheck,adminCheck,remove);
module.exports = router;