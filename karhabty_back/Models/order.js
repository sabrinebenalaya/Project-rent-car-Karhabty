const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  announcement: { type: mongoose.Schema.Types.ObjectId, ref: "Announcement", required: true },
  ref: { required: true, type: String, unique:true },
  price: { type: Number, required: true },
  status: {  type: String, default: "active" },
  availableDates: {
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
  },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true }

});

module.exports = mongoose.model("Order", orderSchema);

