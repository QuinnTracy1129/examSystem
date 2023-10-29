const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
    },
    score: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      required: true,
    },
    bank: [
      {
        reference: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Questionnaires",
        },
        // save static information so it wont get affected by Questionnaire update
        question: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: mongoose.Schema.Types.Mixed,
        },
        answer: {
          type: mongoose.Schema.Types.Mixed,
        },
        choices: {
          type: Array,
        },
        difficulty: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      default: "disqualified",
      enum: {
        values: ["completed", "disqualified", "timed out"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Results", modelSchema);

module.exports = Entity;
