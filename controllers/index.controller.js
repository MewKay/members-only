const { matchedData } = require("express-validator");
const Message = require("../models/Message.model");
const asyncHandler = require("express-async-handler");
const { isAuth, isAdmin } = require("../middlewares/auth");
const postValidator = require("../middlewares/validators/post.validator");
const postValidationHandler = require("../middlewares/validators/post.handler");
const { formatMessagesDate } = require("../utils/controller.util");
const postParamValidator = require("../middlewares/validators/post-param.validator");
const NotFoundError = require("../errors/NotFound.error");

const indexGet = asyncHandler(async (req, res) => {
  const { user } = req;
  const indexTitle = "My Clubhouse";
  let messages;

  const { postValidationErrorMessages } = req.session;
  delete req.session.postValidationErrorMessages;

  const isPrivilegedUser = user?.membership_status || user?.is_admin;

  if (req.isAuthenticated() && isPrivilegedUser) {
    const rawMessages = await Message.findAllWithUsers();

    if (!rawMessages) {
      throw new NotFoundError("An error occured when querying messages");
    }

    messages = formatMessagesDate(rawMessages);
  } else {
    messages = await Message.findBy();

    if (!messages) {
      throw new NotFoundError("An error occured when querying messages");
    }
  }

  return res.render("index", {
    title: indexTitle,
    messages: messages,
    errors: postValidationErrorMessages,
  });
});

const indexPost = [
  isAuth,
  postValidator,
  postValidationHandler,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const { title, text } = matchedData(req);
    const result = await Message.create({
      title,
      text,
      user_id,
    });

    if (result.rowCount <= 0) {
      throw new Error("An error occured when creating the message.");
    }

    res.redirect("/");
  }),
];

const postDelete = [
  isAuth,
  isAdmin,
  postParamValidator,
  postValidationHandler,
  asyncHandler(async (req, res) => {
    const { messageId } = matchedData(req);
    const result = await Message.remove(messageId);

    if (result.rowCount <= 0) {
      throw new Error("An error occured when creating the message.");
    }

    res.redirect("/");
  }),
];

const loggingOut = [
  isAuth,
  (req, res, next) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }

      res.redirect("/");
    });
  },
];

module.exports = { indexGet, indexPost, postDelete, loggingOut };
