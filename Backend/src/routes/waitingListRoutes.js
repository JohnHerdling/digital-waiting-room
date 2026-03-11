const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// Warteliste anzeigen = alle Patienten mit Status "wartend"
router.get("/", async (req, res) => {
    try {
        const waitingPatients = await prisma.patient.findMany({
            where: {
                status: "wartend"
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        res.json(waitingPatients);
    } catch (error) {
        console.error("WAITINGLIST GET FEHLER:", error);
        res.status(500).json({ error: "Fehler beim Laden der Warteliste." });
    }
});

module.exports = router;