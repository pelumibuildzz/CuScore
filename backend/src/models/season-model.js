const mongoose = require("mongoose");

const SeasonSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    name: { type: String, required: true }, // e.g., "2025 University Cup"
    startDate: { type: Date },
    endDate: { type: Date },
    // Additional metadata as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Season", SeasonSchema);
