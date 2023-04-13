const express = require("express");
const {regitser} = require("../Controllers/authController")
const userController = require("../Controllers/userController");
const router = express.Router();
const authMiddleware  = require("../Middleware/authMiddleware");
//router.post("/user", userController.create);
router.put("/user/:id",authMiddleware, userController.update);
router.delete("/user/:id", authMiddleware,userController.delete);
router.get("/user/:id", authMiddleware, userController.getUserById);
router.get("/users/:role",authMiddleware, userController.getAllByRole);
router.get("/agency/:id",authMiddleware, userController.getAgency);

module.exports = router;


