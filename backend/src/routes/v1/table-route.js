const express = require("express");
const { authenticateUserwebtoken } = require("../../middlewares/auth-webtoken");
const {
  createTableController,
  getCurrentTablesController,
  getTableByIdController,
  deleteTableController,
  updateTableController,
} = require("../../controllers/table-controller");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", authenticateUserwebtoken, createTableController);
router.get("/", getCurrentTablesController);
router.get("/:tableId", getTableByIdController);
router.put("/:tableId", authenticateUserwebtoken, updateTableController);
router.delete("/:tableId", authenticateUserwebtoken, deleteTableController);

module.exports = router;
