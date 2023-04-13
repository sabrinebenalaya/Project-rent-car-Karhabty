const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    cardHolderName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expirationMonth: { type: Number, required: true },
    expirationYear: { type: Number, required: true },
    cvv: { type: String, required: true }
  });

  
module.exports = mongoose.model("Payment", paymentSchema);