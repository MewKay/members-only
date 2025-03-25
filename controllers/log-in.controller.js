const passport = require("passport");

const logInGet = (req, res) => {
  const { messages } = req.session;
  const errorMessage = messages.pop();

  res.render("log-in", { title: "Log In", error: errorMessage });
};

const logInPost = passport.authenticate("local", {
  successRedirect: "/log-in/success",
  failureRedirect: "/log-in",
  failureMessage: true,
});

const mockLogInSuccess = (req, res) => {
  res.send(`User ${req.user.username} is logged in!`);
};

module.exports = { logInGet, logInPost, mockLogInSuccess };
