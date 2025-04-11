const ValidationError = require("../errors/Validation.error");
const { isAuth } = require("../middlewares/auth");
const User = require("../models/User.model");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const membershipAdd = [
  isAuth,
  asyncHandler(async (req, res) => {
    const { member_password } = req.body;
    const { user } = req;

    if (!member_password || member_password !== process.env.MEMBERS_PASSWORD) {
      throw new ValidationError("The password provided is invalid");
    }

    await User.update(user.id, { membership_status: true });

    res.redirect("/");
  }),
];

const membershipRemove = [
  isAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    await User.update(user.id, { membership_status: false });

    res.redirect("/");
  }),
];

const adminAdd = [
  isAuth,
  asyncHandler(async (req, res) => {
    const { admin_password } = req.body;
    const { user } = req;

    if (!admin_password || admin_password !== process.env.ADMIN_PASSWORD) {
      throw new ValidationError("The password provided is invalid");
    }

    await User.update(user.id, { is_admin: true });

    res.redirect("/");
  }),
];

module.exports = { membershipAdd, membershipRemove, adminAdd };
