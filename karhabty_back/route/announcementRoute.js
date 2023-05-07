const express = require("express");
const announcementController = require("../Controllers/announcementController");

const authMiddleware = require("../Middleware/authMiddleware")
const router = express.Router();
router.post("/announcement/", announcementController.createAnnouncement);
router.put("/announcement/:id",authMiddleware, announcementController.updateAnnouncement);
router.delete("/announcement/:id",authMiddleware, announcementController.deleteAnnouncement);
router.get("/announcement/:id", announcementController.getAnnouncementById);
router.get("/announcement/", announcementController.getAllAnnouncements);
router.get("/activeAnnouncement", announcementController.getAllActiveAnnouncements);
router.get("/allAnnouncement/:id", announcementController.getAllAnnouncementsByAgency);
router.get("/searchAnnouncement/", announcementController.searchAnnouncements);
module.exports = router;