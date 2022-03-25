const express=require("express");

const router=express.Router();
// import controllers
const {create,remove,list,read,update}=require("../controllers/sub")

// import middlewares
const {authCheck,adminCheck}=require("../middlewares/auth");
const { route } = require("./auth");

// routes
router.get("/subs",list);
router.post("/sub/",authCheck,adminCheck,create);
router.get("/sub/:slug",authCheck,adminCheck,read);
router.put("/sub/:slug",authCheck,adminCheck,update);
router.delete("/sub/:slug",authCheck,adminCheck,remove);
module.exports = router;