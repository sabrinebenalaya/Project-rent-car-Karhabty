const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  announcement: { type: mongoose.Schema.Types.ObjectId, ref: "Announcement", required: true },
  ref: { required: true, type: String, unique:true },
  price: { type: Number, required: true },
  status: {  type: String,enum: ["inactive", "active", "awaiting"], default: "awaiting" },
  availableDates: {
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
  },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
  agency:{ type: mongoose.Schema.Types.ObjectId},
  photo: { type: String }
});  
orderSchema.pre("save", async function (next) {
  try {
    const announcement = await mongoose.model("Announcement").findById(this.announcement); 
    this.agency = announcement.agence;
    this.photo= announcement.photo;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Order", orderSchema);

