const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { validationResult, matchedData } = require("express-validator");
const signUpValidator = require("../middlewares/validators/sign-up.validator");

const signUpGet = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

const signUpPost = [
  signUpValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { first_name = "", last_name, username, password } = matchedData(req);
    const user = await User();
    const userResult = await user.create({
      first_name,
      last_name,
      username,
      password: await bcrypt.hash(password, 10),
    });

    res.send(userResult);
  }),
];

module.exports = { signUpGet, signUpPost };
