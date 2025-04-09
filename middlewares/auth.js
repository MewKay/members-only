const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send("Unauthorized action");
};

const isAdmin = (req, res, next) => {
  const { user } = req;

  if (user.isAdmin) {
    return next();
  }

  res.status(401).send("Unauthorized action");
};

module.exports = { isAuth, isAdmin };
