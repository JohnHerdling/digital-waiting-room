const WaitingList = require("./WaitingList");
const Patient = require("./Patient");

describe("WaitingList Klasse", () => {

  test("Neue Warteliste ist leer", () => {

    const waitingList = new WaitingList();

    expect(waitingList.waitingPatients.length).toBe(0);

  });


  test("Patient wird zur Warteliste hinzugefügt", () => {

    const waitingList = new WaitingList();
    const patient = new Patient("Max Mustermann", new Date());

    waitingList.addPatient(patient);

    expect(waitingList.waitingPatients.length).toBe(1);
    expect(waitingList.waitingPatients[0]).toBe(patient);

  });


  test("popNextPatient holt den ersten Patienten aus der Warteliste (FIFO)", () => {

    const waitingList = new WaitingList();

    const patient1 = new Patient("Max Mustermann", new Date());
    const patient2 = new Patient("Anna Schmidt", new Date());

    waitingList.addPatient(patient1);
    waitingList.addPatient(patient2);

    const nextPatient = waitingList.popNextPatient();

    expect(nextPatient).toBe(patient1);
    expect(waitingList.waitingPatients.length).toBe(1);
    expect(waitingList.waitingPatients[0]).toBe(patient2);

  });


  test("popNextPatient gibt undefined zurück wenn Warteliste leer ist", () => {

    const waitingList = new WaitingList();

    const nextPatient = waitingList.popNextPatient();

    expect(nextPatient).toBeUndefined();

  });

});