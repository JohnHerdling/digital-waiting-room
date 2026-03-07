const Assistant = require("./Assistant");
const WaitingList = require("./WaitingList");
const Room = require("./Room");

describe("Assistant Klasse", () => {

  test("registerPatient erstellt einen neuen Patienten", () => {

    const assistant = new Assistant();
    const patient = assistant.registerPatient("Max Mustermann");

    expect(patient.name).toBe("Max Mustermann");
    expect(patient.arrivalTime).toBeInstanceOf(Date);
    expect(patient.status).toBe("Warten");

  });


  test("assignNextPatientToRoom weist den nächsten Patienten einem freien Raum zu", () => {

    const assistant = new Assistant();
    const waitingList = new WaitingList();
    const room = new Room(1);

    const patient = assistant.registerPatient("Anna Schmidt");
    waitingList.addPatient(patient);

    assistant.assignNextPatientToRoom(waitingList, room);

    expect(room.currentPatient).toBe(patient);
    expect(patient.status).toBe("im Raum");
    expect(waitingList.waitingPatients.length).toBe(0);

  });


  test("assignNextPatientToRoom macht nichts, wenn der Raum nicht verfügbar ist", () => {

    const assistant = new Assistant();
    const waitingList = new WaitingList();
    const room = new Room(1);

    const patient1 = assistant.registerPatient("Max Mustermann");
    const patient2 = assistant.registerPatient("Anna Schmidt");

    room.currentPatient = patient1;
    waitingList.addPatient(patient2);

    assistant.assignNextPatientToRoom(waitingList, room);

    expect(room.currentPatient).toBe(patient1);
    expect(waitingList.waitingPatients.length).toBe(1);
    expect(waitingList.waitingPatients[0]).toBe(patient2);

  });


  test("finishTreatment beendet die Behandlung und leert den Raum", () => {

    const assistant = new Assistant();
    const room = new Room(2);

    const patient = assistant.registerPatient("Paul Becker");
    room.currentPatient = patient;

    assistant.finishTreatment(room);

    expect(patient.status).toBe("Fertig");
    expect(room.currentPatient).toBe(null);

  });

});