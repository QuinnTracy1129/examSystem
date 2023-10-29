const Entity = require("../models/Results"),
  Exams = require("../models/Exams"),
  handleQuery = require("../config/query");

exports.find = (req, res) =>
  Entity.find(handleQuery(req.query))
    .select("-__v")
    .populate("user")
    .populate("exam")
    .sort({ createdAt: -1 })
    .lean()
    .then(payload =>
      res.json({
        success: "Results Found Successfully",
        payload,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.statistics = (req, res) =>
  Exams.find(handleQuery(req.query))
    .select("-__v")
    .sort({ createdAt: -1 })
    .lean()
    .then(async exams => {
      const payload = [];

      for (const exam of exams) {
        const results = await Entity.find({ exam: exam._id })
          .populate("user")
          .select("-password")
          .sort({ createdAt: -1 })
          .lean();
        payload.push({
          ...exam,
          results,
        });
      }

      res.json({
        success: "Results Found Successfully",
        payload,
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.save = ({ body }, res) =>
  Entity.create(body)
    .then(item =>
      Entity.findById(item._id)
        .select("-__v")
        .populate("user")
        .populate("exam")
        .then(payload =>
          res.status(201).json({
            success: "Result Created Successfully",
            payload,
          })
        )
    )
    .catch(error => res.status(400).json({ error: error.message }));
