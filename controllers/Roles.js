const Entity = require("../models/Roles");

exports.browse = (_, res) =>
  Entity.find({
    title: { $nin: ["Administrator", "Guest"] },
  })
    .select("-__v")
    .lean()
    .then(payload =>
      res.json({
        success: "Roles Fetched Successfully",
        payload,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));
