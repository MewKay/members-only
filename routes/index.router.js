const router = require("express").Router();
const controller = require("../controllers/index.controller");

router.get("/", controller.indexGet);
router.post("/create-post", controller.indexPost);
router.post("/delete-post/:messageId", controller.postDelete);
router.post("/log-out", controller.loggingOut);

module.exports = router;
