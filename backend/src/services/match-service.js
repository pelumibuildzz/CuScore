const Match = require("../models/match-model");
const mongoose = require("mongoose");

class MatchService {
  async createMatch(updateData) {
    const {
      year,
      matchDate,
      homeTeamId,
      awayTeamId,
      stage,
      group,
      starting11,
      subs,
    } = updateData;
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

  async getAllCurrentMatchesByTeam(year, teamId) {
    if (!teamId) throw new Error("TeamId is Required");
    if (!year) throw new Error("Year is Required");
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Invalid Id Format");

    let matchList = await Match.find({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      year,
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

  async updateMatch(matchId, updateData) {
    if (!matchId) throw new Error("MatchId is Required");

    if (!mongoose.Types.ObjectId.isValid(matchId))
      throw new Error("Invalid Id Format");

    const { status, group, stage, starting11, subs } = updateData;

    if (!status && !group && !stage && !starting11 && !subs)
      throw new Error("Atleast One Field is Required to Update Match");

    let newstarting11 = {};
    if (starting11.home !== undefined) newstarting11.home = starting11.home;
    if (starting11.away !== undefined) newstarting11.away = starting11.away;

    let newsubs = {};
    if (subs.home !== undefined) newsubs.home = subs.home;
    if (subs.away !== undefined) newsubs.away = subs.away;

    let updatedMatch = await Match.findByIdAndUpdate(
      matchId,
      {
        ...(stage && { stage }),
        ...(status && { status }),
        ...(group && { group }),
        starting11: newstarting11,
        subs: newsubs,
      },
      { new: true }
    );

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

module.exports = MatchService;
