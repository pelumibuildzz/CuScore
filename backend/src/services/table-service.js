const Table = require("../models/table-model");
const mongoose = require("mongoose");

const TEAM_PER_GROUP = 4;

class TableService {
  async createTable(data) {
    const { group, teamList } = data;

    if (!group || !teamList)
      throw new Error("All fields are Required: group and teamId List");
    if (teamList.length != TEAM_PER_GROUP)
      throw new Error(`Number of teams in list should be ${TEAM_PER_GROUP}`);

    const newTable = new Table({
      year,
      group,
      teamStats: teamList,
    });

    if (!newTable) throw new Error("Erro Creating Table");
    await newTable.save();
    return newTable;
  }

  async getTableByTeam(teamId) {
    if (!teamId) throw new Error("TeamId is Required");
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Invalid Id Format");
    let table = await Table.findOne({ "teamStats.teamId": teamId });
    if (!table) throw new Error("Error Finding Table");
    return table;
  }

  async getTablesByYear(year) {
    let tableList = await Table.find({ year });
    if (!tableList && tableList != []) throw new Error("Error Finding tables");
    return tableList;
  }

  async getTableById(tableId) {
    if (!tableId) throw new Error("Id is Required");
    if (!mongoose.Types.ObjectId.isValid(tableId))
      throw new Error("Invalid Id format");

    let table = await Table.findById(tableId);
    if (!table) throw new Error("Erro Finding Table");
    return table;
  }

  async updateTableStats(tableId, matchData) {
    if (!tableId) throw new Error("Id is Required");
    if (!mongoose.Types.ObjectId.isValid(tableId))
      throw new Error("Invalid Id format");

    let { homeId, awayId, homeScore, awayScore } = matchData;
    if (!homeId || !awayId || homeScore == null || awayScore == null)
      throw new Error(
        "MatchData should have: homeId, awayId, homeScore, awayScore"
      );

    let table = await Table.findById(tableId);
    if (!table) throw new Error("Table not found");

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

  async deleteTable(tableId) {
    if (!tableId) throw new Error("Id is Required");
    if (!mongoose.Types.ObjectId.isValid(tableId))
      throw new Error("Invalid Id format");
    let deletedTable = await Table.findByIdAndDelete(tableId);
    if (!deletedTable) throw new Error("Error delteing Table");
    return { msg: "Table Successfully Deleted" };
  }
}

module.exports = TableService;
