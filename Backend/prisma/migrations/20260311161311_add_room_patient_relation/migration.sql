-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomNumber" INTEGER NOT NULL,
    "currentPatientId" INTEGER,
    CONSTRAINT "Room_currentPatientId_fkey" FOREIGN KEY ("currentPatientId") REFERENCES "Patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Room" ("currentPatientId", "id", "roomNumber") SELECT "currentPatientId", "id", "roomNumber" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "Room"("roomNumber");
CREATE UNIQUE INDEX "Room_currentPatientId_key" ON "Room"("currentPatientId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
