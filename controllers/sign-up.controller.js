const signUpGet = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

module.exports = { signUpGet };
