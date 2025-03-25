const indexGet = (req, res) => {
  const { user } = req;

  if (req.isAuthenticated()) {
    return res.send(
      `${user.username} is logged in! <a href="/log-out">Log Out</a>`,
    );
  }

  res.send("This is index route");
};

const loggingOut = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
};

module.exports = { indexGet, loggingOut };
