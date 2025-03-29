const indexGet = (req, res) => {
  res.render("index", { title: "My Clubhouse" });
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
