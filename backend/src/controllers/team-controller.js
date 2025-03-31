const TeamService = require("../services/team-service");
const teamService = new TeamService();

const createTeamController = async (req, res) => {
  const { name, logo } = req.body;
  let newTeam = teamService.createTeam({ name, logo });
  if (!newTeam) throw new Error("Error Creating Team");
  res.status(200).json(newTeam);
};

const getAllTeamsController = async (req, res) => {
  const teamList = teamService.getAllTeams;
  if (!teamList) throw new Error("Error Fetching Teams");
  res.status(200).json(teamList);
};

const getTeamByIdController = async (req, res) => {
  const { teamId } = req.params;
  const team = teamService.getTeamById(teamId);
  if (!team)
    throw new Error("Error Fetching Team. Make Sure TeamId is Correct");
  res.status(200).json(team);
};

const updatedTeamController = async (req, res) => {
  const { teamId, updateData } = req.body;
  const updatedTeam = teamService.updateTeam(teamId, updateData);
  if (!updatedTeam) throw new Error("Error Updating Team");
  res.status(200).json(updatedTeam);
};

const deleteTeamController = async (req, res) => {
  const { teamId } = req.params;
  const deletedTeam = teamService.deleteTeam(teamId);
  if (!deletedTeam) throw new Error("Error Deleting Team");
  res.status(200).json(deletedTeam);
};

module.exports = {
  createTeamController,
  getAllTeamsController,
  getTeamByIdController,
  updatedTeamController,
  deleteTeamController,
};
