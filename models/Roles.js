const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: {
        values: ["Administrator", "Moderator", "Candidate"],
        message: "{VALUE} is not supported, please select appropriate options",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Roles", modelSchema);

module.exports = Entity;
