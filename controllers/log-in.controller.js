const passport = require("passport");

const logInGet = (req, res) => {
  const { messages, successRegisterMessage } = req.session;
  const errorMessage = messages?.pop();
  const successMessage = successRegisterMessage?.pop();

  res.render("log-in", {
    title: "Log In",
    error: errorMessage,
    successMessage: successMessage,
  });
};

const logInPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureMessage: true,
});

module.exports = { logInGet, logInPost };
