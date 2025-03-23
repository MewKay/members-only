const router = require("express").Router();
const controller = require("../controllers/log-in.controller");

router.get("/", controller.logInGet);

module.exports = router;
