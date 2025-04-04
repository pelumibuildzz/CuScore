const { get } = require("mongoose");
const TableService = require("../services/table-service");
const tableService = new TableService();

const currentYear = process.CURRENT_YEAR;

const createTableController = async (req, res) => {
  const { group, teamList } = req.body;
  let newTable = await tableService.createTable({ group, teamList });
  if (!newTable) throw new Error("Error creating table");
  res.status(200).json({ newTable });
};

const getCurrentTablesController = async (req, res) => {
  let tableList = await tableService.getTablesByYear(currentYear);
  if (!tableList) throw new Error("Error fetching tables");
  res.status(200).json(tableList);
};

const getTableByIdController = async (req, res) => {
  let { tableId } = req.params;
  let table = await tableService.getTableById(tableId);
  if (!table) throw new Error("Error fetching table");
  res.status(200).json(table);
};

const deleteTableController = async (req, res) => {
  let { tableId } = req.params;
  let deletedTable = await tableService.deleteTable(tableId);
  if (!deletedTable) throw new Error("Error deleting table");
  res.status(200).json(deletedTable);
};

module.exports = {
  createTableController,
  getCurrentTablesController,
  getTableByIdController,
  deleteTableController,
};
