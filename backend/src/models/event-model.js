const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "goal",
        "assist",
        "save",
        "red_card",
        "yellow_card",
        "substitution",
        "penaltyshootout",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
