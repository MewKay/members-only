const passport = require("passport");
const logInValidator = require("../middlewares/validators/log-in.validator");
const logInValidationHandler = require("../middlewares/validators/log-in.handler");

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

const logInPost = [
  logInValidator,
  logInValidationHandler,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
];

module.exports = { logInGet, logInPost };
