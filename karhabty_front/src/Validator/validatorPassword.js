import { isEmpty } from "./isEmpty";
import validator from "validator";

export function validatorPassword(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.reppassword = !isEmpty(data.reppassword) ? data.reppassword : "";

  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }

  if (!validator.equals(data.password, data.reppassword)) {
    errors.reppassword = "Passwords not matches";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }
  if (validator.isEmpty(data.reppassword)) {
    errors.reppassword = "Required repeat password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
