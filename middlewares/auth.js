const UnauthorizedError = require("../errors/UnauthorizedError");
const ForbiddenError = require("../errors/ForbiddenError");

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

  throw new ForbiddenError("Permissions insufficient");
};

module.exports = { isAuth, isAdmin };
