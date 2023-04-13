const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};

data.mail = !isEmpty(data.mail) ? data.mail : "";
data.password = !isEmpty(data.password) ? data.password : "";


  if (!validator.isEmail(data.mail)) {
    errors.mail = "Required format email";
  }
  if (validator.isEmpty(data.mail)) {
    errors.mail = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }
 


  return {
      errors,
      isValid: isEmpty(errors)
  }
};