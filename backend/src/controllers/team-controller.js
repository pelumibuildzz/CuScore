const TeamService = require("../services/team-service");
const teamService = new TeamService();
const { createError } = require("../middlewares/error-handler");

const createTeamController = async (req, res, next) => {
  const { name, logo } = req.body;
  let newTeam = await teamService.createTeam({ name, logo }, next);
  if (!newTeam) throw new Error("Error Creating Team");
  res.status(200).json(newTeam);
};

const getAllTeamsController = async (req, res, next) => {
  const teamList = await teamService.getAllTeams(next);
  if (!teamList) throw new Error("Error Fetching Teams");
  res.status(200).json(teamList);
};

const getTeamByIdController = async (req, res, next) => {
  const { teamId } = req.params;
  const team = await teamService.getTeamById(teamId, next);
  if (!team)
    throw new Error("Error Fetching Team. Make Sure TeamId is Correct");
  res.status(200).json(team);
};

const updatedTeamController = async (req, res, next) => {
  const { teamId, updateData } = req.body;
  const updatedTeam = await teamService.updateTeam(teamId, updateData, next);
  if (!updatedTeam) throw new Error("Error Updating Team");
  res.status(200).json(updatedTeam);
};

const deleteTeamController = async (req, res, next) => {
  const { teamId } = req.params;
  const deletedTeam = await teamService.deleteTeam(teamId, next);
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
