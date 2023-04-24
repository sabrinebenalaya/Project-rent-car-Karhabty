const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");
const authMiddleware = require("../Middleware/authMiddleware")
router.post("/order/", orderController.createOrder);
router.put("/order/:id", authMiddleware,orderController.updateOrder);
router.delete("/order/:id",authMiddleware, orderController.deleteOrder);
router.get("/order/:id", authMiddleware,orderController.getOrderById);
router.get("/order/",authMiddleware, orderController.getAllOrder);
router.get("/order/orders/:id", authMiddleware,orderController.getOrderByUser);
router.get("/order/ordersAgency/:id", authMiddleware,orderController.getOrderByAgency);
router.get("/order/status/:status",authMiddleware, orderController.getAllActiveOrde);
router.post("/order/payement", authMiddleware,orderController.createPayement);
module.exports = router;


