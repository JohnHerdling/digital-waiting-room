require("dotenv").config();

const app = require("./App");
const prisma = require("./prismaClient");

const PORT = process.env.PORT || 5000;

async function seedRooms() {
  const existingRooms = await prisma.room.findMany();

  if (existingRooms.length === 0) {
    await prisma.room.create({
      data: { roomNumber: 1 }
    });

    await prisma.room.create({
      data: { roomNumber: 2 }
    });

    await prisma.room.create({
      data: { roomNumber: 3 }
    });

    console.log("Standardräume angelegt");
  } else {
    console.log("Räume existieren bereits");
  }
}

app.listen(PORT, async () => {
  console.log(`Server läuft auf Port ${PORT}`);
  await seedRooms();
});