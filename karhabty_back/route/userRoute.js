const express = require("express");
const {regitser} = require("../Controllers/authController")
const userController = require("../Controllers/userController");
const router = express.Router();
const authMiddleware  = require("../Middleware/authMiddleware");
const path = require('path');
const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/')
  },
  filename: function (req, file, cb) {
    const newFileName = Date.now() + '-' + file.originalname
    cb(null, newFileName)
  }
})



const upload = multer({ storage: storage })
//router.post("/user", userController.create);
router.put("/user/updatePhoto/:id", upload.single("image"), userController.updatePhoto)
router.get('/assets/:filename',(req,res)=>{
  const {filename} = req.params
  const filePath = path.join(__dirname, '..', 'assets', filename);

  res.sendFile(filePath)
})
router.put("/user/:id",authMiddleware, userController.update);
router.delete("/user/:id", authMiddleware,userController.delete);
router.get("/user/:id", authMiddleware, userController.getUserById);
router.get("/users/:role", userController.getAllByRole);
router.get("/agency/:id", userController.getAgency);
router.get("/users", userController.getAllUsers);

module.exports = router;


