const Table = require("../models/table-model");
const mongoose = require("mongoose");
const { createError } = require("../middlewares/error-handler");

const TEAM_PER_GROUP = 4;

class TableService {
  async createTable(data, next) {
    const { group, teamList } = data;

    if (!group || !teamList)
      return next(
        createError("All fields are Required: group and teamId List", 400)
      );
    if (teamList.length != TEAM_PER_GROUP)
      return next(
        createError(`Number of teams in list should be ${TEAM_PER_GROUP}`, 400)
      );

    const newTable = new Table({
      year,
      group,
      teamStats: teamList,
    });

    if (!newTable) return next(createError("Erro Creating Table", 500));
    await newTable.save();
    return newTable;
  }

  async getTableByTeam(teamId, next) {
    if (!teamId) return next(createError("TeamId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));
    let table = await Table.findOne({ "teamStats.teamId": teamId });
    if (!table) return next(createError("Error Finding Table", 404));
    return table;
  }

  async getTablesByYear(year, next) {
    let tableList = await Table.find({ year });
    if (!tableList && tableList != [])
      return next(createError("Error Finding tables", 404));
    return tableList;
  }

  async getTableById(tableId, next) {
    if (!tableId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(tableId))
      return next(createError("Invalid Id format", 400));

    let table = await Table.findById(tableId);
    if (!table) return next(createError("Error Finding Table", 404));
    return table;
  }

  async updateTableStats(tableId, matchData, next) {
    if (!tableId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(tableId))
      return next(createError("Invalid Id format", 400));

    let { homeId, awayId, homeScore, awayScore } = matchData;
    if (!homeId || !awayId || homeScore == null || awayScore == null)
      return next(
        createError(
          "MatchData should have: homeId, awayId, homeScore, awayScore",
          400
        )
      );

    let table = await Table.findById(tableId);
    if (!table) return next(createError("Error updating table", 404));

    table.teamStats = table.teamStats.map((team) => {
      if (team.teamId.toString() === homeId) {
        team.played += 1;
        team.goalsFor += homeScore;
        team.goalsAgainst += awayScore;
        team.goalDifference += homeScore - awayScore;
        if (homeScore > awayScore) {
          team.wins += 1;
          team.points += 3;
        } else if (homeScore === awayScore) {
          team.draws += 1;
          team.points += 1;
        } else {
          team.losses += 1;
        }
      } else if (team.teamId.toString() === awayId) {
        team.played += 1;
        team.goalsFor += awayScore;
        team.goalsAgainst += homeScore;
        team.goalDifference += awayScore - homeScore;
        if (awayScore > homeScore) {
          team.wins += 1;
          team.points += 3;
        } else if (homeScore === awayScore) {
          team.draws += 1;
          team.points += 1;
        } else {
          team.losses += 1;
        }
      }
      return team;
    });

    await table.save();
    return table;
  }

  async deleteTable(tableId, next) {
    if (!tableId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(tableId))
      return next(createError("Invalid Id format", 400));
    let deletedTable = await Table.findByIdAndDelete(tableId);
    if (!deletedTable) return next(createError("Error delteing Table", 500));
    return { msg: "Table Successfully Deleted" };
  }
}

module.exports = TableService;
