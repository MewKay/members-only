const UnauthorizedError = require("../errors/UnauthorizedError");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new UnauthorizedError("Not authenticated");
};

const isAdmin = (req, res, next) => {
  const { user } = req;

  if (user.is_admin) {
    return next();
  }

  res.status(401).send("Unauthorized action (not admin)");
};

module.exports = { isAuth, isAdmin };
