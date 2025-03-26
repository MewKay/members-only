const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { matchedData } = require("express-validator");
const signUpValidator = require("../middlewares/validators/sign-up.validator");
const signUpValidationHandler = require("../middlewares/validators/sign-up.handler");

const signUpGet = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

const signUpPost = [
  signUpValidator,
  signUpValidationHandler,
  asyncHandler(async (req, res) => {
    const { first_name = "", last_name, username, password } = matchedData(req);
    await User.create({
      first_name,
      last_name,
      username,
      password: await bcrypt.hash(password, 10),
    });

    req.session.successRegisterMessage = [
      "Account created successfully! You can now log in.",
    ];
    res.redirect("/log-in");
  }),
];

module.exports = { signUpGet, signUpPost };
