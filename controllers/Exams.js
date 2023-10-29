const Entity = require("../models/Exams"),
  bulkWrite = require("../config/bulkWrite"),
  handleQuery = require("../config/query");

exports.find = ({ query }, res) =>
  Entity.find(handleQuery(query))
    .select("-__v")
    .populate("createdBy")
    .populate("bank")
    .populate("attempts")
    .sort({ createdAt: -1 })
    .lean()
    .then(payload =>
      res.json({
        success: "Exams Found Successfully",
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
        .populate("bank")
        .lean()
        .then(payload =>
          res.status(201).json({
            success: "Exam Created Successfully",
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
    .populate("bank")
    .select("-__v")
    .then(payload => {
      if (payload)
        return res.json({
          success: "Exam Update Successfully",
          payload,
        });

      res.status(404).json({
        error: "ID Not Found",
        message: "The provided ID does not exist.",
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.destroy = (req, res) => {
  console.log(req.body);
  if (Array.isArray(req.body)) {
    bulkWrite(
      req,
      res,
      Entity,
      "Multiple Exams Deleted Successfully",
      "deleteOne"
    );
  } else {
    Entity.findByIdAndDelete(req.body._id)
      .select("-__v")
      .then(payload => {
        if (payload)
          return res.json({
            success: "Exam Deleted Successfully",
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
