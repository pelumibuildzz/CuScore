const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    matchDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["past", "live", "future"],
      default: "future",
    },
    homeTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    awayTeamId: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
