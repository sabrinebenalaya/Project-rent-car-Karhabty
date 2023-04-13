import { isEmpty } from "./isEmpty";
import validator from "validator";

export function validatorPhone(data) {
  let errors = {};


  if (validator.isEmpty(data)) {
    errors.phone = "Required password";
  }

  if (!validator.isLength(data, { min: 8, max: 8 })) {
    errors.phone = "The phone number must be a 8 digits long.";
  }

  if (!validator.isNumeric(data)) {
    errors.phone = "The phone number must be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
