const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  mail: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  isAgency: {  type: Boolean , default:false},

  agencyName: { required: false, type: String },
  roleUser: { type: String, enum: ["Agency", "User"], required: false },
  phone: { required: false, type: Number, default: 0 },
  photo: { required: false, type: String },
  address: {
    city: { type: String, required: false },
    governorate: { type: String, required: false },
    country: { type: String, required: false },
    postalCode: { type: String, required: false },
  },
  birthDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  if (this.isAgency) {
    this.agencyName.require = true;
    this.roleUser = "Agency";
    this.photo =
      "data:image/png;base64,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";
  } else {
    this.roleUser = "User";
    this.photo =
      "https://mdbootstrap.com/img/new/avatars/6.jpg";
  }

  next();
});
module.exports = mongoose.model("User", userSchema);
