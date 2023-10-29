module.exports = app => {
  // List of available Routes
  require("../migrations/Routes")(app);
  app.use("/users", require("./Users"));
  app.use("/mailer", require("./Mailer"));
  app.use("/auth", require("./Auth"));
  app.use("/roles", require("./Roles"));
  app.use("/questionnaires", require("./Questionnaires"));
  app.use("/exams", require("./Exams"));
  app.use("/results", require("./Results"));
};
