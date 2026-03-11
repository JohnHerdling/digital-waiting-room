const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// Alle Räume abrufen
router.get("/", async (req, res) => {
    try {
        const rooms = await prisma.room.findMany({
            orderBy: {
                roomNumber: "asc"
            },
            include: {
                currentPatient: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        createdAt: true
                    }
                }
            }
        });

        res.json(rooms);

    } catch (error) {
        console.error("ROOM GET FEHLER:", error);
        res.status(500).json({ error: "Fehler beim Laden der Räume." });
    }
});

// Neuen Raum anlegen
router.post("/", async (req, res) => {
    try {
        const { roomNumber } = req.body;

        if (!roomNumber) {
            return res.status(400).json({ error: "Raumnummer ist erforderlich." });
        }

        const room = await prisma.room.create({
            data: {
                roomNumber: roomNumber,
                currentPatientId: null
            }
        });

        res.status(201).json(room);
    } catch (error) {
        console.error("ROOM POST FEHLER:", error);
        res.status(500).json({ error: "Fehler beim Erstellen des Raums." });
    }
});

// Nächsten wartenden Patienten dem ersten freien Raum zuweisen
router.post("/assign-next", async (req, res) => {
    try {
        // 1. freien Raum suchen
        const freeRoom = await prisma.room.findFirst({
            where: {
                currentPatientId: null
            },
            orderBy: {
                roomNumber: "asc"
            }
        });

        if (!freeRoom) {
            return res.status(400).json({ error: "Kein freier Raum verfügbar." });
        }

        // 2. nächsten wartenden Patienten suchen
        const nextPatient = await prisma.patient.findFirst({
            where: {
                status: "wartend"
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        if (!nextPatient) {
            return res.status(400).json({ error: "Kein wartender Patient vorhanden." });
        }

        // 3. Raum aktualisieren
        const updatedRoom = await prisma.room.update({
            where: {
                id: freeRoom.id
            },
            data: {
                currentPatientId: nextPatient.id
            }
        });

        // 4. Patientenstatus ändern
        const updatedPatient = await prisma.patient.update({
            where: {
                id: nextPatient.id
            },
            data: {
                status: "im Raum"
            }
        });

        res.json({
            message: "Patient wurde einem Raum zugewiesen.",
            room: updatedRoom,
            patient: updatedPatient
        });
    } catch (error) {
        console.error("ASSIGN NEXT FEHLER:", error);
        res.status(500).json({ error: "Fehler bei der Raumzuweisung." });
    }
});

// Behandlung in einem Raum beenden
router.post("/:id/finish", async (req, res) => {
    try {
        const roomId = parseInt(req.params.id);

        // 1. Raum laden
        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });

        if (!room) {
            return res.status(404).json({ error: "Raum nicht gefunden." });
        }

        // 2. Prüfen, ob überhaupt ein Patient im Raum ist
        if (!room.currentPatientId) {
            return res.status(400).json({ error: "In diesem Raum befindet sich kein Patient." });
        }

        const patientId = room.currentPatientId;

        // 3. Patient auf "fertig" setzen
        const updatedPatient = await prisma.patient.update({
            where: {
                id: patientId
            },
            data: {
                status: "fertig"
            }
        });

        // 4. Raum wieder freigeben
        const updatedRoom = await prisma.room.update({
            where: {
                id: roomId
            },
            data: {
                currentPatientId: null
            }
        });

        res.json({
            message: "Behandlung erfolgreich beendet.",
            room: updatedRoom,
            patient: updatedPatient
        });
    } catch (error) {
        console.error("FINISH FEHLER:", error);
        res.status(500).json({ error: "Fehler beim Beenden der Behandlung." });
    }
});

module.exports = router;