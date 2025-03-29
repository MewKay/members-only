const globalizeUser = (req, res, next) => {
  const { user } = req;
  res.locals.user = user;

  next();
};

module.exports = globalizeUser;
