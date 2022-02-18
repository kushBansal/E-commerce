const express=require("express");

const router=express.Router();
// import controllers
const {deleteUpdateUser,currentUser}=require("../controllers/auth")

// import middlewares
const {authCheck,adminCheck}=require("../middlewares/auth");

// routes
router.post("/delete-and-update-user",authCheck,deleteUpdateUser);
router.post("/current-user",authCheck,currentUser);
router.post("/current-admin",authCheck,adminCheck,currentUser);

module.exports = router;