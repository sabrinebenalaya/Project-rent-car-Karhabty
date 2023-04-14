import { isEmpty } from "./isEmpty";
import validator from "validator";

export function validatorName(data) {
  let errors = {};

  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.agencyName = !isEmpty(data.agencyName) ? data.agencyName : "";

  

  if (!validator.isLength(data.lastName, { min: 1 })) {
    errors.lastName = "The lastName must have 1 letter atlist.";
  }
  if (!validator.isLength(data.firstName, { min: 1 })) {
    errors.firstName = "The firstName must have 1 letter atlist.";
  }

  if (!validator.matches(data.firstName, /^[a-zA-ZÀ-ÿ ',-]+$/)) {
    errors.firstName = "The firstName must be a string and one letter String atlist";
  }
  if (!validator.matches(data.lastName, /^[a-zA-ZÀ-ÿ ',-]+$/)) {
    errors.lastName = "The lastName must be a string";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
