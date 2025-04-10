const TableService = require("../services/table-service");
const tableService = new TableService();
const { createError } = require("../middlewares/error-handler");

const currentYear = process.CURRENT_YEAR;

const createTableController = async (req, res) => {
  const { group, teamList } = req.body;
  let newTable = await tableService.createTable({ group, teamList });
  if (!newTable) return next(createError("Erro Creating Table", 500));
  res.status(200).json({ newTable });
};

const getCurrentTablesController = async (req, res) => {
  let tableList = await tableService.getTablesByYear(currentYear);
  if (!tableList) return next(createError("Error fetching tables", 500));
  res.status(200).json(tableList);
};

const getTableByIdController = async (req, res) => {
  let { tableId } = req.params;
  let table = await tableService.getTableById(tableId);
  if (!table) return next(createError("Error fetching tables", 500));
  res.status(200).json(table);
};

const updateTableController = async (req, res) => {
  let { tableId } = req.params;
  let { matchData } = req.body;
  let updatedTable = await tableService.updateTableStats(tableId, matchData);
  if (!updatedTable)
    return next(createError("Error updating table stats", 500));
  res.status(200).json(updatedTable);
};

const deleteTableController = async (req, res) => {
  let { tableId } = req.params;
  let deletedTable = await tableService.deleteTable(tableId);
  if (!deletedTable) return next(createError("Error delteing Table", 500));
  res.status(200).json(deletedTable);
};

module.exports = {
  createTableController,
  getCurrentTablesController,
  getTableByIdController,
  deleteTableController,
  updateTableController,
};
