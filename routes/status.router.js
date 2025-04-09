const router = require("express").Router();
const controller = require("../controllers/status.controller");

router.post("/add-member", controller.membershipAdd);
router.post("/remove-member", controller.membershipRemove);

module.exports = router;
