const MatchService = require("../services/match-service");
const matchService = new MatchService();
const EventService = require("../services/event-service");
const eventService = new EventService();
const TableService = require("../services/table-service");
const tableService = new TableService();
const { createError } = require("../middlewares/error-handler");

const dotenv = require("dotenv");
dotenv.config();
const currentYear = process.CURRENT_YEAR;

const createMatchController = async (req, res) => {
  const { matchDate, homeTeamId, awayTeamId, stage, group, starting11, subs } =
    req.body;
  let newMatch = await matchService.createMatch({
    year: currentYear,
    matchDate,
    homeTeamId,
    awayTeamId,
    stage,
    group,
    starting11,
    subs,
  });
  if (!newMatch) return next(createError("Error creating match", 500));
  res.status(200).json(newMatch);
};

const getAllMatchesByYearController = async (req, res) => {
  const { year } = req.params;
  let matchList = await matchService.getAllMatchesByYear(year);
  if (!matchList) return next(createError("Error fetching matches", 500));
  res.status(200).json(matchList);
};

const getAllMatchesController = async (req, res) => {
  let matchList = await matchService.getAllMatches();
  if (!matchList) return next(createError("Error fetching matches", 500));
  res.status(200).json(matchList);
};

const getMatchByIdController = async (req, res) => {
  let { matchId } = req.params;
  let match = await matchService.getMatchById(matchId);
  if (!match) return next(createError("Error fetching matches", 500));
  return match;
};

const updateMatchController = async (req, res) => {
  let { matchId } = req.params;
  let { updateData } = req.body;
  let updatedMatch = await matchService.updateMatch(matchId, updateData);
  if (!updatedMatch) return next(createError("Error Updating Match", 500));

  let tableId;
  let matchData = {};

  if (updateData.status == "fulltime") {
    let { homeTeamId, awayTeamId } = updatedMatch;

    let table = await tableService.getTableByTeam(homeTeamId);
    if (!table) return next(createError("Error fetching table", 500));

    tableId = table._id;

    let eventList = await eventService.getEventsByMatch(matchId);
    if (!eventList) return next(createError("Error fetching events", 500));
    let homescore = 0,
      awayscore = 0;

    eventList.map((event) => {
      if (event.type == "goal") {
        if (event.teamId == homeTeamId) {
          homescore++;
        } else if (event.teamId == awayTeamId) {
          awayscore++;
        }
      }
    });

    matchData.homeId = homeTeamId;
    matchData.awayId = awayTeamId;
    matchData.homeScore = homescore;
    matchData.awayScore = awayscore;
  }

  let updatedTable = tableService.updateTableStats(tableId, matchData);
  if (!updatedTable) return next(createError("Error Updating table", 500));

  res.status(200).json(updatedMatch);
};

const deleteMatchController = async (req, res) => {
  let { matchId } = req.params;
  let deletedMatchMsg = await matchService.deleteMatch(matchId);
  if (!deletedMatchMsg) return next(createError("Error deleting Match", 500));
  res.status(200).json({ deletedMatchMsg });
};

module.exports = {
  createMatchController,
  getAllMatchesByYearController,
  getAllMatchesController,
  getMatchByIdController,
  updateMatchController,
  deleteMatchController,
};
