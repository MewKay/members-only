const router = require("express").Router();
const controller = require("../controllers/sign-up.controller");

router.get("/", controller.signUpGet);

module.exports = router;
