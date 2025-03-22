const { validationResult, matchedData } = require("express-validator");

const signUpValidationHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorsArray = errors.array();
  const validValues = matchedData(req);

  return res.render("sign-up", {
    title: "Sign Up",
    errors: errorsArray,
    validValues: validValues,
  });
};

module.exports = signUpValidationHandler;
