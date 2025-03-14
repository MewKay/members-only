const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("This is sign up page");
});

module.exports = router;
