const Match = require("../models/match-model");
const mongoose = require("mongoose");

class MatchService {
  async createMatch(matchData) {
    const {
      year,
      matchDate,
      homeTeamId,
      awayTeamId,
      stage,
      group,
      starting11,
      subs,
    } = matchData;
    if (!year || !matchDate || !homeTeamId || !awayTeamId || !stage)
      throw new Error("All fields are required");
    if (
      !mongoose.Types.ObjectId.isValid(homeTeamId) ||
      !mongoose.Types.ObjectId.isValid(awayTeamId)
    )
      throw new Error("Invalid Id Format");
    if (stage == "group" && !group)
      throw new Error("Group is required for group stage matches");
    if (starting11.home.length != 11 || starting11.away.length != 11)
      throw new Error(
        "Starting 11 must contain exactly 11 players for each team"
      );
    const newMatch = new Match({
      year,
      matchDate,
      homeTeamId,
      awayTeamId,
      stage,
      group,
      starting11,
      subs,
    });
    if (!newMatch) throw new Error("Error creating match");
    await newMatch.save();
    return newMatch;
  }

  async getAllMatches() {
    let matchList = await Match.find({}).sort({ matchDate: 1 });
    if (!matchList && matchList != [])
      throw new Error("Error fetching matches");
    return matchList;
  }

  async getAllMatchesByYear(year) {
    let matchList = await Match.find({ year }).sort({ matchDate: 1 });
    if (!matchList && matchList != [])
      throw new Error("Error fetching matches");
    return matchList;
  }

  async getAllMatchesByTeam(teamId) {
    if (!teamId) throw new Error("TeamId is Required");
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Invalid Id Format");

    let matchList = await Match.find({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
    }).sort({ matchDate: 1 });
    if (!matchList && matchList != [])
      throw new Error("Error fetching matches");
    return matchList;
  }

  async getMatchById(matchId) {
    if (!matchId) throw new Error("MatchId is Required");
    if (!mongoose.Types.ObjectId.isValid(matchId))
      throw new Error("Invalid Id Format");

    let match = await Match.findById(matchId);
    if (!match) throw new Error("Error fetching match or match doesn't exist");
    return match;
  }

  async updateMatch(matchId, matchData) {
    if (!matchId) throw new Error("MatchId is Required");
    if (!mongoose.Types.ObjectId.isValid(matchId))
      throw new Error("Invalid Id Format");
    const { status, group, stage } = matchData;
    if (!status && !group && !stage)
      throw new Error("Atleast One Field is Required to Update Match");
    let updatedMatch = await Match.findByIdAndUpdate(matchId, {
      stage,
      status,
      group,
    });
    if (!updatedMatch) throw new Error("Error Updating Match");
    return updatedMatch;
  }

  async deleteMatch(matchId) {
    if (!matchId) throw new Error("MatchId is Required");
    if (!mongoose.Types.ObjectId.isValid(matchId))
      throw new Error("Invalid Id Format");
    let deletedMatch = await Match.findByIdAndDelete(matchId);
    if (!deletedMatch) throw new Error("Error deleting Match");
    return { msg: "Match Successfully Deleted" };
  }
}
