const Announcement = require("../Models/announcement");

const announcementController = {};

// Create a new announcement
announcementController.createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all announcements
announcementController.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    console.log(announcements)
    announcements
      ? res.status(200).json(announcements)
      : res.status(404).json({ message: "Announcements not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all active announcements
announcementController.getAllActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({status:"active"});
   
    announcements
      ? res.status(200).json(announcements)
      : res.status(404).json({ message: "Announcements not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all active announcements by Agency
announcementController.getAllAnnouncementsByAgency = async (req, res) => {
  try {
    const announcements = await Announcement.find({ agence:req.params.id});
    
    if (!announcements) {
      return res.status(404).json({ message: "Announcements not found" });
    }

    // trier le tableau par ordre décroissant d'annonces actives
    announcements.sort((a, b) => b.active - a.active);
    
    res.status(200).json(announcements);

   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single announcement by ID
announcementController.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    !announcement
      ? res.status(404).json({ message: "Announcement not found" })
      : res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing announcement
announcementController.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    !announcement
      ? res.status(404).json({ message: "Announcement not found" })
      : res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an existing announcement
announcementController.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    !announcement
      ? res.status(404).json({ message: "Announcement not found" })
      : res.status(200).json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = announcementController;
