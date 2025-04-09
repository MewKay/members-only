const router = require("express").Router();
const controller = require("../controllers/status.controller");

router.post("/add-member", controller.membershipAdd);

module.exports = router;
