class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized Error";
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
