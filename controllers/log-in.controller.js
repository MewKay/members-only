const passport = require("passport");

const logInGet = (req, res) => {
  res.render("log-in", { title: "Log In" });
};

const logInPost = passport.authenticate("local", {
  successRedirect: "/log-in/success",
  failureRedirect: "/log-in/failure",
  failureMessage: true,
});

const mockLogInSuccess = (req, res) => {
  res.send(`User ${req.user.username} is logged in!`);
};

const mockLogInFailure = (req, res) => {
  const { messages } = req.session;
  res.send(messages.at(-1));
};

module.exports = { logInGet, logInPost, mockLogInSuccess, mockLogInFailure };
