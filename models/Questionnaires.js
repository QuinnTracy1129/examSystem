const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ["qna", "mc", "enum", "match"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
    choices: {
      type: Array,
      default: [],
    },
    answer: {
      type: mongoose.Schema.Types.Mixed,
    },
    difficulty: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Questionnaires", modelSchema);

module.exports = Entity;
