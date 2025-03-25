const indexGet = (req, res) => {
  const { user } = req;
  res.send(`${user.username} is logged in!`);
};

module.exports = { indexGet };
