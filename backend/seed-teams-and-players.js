const mongoose = require("mongoose");
const Team = require("./src/models/team-model");
const Player = require("./src/models/player-model");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const teams = [
  { name: "Team A", logo: "logoA.png" },
  { name: "Team B", logo: "logoB.png" },
  { name: "Team C", logo: "logoC.png" },
  { name: "Team D", logo: "logoD.png" },
  { name: "Team E", logo: "logoE.png" },
  { name: "Team F", logo: "logoF.png" },
  { name: "Team G", logo: "logoG.png" },
  { name: "Team H", logo: "logoH.png" },
];

const createPlayersForTeam = (teamId) => {
  const positions = ["attacker", "midfielder", "defender", "goalkeeper"];
  const players = [];
  for (let i = 1; i <= 11; i++) {
    players.push({
      name: `Player ${i}`,
      position: positions[i % 4],
      jerseyNumber: i,
      teamId,
    });
  }
  return players;
};

const seedTeamsAndPlayers = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log("Connected to the database");

    for (const team of teams) {
      const newTeam = new Team(team);
      const savedTeam = await newTeam.save();
      console.log(`Team ${team.name} created`);

      const players = createPlayersForTeam(savedTeam._id);
      await Player.insertMany(players);
      console.log(`11 players added for ${team.name}`);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding teams and players:", error);
    mongoose.connection.close();
  }
};

seedTeamsAndPlayers();
