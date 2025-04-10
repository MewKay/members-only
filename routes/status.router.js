const router = require("express").Router();
const controller = require("../controllers/status.controller");

router.post("/add-member", controller.membershipAdd);
router.post("/remove-member", controller.membershipRemove);
router.post("/add-admin", controller.adminAdd);

module.exports = router;
