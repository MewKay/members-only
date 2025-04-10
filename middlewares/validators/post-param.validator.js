const { param } = require("express-validator");

const postParamValidator = param("messageId")
  .isInt()
  .withMessage("Invalid Type : Not an Integer")
  .bail()
  .toInt();

module.exports = postParamValidator;
