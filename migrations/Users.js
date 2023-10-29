const Entity = require("../models/Users");

const array = [
  {
    _id: "647dd2a5dced91b0b39444b3",
    role: "647dd2a5dced91b0b39444b3", // Administrator
    email: "admin@gmail.com",
    password: "password",
  },
];

module.exports = (_, res) =>
  Entity.create(array)
    .then(payload =>
      res.status(201).json({
        message: "Success",
        payload,
      })
    )
    .catch(err => res.status(400).json({ message: err.message }));
