const { validationResult } = require("express-validator");

const postParamValidationHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const paramErrorMessage = errors
    .array()
    .find((error) => error.location === "params");

  return res.status(400).send(paramErrorMessage);
};

module.exports = postParamValidationHandler;
