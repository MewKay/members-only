const router = require("express").Router();
const controller = require("../controllers/index.controller");

router.get("/", controller.indexGet);
router.get("/log-out", controller.loggingOut);

module.exports = router;
