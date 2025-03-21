const { validationResult } = require("express-validator");

const signUpValidationHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorsArray = errors.mapped();

  return res.status(400).send(errorsArray);
};

module.exports = signUpValidationHandler;
