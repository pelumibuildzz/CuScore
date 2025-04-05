const express = require("express");
const { errorHandler } = require("./middlewares/error-handler");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ msg: "Welcome To Cu-Score API!" });
});

app.use("/api/v1", require("./v1"));

app.use(errorHandler);

module.exports = app;

//Status Code Verification and Correction Later
