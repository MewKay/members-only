const passport = require("passport");

const logInGet = (req, res) => {
  const { messages } = req.session;
  const errorMessage = messages?.pop();

  res.render("log-in", { title: "Log In", error: errorMessage });
};

const logInPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureMessage: true,
});

module.exports = { logInGet, logInPost };
