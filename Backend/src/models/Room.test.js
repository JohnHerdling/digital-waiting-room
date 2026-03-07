const Room = require("./Room");
const Patient = require("./Patient");

describe("Room Klasse", () => {

  test("Raum wird korrekt erstellt", () => {

    const room = new Room(1);

    expect(room.roomNumber).toBe(1);
    expect(room.currentPatient).toBe(null);

  });


  test("Neuer Raum ist verfügbar", () => {

    const room = new Room(2);

    expect(room.isAvailable()).toBe(true);

  });


  test("Raum ist nicht verfügbar wenn ein Patient im Raum ist", () => {

    const room = new Room(3);

    const patient = new Patient("Max Mustermann", new Date());

    room.currentPatient = patient;

    expect(room.isAvailable()).toBe(false);

  });

});