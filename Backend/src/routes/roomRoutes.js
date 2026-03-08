const express = require("express");
const router = express.Router();
const { waitingList, rooms } = require("../data/store");

router.get("/", (req, res) => {
  res.json(rooms);
});

router.post("/:roomNumber/assign", (req, res) => {
  const roomNumber = Number(req.params.roomNumber);
  const { name, arrivalTime } = req.body;

  const room = rooms.find((r) => r.roomNumber === roomNumber);

  if (!room) {
    return res.status(404).json({
      message: "Raum wurde nicht gefunden."
    });
  }

  if (room.currentPatient) {
    return res.status(400).json({
      message: "Raum ist bereits belegt."
    });
  }

  const patientIndex = waitingList.findIndex(
    (patient) =>
      patient.name === name && patient.arrivalTime === arrivalTime
  );

  if (patientIndex === -1) {
    return res.status(404).json({
      message: "Patient wurde in der Warteliste nicht gefunden."
    });
  }

  const patient = waitingList.splice(patientIndex, 1)[0];
  patient.status = "im Raum";
  room.currentPatient = patient;

  res.json({
    message: `Patient wurde Raum ${roomNumber} zugewiesen.`,
    room
  });
});

router.post("/:roomNumber/finish", (req, res) => {
  const roomNumber = Number(req.params.roomNumber);

  const room = rooms.find((r) => r.roomNumber === roomNumber);

  if (!room) {
    return res.status(404).json({
      message: "Raum wurde nicht gefunden."
    });
  }

  if (!room.currentPatient) {
    return res.status(400).json({
      message: "In diesem Raum befindet sich kein Patient."
    });
  }

  room.currentPatient.status = "fertig";
  const finishedPatient = room.currentPatient;
  room.currentPatient = null;

  res.json({
    message: `Behandlung in Raum ${roomNumber} wurde beendet.`,
    patient: finishedPatient
  });
});

module.exports = router;