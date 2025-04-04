const { matchedData, validationResult } = require("express-validator");
const postValidator = require("../middlewares/validators/post.validator");
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

const indexPost = [
  postValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return res.send("Fields invalid");
    }

    const user_id = req.user.id;
    const { title, text } = matchedData(req);

    await Message.create({
      title,
      text,
      user_id,
    });

    res.redirect("/");
  }),
];

const loggingOut = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
};

module.exports = { indexGet, indexPost, loggingOut };
