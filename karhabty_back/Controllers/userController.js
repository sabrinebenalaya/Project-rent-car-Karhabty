const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const isEmpty = require("../Validator/isEmpty");

const userController = {};

//GET ALL USER
userController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    users
      ? res.status(200).json(users)
      : res.status(404).json({ message: "Users not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL BY ROLE
userController.getAllByRole = async (req, res) => {
  const { role } = req.params;
  console.log(role);
  try {
    const users = await User.find({ roleUser: role });
    console.log({ users });
    users
      ? res.status(200).json(users)
      : res.status(404).json({ message: "Users not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GET AGENCY BY ID
userController.getAgency = async (req, res) => {
  try {
    const agency = await User.findOne({
      _id: req.params.id,
      roleUser: "Agency",
    });
    if (!agency) {
      return res.status(404).json({ message: "Agency not found" });
    }
    return res.status(200).json(agency);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//GET USER BY ID
userController.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//UPDATE USER
userController.update = async (req, res) => {
  const userToUpdate = req.body;

  if (!isEmpty(userToUpdate.password)) {
    const hashedPaswword = await bcrypt.hash(userToUpdate.password, 10);
    userToUpdate.password = hashedPaswword;
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { ...userToUpdate } },
      {
        new: true,
        runValidators: true,
      }
    );

    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//DELETE A USER
userController.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = userController;
