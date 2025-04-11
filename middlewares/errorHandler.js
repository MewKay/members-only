// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err);

  res.status(statusCode).send(err.message);
};

module.exports = errorHandler;
