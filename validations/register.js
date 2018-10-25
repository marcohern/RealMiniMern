const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmpwd = !isEmpty(data.confirmpwd) ? data.confirmpwd : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 chars";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(data.password, { min: 3, max: 30 })) {
    errors.password = "Password must be between 3 and 30 chars";
  }

  if (Validator.isEmpty(data.confirmpwd)) {
    errors.password = "Confirm Password is required";
  }

  if (!Validator.equals(data.password, data.confirmpwd)) {
    errors.password = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
