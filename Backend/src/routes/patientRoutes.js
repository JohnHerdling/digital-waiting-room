const express = require("express");
const router = express.Router();
const { waitingList } = require("../data/store");

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Patientenname ist erforderlich."
    });
  }

  const newPatient = {
    name: name.trim(),
    arrivalTime: getCurrentTime(),
    status: "wartet"
  };

  waitingList.push(newPatient);

  res.status(201).json({
    message: "Patient wurde registriert und zur Warteliste hinzugefügt.",
    patient: newPatient
  });
});

module.exports = router;