const indexGet = (req, res) => {
  const { user } = req;

  res.render("index", { title: "My Clubhouse", user: user });
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
