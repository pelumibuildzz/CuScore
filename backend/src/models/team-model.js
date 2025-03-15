const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
      unique: true,
    },
    // Optionally add other fields like coach, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
