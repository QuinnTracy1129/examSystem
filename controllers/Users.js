const Entity = require("../models/Users"),
  handleDuplicate = require("../config/duplicate"),
  handleQuery = require("../config/query"),
  bulkWrite = require("../config/bulkWrite");

exports.find = ({ query }, res) =>
  Entity.find(handleQuery(query))
    .select("-__v -password")
    .sort({ createdAt: -1 })
    .lean()
    .then(payload =>
      res.json({
        success: "Users Found Successfully",
        payload,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.update = (req, res) =>
  bulkWrite(req, res, Entity, "Users Updated Successfully");

exports.save = ({ body }, res) =>
  Entity.create(body)
    .then(_payload =>
      res.status(201).json({
        success: "Registration Success, Proceed to Login",
        payload: { ..._payload._doc, password: undefined },
      })
    )
    .catch(error => res.status(400).json({ error: handleDuplicate(error) }));
