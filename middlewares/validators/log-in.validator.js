const { ExpressValidator } = require("express-validator");
const { ranges } = require("../../constants/validation");

const { body } = new ExpressValidator();

const { min: minUsername, max: maxUsername } = ranges.username;
const { min: minPassword, max: maxPassword } = ranges.password;

const logInValidator = [
  body("username")
    .trim()
    .isLength({ min: minUsername, max: maxUsername })
    .withMessage(
      `Username is required to be between ${minUsername} and ${maxUsername}.`,
    )
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers."),

  body("password")
    .isLength({ min: minPassword, max: maxPassword })
    .withMessage(
      `Password must be between ${minPassword} and ${maxPassword} characters.`,
    ),
];

module.exports = logInValidator;
