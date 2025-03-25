const router = require("express").Router();
const controller = require("../controllers/log-in.controller");

router.get("/", controller.logInGet);
router.post("/", controller.logInPost);
router.get("/success", controller.mockLogInSuccess);
router.get("/failure", controller.mockLogInFailure);

module.exports = router;
