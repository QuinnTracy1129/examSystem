const router = require("express").Router(),
  { browse } = require("../controllers/Roles"),
  { validate } = require("../middleware/jwt");

router.get("/", validate, browse);

module.exports = router;
