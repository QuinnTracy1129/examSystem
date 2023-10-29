const Entity = require("../models/Roles");

const array = [
  {
    _id: "647dd2a5dced91b0b39444b3",
    title: "Administrator",
  },
  {
    _id: "647dd2a5dced91b0b39444b4",
    title: "Moderator",
  },
  {
    _id: "647dd2a5dced91b0b39444b5",
    title: "Candidate",
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
