const { validationResult } = require("express-validator");

const postValidationHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  req.session.postValidationErrorMessages = errors
    .array()
    .map((error) => error.msg);

  req.session.save((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
};

module.exports = postValidationHandler;
