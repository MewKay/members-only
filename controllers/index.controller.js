const Message = require("../models/Message.model");
const asyncHandler = require("express-async-handler");

const indexGet = asyncHandler(async (req, res) => {
  const { user } = req;
  const indexTitle = "My Clubhouse";
  let messages;

  if (!req.isAuthenticated() || !user.membership_status) {
    messages = await Message.findBy();
    return res.render("index", { title: indexTitle, messages: messages });
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
