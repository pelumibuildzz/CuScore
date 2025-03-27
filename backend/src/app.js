const express = require("express");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ msg: "Welcome To Cu-Score API!" });
});

app.use("/api/v1", require("./v1"));

module.exports = app;

//Status Code Verification and Correction Later
