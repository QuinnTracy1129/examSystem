const Entity = require("../models/Questionnaires"),
  bulkWrite = require("../config/bulkWrite"),
  handleQuery = require("../config/query");

exports.find = ({ query }, res) =>
  Entity.find(handleQuery(query))
    .select("-__v")
    .populate("createdBy")
    .sort({ createdAt: -1 })
    .lean()
    .then(payload =>
      res.json({
        success: "Questionnaires Found Successfully",
        payload,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.save = ({ body }, res) =>
  Entity.create(body)
    .then(item =>
      Entity.findById(item._id)
        .select("-__v")
        .populate("createdBy")
        .lean()
        .then(payload =>
          res.status(201).json({
            success: "Questionnaire Created Successfully",
            payload,
          })
        )
        .catch(error => res.status(400).json({ error: error.message }))
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.update = ({ body }, res) =>
  Entity.findByIdAndUpdate(body._id, body, {
    new: true,
  })
    .populate("createdBy")
    .select("-__v")
    .then(payload => {
      if (payload)
        return res.json({
          success: "Questionnaire Update Successfully",
          payload,
        });

      res.status(404).json({
        error: "ID Not Found",
        message: "The provided ID does not exist.",
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.destroy = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(
      req,
      res,
      Entity,
      "Multiple Questionnaires Deleted Successfully",
      "deleteOne"
    );
  } else {
    Entity.findByIdAndDelete(req.body._id)
      .select("-__v")
      .then(payload => {
        if (payload)
          return res.json({
            success: "Questionnaire Deleted Successfully",
            payload,
          });

        res.status(404).json({
          error: "ID Not Found",
          message: "The provided ID does not exist.",
        });
      })
      .catch(error => res.status(400).json({ error: error.message }));
  }
};
