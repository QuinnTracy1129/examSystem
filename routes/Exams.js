const router = require("express").Router(),
  { find, save, update, destroy } = require("../controllers/Exams"),
  { validate } = require("../middleware/jwt");

router
  .get("/find", validate, find)
  .put("/update", validate, update)
  .post("/save", validate, save)
  .delete("/destroy", validate, destroy);

module.exports = router;
