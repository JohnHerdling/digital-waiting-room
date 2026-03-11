const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// Alle Patienten abrufen
router.get("/", async (req, res) => {
    try {
        const patients = await prisma.patient.findMany();
        res.json(patients);
    }  catch (error) {
    console.error("GET FEHLER:", error);
    res.status(500).json({ error: "Fehler beim Erstellen des Patienten." });
    }
});

// Neuen Patienten anlegen
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name ist erforderlich." });
        }

        const patient = await prisma.patient.create({
            data: {
                name: name,
                status: "wartend"
            }
        });

        res.status(201).json(patient);
    } catch (error) {
    console.error("POST-FEHLER:", error);
    res.status(500).json({ error: "Fehler beim Erstellen des Patienten." });
    }
});

module.exports = router;