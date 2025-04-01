const PlayerService = require("../services/player-service");
const playerService = new PlayerService();

const createPlayerController = async (req, res) => {
  const { name, position, jerseyNumber, teamId } = req.body;
  let newPlayer = await playerService.createPlayer({
    name,
    position,
    jerseyNumber,
    teamId,
  });
  if (!newPlayer) throw new Error("Error Creating Player");
  res.status(200).json(newPlayer);
};

const getAllPlayersController = async (req, res) => {
  let players = await playerService.getAllPlayers();
  if (!players) throw new Error("Error Fetching Players");
  res.status(200).json(players);
};

const getPlayerByIdController = async (req, res) => {
  const { playerId } = req.params;
  let player = await playerService.getPlayerById(playerId);
  if (!player) throw new Error("Error Fetching Player");
  res.status(200).json(player);
};

const getPlayerByTeamIdController = async (req, res) => {
  const { teamId } = req.params;
  let players = await playerService.getPlayerByTeamId(teamId);
  if (!players) throw new Error("Error Fetching Players");
  res.status(200).json(players);
};

const updatePlayerController = async (req, res) => {
  const { playerId, updateData } = req.body;
  let updatedPlayer = await playerService.updatePlayer(playerId, updateData);
  if (!updatedPlayer) throw new Error("Error Updating Player");
  res.status(200).json(updatedPlayer);
};

const deletePlayerController = async (req, res) => {
  const { playerId } = req.params;
  let deletedPlayer = await playerService.deletePlayer(playerId);
  if (!deletedPlayer) throw new Error("Error Deleting Player");
  res.status(200).json(deletedPlayer);
};

module.exports = {
  getAllPlayersController,
  createPlayerController,
  getPlayerByIdController,
  getPlayerByTeamIdController,
  updatePlayerController,
  deletePlayerController,
};
