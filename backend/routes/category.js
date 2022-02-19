const express=require("express");

const router=express.Router();
// import controllers
const {create,remove,list,read,update}=require("../controllers/category")

// import middlewares
const {authCheck,adminCheck}=require("../middlewares/auth");
const { route } = require("./auth");

// routes
router.get("/categories",list);
router.post("/category/",authCheck,adminCheck,create);
router.get("/category/:slug",authCheck,adminCheck,read);
router.put("/category/:slug",authCheck,adminCheck,update);
router.delete("/category/:slug",authCheck,adminCheck,remove);
module.exports = router;