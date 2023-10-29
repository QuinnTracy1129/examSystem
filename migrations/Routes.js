const router = require("express").Router(),
  users = require("./Users"),
  roles = require("./Roles");

module.exports = app => {
  app.use(
    "/migrate",
    router.post("/users", users),
    router.post("/roles", roles)
  );
};
