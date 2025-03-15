const session = require("express-session");
const PgStore = require("connect-pg-simple")(session);
const db = require("./database");
require("dotenv").config();

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

const store = new PgStore({
  pool: db.pool,
  createTableIfMissing: true,
});

const sessionCallback = session({
  secret: process.env.SESSION_SECRET_ID,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: ONE_WEEK,
  },
});

module.exports = sessionCallback;
