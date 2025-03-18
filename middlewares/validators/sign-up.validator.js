const { ExpressValidator } = require("express-validator");
const User = require("../../models/User.model");
const { ranges, locale } = require("../../constants/validation");

const { body } = new ExpressValidator({
  isUsernameTaken: async (value) => {
    const user = await User();
    const existingUsers = await user.findBy({ username: value });
    const isUsernameUnique = existingUsers.length <= 0;

    if (!isUsernameUnique) {
      throw new Error("Username is already in use");
    }
  },
  isPasswordConfirmed: (value, { req }) => {
    return value === req.body.confirm_password;
  },
});

const { min: minFirstName, max: maxFirstName } = ranges.first_name;
const { min: minLastName, max: maxLastName } = ranges.last_name;
const { min: minUsername, max: maxUsername } = ranges.username;
const { min: minPassword, max: maxPassword } = ranges.password;

const alphaErrorMessage =
  "must contains only contain alphabet letters. Hyphens, apostrophes, and spaces are allowed.";
const passwordLengthErrorMessage = `Password must be between ${minPassword} and ${maxPassword} characters.`;

const signUpValidator = [
  body("first_name")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: minFirstName, max: maxFirstName })
    .withMessage(
      `First name is required to be between ${minFirstName} and ${maxFirstName}.`,
    )
    .isAlpha(locale, { ignore: " -'" })
    .withMessage(`First name ${alphaErrorMessage}`),

  body("last_name")
    .trim()
    .isLength({ min: minLastName, max: maxLastName })
    .withMessage(
      `Last name is required to be between ${minLastName} and ${maxLastName}.`,
    )
    .isAlpha(locale, { ignore: " -'" })
    .withMessage(`Last name ${alphaErrorMessage}`),

  body("username")
    .trim()
    .isLength({ min: minUsername, max: maxUsername })
    .withMessage(
      `Username is required to be between ${minUsername} and ${maxUsername}.`,
    )
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers.")
    .bail()
    .isUsernameTaken(),

  body("password")
    .isLength({ min: minPassword, max: maxPassword })
    .withMessage(passwordLengthErrorMessage),

  body("confirm_password")
    .isLength({ min: minPassword, max: maxPassword })
    .withMessage(passwordLengthErrorMessage)
    .isPasswordConfirmed(),
];

module.exports = signUpValidator;
