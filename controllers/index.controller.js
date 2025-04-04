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

const indexPost = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const { title, text } = req.body;

  await Message.create({
    title,
    text,
    user_id,
  });

  res.redirect("/");
});

const loggingOut = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
};

module.exports = { indexGet, indexPost, loggingOut };
