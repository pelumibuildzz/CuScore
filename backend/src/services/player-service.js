const Player = require("../models/player-model");

class PlayerService {
  async createPlayer(playerData) {
    const { name, position, jerseyNumber, teamId } = playerData;
    if ((!name || !position, !jerseyNumber, !teamId))
      throw new Error(
        "All Fields Are Required. (name, position, jerseyNumber, teamId"
      );
    const newPlayer = new Player({
      name,
      position,
      jerseyNumber,
      teamId,
    });
    if (!newPlayer) throw new Error("Error Creating User");
    await newPlayer.save();
    return newPlayer;
  }

  async getAllPlayers() {
    let playerList = await Player.find({});
    if (!playerList && playerList != [])
      throw new Error("Error Fetching Player");
    return playerList;
  }

  async getPlayerById(playerId) {
    if (!playerId) throw new Error("PlayerId is Required");
    let player = await Player.findById(playerId);
    if (!player)
      throw new Error("Erro fetching player or player doesn't exsist");
    return player;
  }

  async updatePlayer(playerId, playerData) {
    const { name, position, jerseyNumber, teamId } = playerData;
    if (!playerId) throw new Error("PlayerId is Required");
    if (!name && !position && !jerseyNumber && !teamId)
      throw new Error("Atleast One Field is Required to Update Player");
    let player = await Player.findByIdAndUpdate(playerId, {
      name,
      position,
      jerseyNumber,
      teamId,
    });
    if (!player) throw new Error("Error Updating Player");
    return player;
  }
}
