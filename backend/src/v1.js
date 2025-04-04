const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.json({ msg: "Welcome To Cu-Score API! Version 1" });
});

router.use("/admin", require("./routes/v1/admin-route"));
router.use("/teams", require("./routes/v1/team-route"));
router.use("/players", require("./routes/v1/player-route"));
router.use("/matches", require("./routes/v1/match-route"));
router.use("/events", require("./routes/v1/event-route"));
router.use("/tables", require("./routes/v1/table-route"));

module.exports = router;
