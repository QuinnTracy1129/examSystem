const router = require("express").Router(),
  { find, save, statistics } = require("../controllers/Results"),
  { validate } = require("../middleware/jwt");

router
  .get("/find", validate, find)
  .get("/statistics", validate, statistics)
  .post("/save", validate, save);
// .delete("/destroy", validate, destroy);

module.exports = router;
