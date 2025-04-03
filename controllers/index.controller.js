const Message = require("../models/Message.model");
const asyncHandler = require("express-async-handler");

const indexGet = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    const messages = await Message.findBy();
    res.render("index", { title: "My Clubhouse", messages: messages });
  }
});

const loggingOut = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
};

module.exports = { indexGet, loggingOut };
