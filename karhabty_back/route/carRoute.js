const express = require("express");

const carController = require("../Controllers/carController");
const authMiddleware = require("../Middleware/authMiddleware")
const router = express.Router();

router.get("/cars",authMiddleware, carController.getAllCars);
router.get("/car/:id", carController.getCarById);
router.post("/car",authMiddleware, carController.createCar);
router.put("/car/:id",authMiddleware, carController.updateCar);
router.delete("/car/:id",authMiddleware, carController.deleteCar);

/* a revoir cette fonction normalement search est appliquer sur annoucement*/
router.get("/search", carController.search);


module.exports = router;
