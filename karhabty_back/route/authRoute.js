const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
router.post("/singup", authController.regitserr);
router.post("/login", authController.login);
router.get("/logOut", authController.logOut);
module.exports = router;
