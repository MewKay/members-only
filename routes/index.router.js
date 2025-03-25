const router = require("express").Router();
const controller = require("../controllers/index.controller");

router.get("/", controller.indexGet);

module.exports = router;
