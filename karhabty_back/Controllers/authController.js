const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ValidateLogin = require("../Validator/ValidateLogin");
const ValidateRegister = require("../Validator/ValidateRegister");

const authController = {};

//Register
authController.regitserr = async (req, res) => {
  const user = req.body;

  const { errors, isValid } = ValidateRegister(user);

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const userExist = await User.findOne({ $or: [ { mail: user.mail },{ username: user.username } ] });

      if (userExist) {
        res.status(400).json({ msg: "user already exist you sould login" });
      } else {
        const user = new User(req.body);
        const hashedPaswword = await bcrypt.hash(user.password, 10);
        user.password = hashedPaswword;
        await user.save();
      
        res.status(200).json({ user: user });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LogIn
authController.login = async (req, res) => {
  const userInfo = req.body;
  const { errors, isValid } = ValidateLogin(userInfo);

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const user = await User.findOne({ mail: userInfo.mail });

      if (!user) {
        errors.mail = "you must register before";
        return res.status(400).json(errors);
      } else {
        const result = await bcrypt.compare(userInfo.password, user.password);
        if (!result) {
          errors.password = "wrong password";
          res.status(401).json(errors);
        } else {
          const token = await jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY
          );
          res.status(200).json({ user, token });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "server failed" });
  }
};

//Log out
authController.logOut = async (req, res) => {
  try {
    res.clearCookie("token"); // Supprime le cookie "token"
    res.status(200).json({ message: "You are now logged out" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed" }] });
  }
};

module.exports = authController;
