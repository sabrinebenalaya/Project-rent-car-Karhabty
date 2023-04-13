const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};

  data.mail = !isEmpty(data.mail) ? data.mail : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.reppassword = !isEmpty(data.reppassword) ? data.reppassword : "";
  data.agencyName = !isEmpty(data.agencyName) ? data.agencyName : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (data.isAgency && validator.isEmpty(data.agencyName)) {
    errors.agencyName = "Required Agency Name";
  }
  if (!data.isAgency && !validator.isEmpty(data.agencyName)) {
    errors.agencyName = "Agency Name must be empty";
  }
  if (!validator.equals(data.password, data.reppassword)) {
    errors.reppassword = "Passwords not matches";
  }
  if (!validator.isEmail(data.mail)) {
    errors.mail = "Required format email";
  }
  if (validator.isEmpty(data.mail)) {
    errors.mail = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }
  if (validator.isEmpty(data.reppassword)) {
    errors.reppassword = "Required repeat password";
  }
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "Required First Name";
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Required Last Name";
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "Required username";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
