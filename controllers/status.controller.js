const ValidationError = require("../errors/ValidationError");
const User = require("../models/User.model");
require("dotenv").config();

const membershipAdd = async (req, res) => {
  const { member_password } = req.body;
  const { user } = req;

  if (!member_password || member_password !== process.env.MEMBERS_PASSWORD) {
    throw new ValidationError("The password provided is invalid");
  }

  await User.update(user.id, { membership_status: true });

  res.redirect("/");
};

const membershipRemove = async (req, res) => {
  const { user } = req;
  await User.update(user.id, { membership_status: false });

  res.redirect("/");
};

module.exports = { membershipAdd, membershipRemove };
