const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");
const waitingListRoutes = require("./routes/waitingListRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend läuft");
});

app.use("/patients", patientRoutes);
app.use("/waitinglist", waitingListRoutes);
app.use("/rooms", roomRoutes);

module.exports = app;