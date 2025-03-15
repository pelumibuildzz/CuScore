const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    matchDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["past", "live", "future"],
      required: true,
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    stage: {
      type: String,
      enum: ["group", "round_of_16", "quarterfinal", "semifinal", "final"],
      required: true,
    },
    group: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F", "G", "H"],
      default: null,
    },
    // Store starting 11 for each team
    starting11: {
      home: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
      away: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    },
    // Store substitutes
    subs: {
      home: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
      away: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    },
    // Record match events such as goals, assists, saves, red and yellow cards
    events: [
      {
        minute: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ["goal", "assist", "save", "red_card", "yellow_card"],
          required: true,
        },
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
          required: true,
        },
        side: {
          type: String,
          enum: ["home", "away"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
