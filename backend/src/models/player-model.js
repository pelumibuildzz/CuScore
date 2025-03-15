const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: ["attacker", "defender", "midfielder", "goalkeeper"],
      required: true,
    },
    jerseyNumber: {
      type: Number,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);
