const PlayerService = require("../services/player-service");
const playerService = new PlayerService();
const { createError } = require("../middlewares/error-handler");

const createPlayerController = async (req, res, next) => {
  try {
    const { name, position, jerseyNumber, teamId } = req.body;
    let newPlayer = await playerService.createPlayer(
      {
        name,
        position,
        jerseyNumber,
        teamId,
      },
      next
    );
    if (!newPlayer) return next(createError("Error Creating User", 500));
    res.status(200).json(newPlayer);
  } catch (error) {
    next(error);
  }
};

const getAllPlayersController = async (req, res, next) => {
  try {
    let players = await playerService.getAllPlayers(next);
    if (!players) return next(createError("Error Fetching Player", 500));
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

const getPlayerByIdController = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    let player = await playerService.getPlayerById(playerId, next);
    if (!player) return next(createError("Error Fetching Player", 500));
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
};

const getPlayerByTeamIdController = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    let players = await playerService.getPlayerByTeamId(teamId, next);
    if (!players) return next(createError("Error Fetching Player", 500));
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

const updatePlayerController = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const { updateData } = req.body;
    let updatedPlayer = await playerService.updatePlayer(
      playerId,
      updateData,
      next
    );
    if (!updatedPlayer) return next(createError("Error Updating Player", 500));
    res.status(200).json(updatedPlayer);
  } catch (error) {
    next(error);
  }
};

const deletePlayerController = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    let deletedPlayer = await playerService.deletePlayer(playerId, next);
    if (!deletedPlayer) return next(createError("Error Deleting Player", 500));
    res.status(200).json(deletedPlayer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlayersController,
  createPlayerController,
  getPlayerByIdController,
  getPlayerByTeamIdController,
  updatePlayerController,
  deletePlayerController,
};
