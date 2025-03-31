const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.json({ msg: "Welcome To Cu-Score API! Version 1" });
});

router.use("/admin", require("./admin-route"));
router.use("/teams", require("./team-route"));

module.exports = router;
