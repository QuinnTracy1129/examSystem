const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    passingScore: {
      type: Number,
      default: 1,
    },
    totalScore: {
      type: Number,
      default: 1,
    },
    minutes: {
      type: Number,
      default: 5,
      required: true,
    },
    bank: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questionnaires",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.virtual("attempts", {
  ref: "Results", // Assuming "Results" is the model for exam results
  localField: "_id",
  foreignField: "exam",
  count: true, // Calculates the count of results
});

const Entity = mongoose.model("Exams", modelSchema);

module.exports = Entity;
