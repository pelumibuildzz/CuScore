const express = require("express");
const {
  registerAdminController,
  loginAdminController,
} = require("../../controllers/adminController");
const router = express.Router();

router.use(express.json);
router.use(express.urlencoded({ extended: true }));

router.post("/register", registerAdminController);
router.post("/login", loginAdminController);

module.exports = router;
