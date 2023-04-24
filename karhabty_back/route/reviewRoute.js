const express = require("express");
const reviewController = require("../Controllers/reviewController");
const authMiddleware = require("../Middleware/authMiddleware")
const router = express.Router();
router.post("/review/", authMiddleware,reviewController.createReview);
router.put("/review/:id", authMiddleware,reviewController.updateReview);
router.delete("/review/:id",authMiddleware, reviewController.deleteReview);
router.get("/review/:id", authMiddleware,reviewController.getReviewById);
router.get("/allReviews", reviewController.getReviews);
router.get("/reviewCar/:id",  reviewController.getReviewByCar)


module.exports = router;