const Assistent = require("./Assistant");
const WaitingList = require("./WaitingList");
const Room = require("./Room");

describe("Assistent Klasse", () => {

  test("registerPatient erstellt einen neuen Patienten", () => {

    const assistent = new Assistent();
    const patient = assistent.registerPatient("Max Mustermann");

    expect(patient.name).toBe("Max Mustermann");
    expect(patient.arrivalTime).toBeInstanceOf(Date);
    expect(patient.status).toBe("Warten");

  });


  test("assignNextPatientToRoom weist den nächsten Patienten einem freien Raum zu", () => {

    const assistent = new Assistent();
    const waitingList = new WaitingList();
    const room = new Room(1);

    const patient = assistent.registerPatient("Anna Schmidt");
    waitingList.addPatient(patient);

    assistent.assignNextPatientToRoom(waitingList, room);

    expect(room.currentPatient).toBe(patient);
    expect(patient.status).toBe("im Raum");
    expect(waitingList.waitingPatients.length).toBe(0);

  });


  test("assignNextPatientToRoom macht nichts, wenn der Raum nicht verfügbar ist", () => {

    const assistent = new Assistent();
    const waitingList = new WaitingList();
    const room = new Room(1);

    const patient1 = assistent.registerPatient("Max Mustermann");
    const patient2 = assistent.registerPatient("Anna Schmidt");

    room.currentPatient = patient1;
    waitingList.addPatient(patient2);

    assistent.assignNextPatientToRoom(waitingList, room);

    expect(room.currentPatient).toBe(patient1);
    expect(waitingList.waitingPatients.length).toBe(1);
    expect(waitingList.waitingPatients[0]).toBe(patient2);

  });


  test("finishTreatment beendet die Behandlung und leert den Raum", () => {

    const assistent = new Assistent();
    const room = new Room(2);

    const patient = assistent.registerPatient("Paul Becker");
    room.currentPatient = patient;

    assistent.finishTreatment(room);

    expect(patient.status).toBe("Fertig");
    expect(room.currentPatient).toBe(null);

  });

});