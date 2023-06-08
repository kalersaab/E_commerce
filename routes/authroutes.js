const express = require("express");
const router = express.Router();
const userctrl = require("../controller/userctrl")

router.post("/register", userctrl.createUser);
router.get("/login", userctrl.login);
router.get("/getallusers", userctrl.getalluser);
router.get("/getuser/:id", userctrl.getuser)
router.delete("/delete/:id", userctrl.deleteuser)
router.put("/updateuser/:id", userctrl.updateuser)
module.exports= router;