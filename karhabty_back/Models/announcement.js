const mongoose = require("mongoose");
const announcementSchema = mongoose.Schema({
  price: { required: true, type: Number },
  securityDeposit: { required: true, type: Number },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["active", "inactive"], required: true },
  titre: { type: String, required: true },
  description: { required: true, type: String },
  availableStartDate: { type: Date, default: Date.now },

  availableEndDate: { type: Date, default: Date.now },

  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
    unique: true,
  },
  agence: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 
  photo: { type: String },
  color: { type: String },
});

announcementSchema.pre("save", async function (next) {
  try {
    const car = await mongoose.model("Car").findById(this.car); // Récupération du car correspondant à l'ID
    this.photo = car.photo;
    this.color = car.color;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Announcement", announcementSchema);