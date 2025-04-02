const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    group: { type: String, required: true }, // Only relevant in group stages
    teamStats: [
      {
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
          required: true,
        },
        played: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        draws: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        points: { type: Number, default: 0 },
        goalsFor: { type: Number, default: 0 },
        goalsAgainst: { type: Number, default: 0 },
        goalDifference: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", TableSchema);
