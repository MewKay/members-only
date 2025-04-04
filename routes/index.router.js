const router = require("express").Router();
const controller = require("../controllers/index.controller");

router.get("/", controller.indexGet);
router.post("/create-post", controller.indexPost);
router.get("/log-out", controller.loggingOut);

module.exports = router;
