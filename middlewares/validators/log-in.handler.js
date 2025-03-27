const { validationResult } = require("express-validator");

const logInValidationHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const validationErrorMessages = errors.mapped();
  return res.render("log-in", {
    title: "Log In",
    validationErrorMessages: validationErrorMessages,
  });
};

module.exports = logInValidationHandler;
