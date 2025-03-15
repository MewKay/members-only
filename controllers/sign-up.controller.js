const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");

const signUpGet = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

const signUpPost = asyncHandler(async (req, res) => {
  const { first_name = "", last_name, username, password } = req.body;
  const user = await User.create({
    first_name,
    last_name,
    username,
    password,
  });

  res.send(user);
});

module.exports = { signUpGet, signUpPost };
