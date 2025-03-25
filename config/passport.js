const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// Setup Strategy
const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findByExactUsername(username);

    const isUsernameValid = user !== undefined;
    if (!isUsernameValid) {
      return done(null, false, { message: "Incorrect username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

// Serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);

    done(null, user);
  } catch (error) {
    done(error);
  }
});
