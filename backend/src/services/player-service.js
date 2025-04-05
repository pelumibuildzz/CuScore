const Player = require("../models/player-model");
const mongoose = require("mongoose");
const { createError } = require("../middlewares/error-handler");

class PlayerService {
  async createPlayer(playerData, next) {
    const { name, position, jerseyNumber, teamId } = playerData;
    if ((!name || !position, !jerseyNumber, !teamId))
      return next(
        createError(
          "All Fields Are Required. (name, position, jerseyNumber, teamId",
          400
        )
      );
    const newPlayer = new Player({
      name,
      position,
      jerseyNumber,
      teamId,
    });
    if (!newPlayer) return next(createError("Error Creating User", 500));
    await newPlayer.save();
    return newPlayer;
  }

  async getAllPlayers(next) {
    let playerList = await Player.find({}).sort({ teamId: 1 });
    if (!playerList && playerList != [])
      return next(createError("Error Fetching Player", 404));
    return playerList;
  }

  async getPlayerById(playerId, next) {
    if (!playerId) return next(createError("PlayerId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(playerId))
      return next(createError("Invalid Id Format", 400));
    let player = await Player.findById(playerId);
    if (!player)
      return next(
        createError("Erro fetching player or player doesn't exsist", 404)
      );
    return player;
  }

  async getPlayerByTeamId(teamId, next) {
    if (!teamId) return next(createError("Team Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));

    let players = await Player.find({ teamId: teamId });
    if (!players && players != [])
      return next(
        createError("Error Fetching Players or No Players Found", 404)
      );
    return players;
  }

  async updatePlayer(playerId, playerData, next) {
    const { name, position, jerseyNumber, teamId } = playerData;
    if (!playerId) return next(createError("PlayerId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(playerId))
      return next(createError("Invalid Id Format", 400));

    if (!name && !position && !jerseyNumber && !teamId)
      return next(
        createError("Atleast One Field is Required to Update Player", 400)
      );
    let player = await Player.findByIdAndUpdate(
      playerId,
      {
        ...(name && { name }),
        ...(position && { position }),
        ...(jerseyNumber && { jerseyNumber }),
        ...(teamId && { teamId }),
      },
      { new: true }
    );
    if (!player) return next(createError("Error Updating Player", 500));
    return player;
  }

  async deletePlayer(playerId, next) {
    if (!playerId) return next(createError("PlayerId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(playerId))
      return next(createError("Invalid Id Format", 400));
    let player = await Player.findByIdAndDelete(playerId);
    if (!player) return next(createError("Error Deleting Player", 500));
    return { msg: "Player Deleted Successfully" };
  }
}

module.exports = PlayerService;
