const express = require("express");

const carController = require("../Controllers/carController");
const authMiddleware = require("../Middleware/authMiddleware")
const router = express.Router();
const path = require('path');


const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/cars/')
  },
  filename: function (req, file, cb) {
    const newFileName = Date.now() + '-' + file.originalname
    cb(null, newFileName)
  }
})
const upload = multer({ storage: storage })
router.get("/cars",authMiddleware, carController.getAllCars);
router.get("/car/:id", carController.getCarById);
router.post("/car", upload.single("image"), carController.createCar);
router.put("/car/:id",authMiddleware, carController.updateCar);
router.delete("/car/:id",authMiddleware, carController.deleteCar);

/* a revoir cette fonction normalement search est appliquer sur annoucement*/
router.get("/search", carController.search);
router.get('/assets/cars/:filename', (req, res) => {
   
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..','assets','cars', filename);
    
    res.sendFile(filePath)


  });
  
  

module.exports = router;
