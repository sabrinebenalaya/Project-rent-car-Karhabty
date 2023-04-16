const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
  brand: { required: true, type: String },
  model: { type: String, required: true },
  year: { type: Number, required: false },
  color: { required: true, type: String },
  typeFuel: { type: String, required: true },
  photo: {  type: String },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
    default: "active",
  },
  mixedConsumption: { type: Number },
  extra_urbanConsumtion: { type: Number },
  urbanConsumtion: { type: Number },
  carrosserie: { type: String },
  numberOfPlaces: { type: Number },
  numberOfDoors: { type: Number },
  box: { type: String, default: "Manual", enum: ["Manual", "Automatic"] },
  numberOfReports: { type: Number },
  maxSpeed: { type: Number },
  numberOfCylinders: { type: Number },
  fiscalPower: { type: Number },
  connectivity: { type: String },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: false,
  },
});

module.exports = mongoose.model("Car", carSchema); 
