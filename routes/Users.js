const router = require("express").Router(),
  { find, update, save } = require("../controllers/Users"),
  { validate } = require("../middleware/jwt");

router
  .get("/find", validate, find)
  .put("/update", validate, update)
  .post("/save", save);

module.exports = router;
