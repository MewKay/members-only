const express = require("express");
const app = express();

const path = require("node:path");
const viewsPath = path.join(__dirname, "views");
const assetsPath = path.join(__dirname, "public");

app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

const session = require("./config/session");
const passport = require("passport");
const globalizeUser = require("./middlewares/globalize-user");
app.use(session);
require("./config/passport");
app.use(passport.session());
app.use(globalizeUser);

const indexRouter = require("./routes/index.router");
const signUpRouter = require("./routes/sign-up.router");
const logInRouter = require("./routes/log-in.router");
const statusRouter = require("./routes/status.router");
const errorHandler = require("./middlewares/error-handler");
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/", statusRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on PORT : ${PORT}`);
});
