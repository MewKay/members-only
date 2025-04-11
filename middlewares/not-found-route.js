const NotFoundError = require("../errors/NotFound.error");

// eslint-disable-next-line no-unused-vars
const notFoundRoute = (req, res) => {
  throw new NotFoundError("404 Not Found");
};

module.exports = notFoundRoute;
