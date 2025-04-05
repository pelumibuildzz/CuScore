const Match = require("../models/match-model");
const mongoose = require("mongoose");
const { createError } = require("../middlewares/error-handler");

class MatchService {
  async createMatch(data, next) {
    const {
      year,
      matchDate,
      homeTeamId,
      awayTeamId,
      stage,
      group,
      starting11,
      subs,
    } = data;
    if (!year || !matchDate || !homeTeamId || !awayTeamId || !stage)
      return next(createError("All fields are required", 400));
    if (
      !mongoose.Types.ObjectId.isValid(homeTeamId) ||
      !mongoose.Types.ObjectId.isValid(awayTeamId)
    )
      return next(createError("Invalid Id Format", 400));
    if (stage == "group" && !group)
      return next(
        createError("Group is required for group stage matches", 400)
      );
    if (starting11.home.length != 11 || starting11.away.length != 11)
      return next(
        createError(
          "Starting 11 must contain exactly 11 players for each team",
          400
        )
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
    if (!newMatch) return next(createError("Error creating match", 500));
    await newMatch.save();
    return newMatch;
  }

  async getAllMatches(next) {
    let matchList = await Match.find({}).sort({ matchDate: 1 });
    if (!matchList && matchList != [])
      return next(createError("Error fetching matches", 404));
    return matchList;
  }

  async getAllMatchesByYear(year, next) {
    let matchList = await Match.find({ year }).sort({ matchDate: 1 });
    if (!matchList && matchList != [])
      return next(createError("Error fetching matches", 404));
    return matchList;
  }

  async getAllMatchesByTeam(teamId, next) {
    if (!teamId) return next(createError("TeamId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));

    let matchList = await Match.find({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
    }).sort({ matchDate: 1 });
    if (!matchList && matchList != [])
      return next(createError("Error fetching matches", 404));
    return matchList;
  }

  async getAllCurrentMatchesByTeam(year, teamId, next) {
    if (!teamId) return next(createError("TeamId is Required", 400));
    if (!year) return next(createError("Year is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));

    let matchList = await Match.find({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      year,
    }).sort({ matchDate: 1 });
    if (!matchList && matchList != [])
      return next(createError("Error fetching matches", 404));
    return matchList;
  }

  async getMatchById(matchId, next) {
    if (!matchId) return next(createError("MatchId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(matchId))
      return next(createError("Invalid Id Format", 400));

    let match = await Match.findById(matchId);
    if (!match)
      return next(
        createError("Error fetching match or match doesn't exist", 404)
      );
    return match;
  }

  async updateMatch(matchId, updateData, next) {
    if (!matchId) return next(createError("MatchId is Required", 400));

    if (!mongoose.Types.ObjectId.isValid(matchId))
      return next(createError("Invalid Id Format", 400));

    const { status, group, stage, starting11, subs } = updateData;

    if (!status && !group && !stage && !starting11 && !subs)
      return next(
        createError("Atleast One Field is Required to Update Match", 400)
      );

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

    if (!updatedMatch) return next(createError("Error Updating Match", 500));
    return updatedMatch;
  }

  async deleteMatch(matchId, next) {
    if (!matchId) return next(createError("MatchId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(matchId))
      return next(createError("Invalid Id Format", 400));
    let deletedMatch = await Match.findByIdAndDelete(matchId);
    if (!deletedMatch) return next(createError("Error deleting Match", 500));
    return { msg: "Match Successfully Deleted" };
  }
}

module.exports = MatchService;
