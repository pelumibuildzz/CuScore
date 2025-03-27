const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.json({ msg: "Welcome To Cu-Score API! Version 1" });
});

module.exports = router;
