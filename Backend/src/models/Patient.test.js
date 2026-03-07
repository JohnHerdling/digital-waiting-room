const Patient = require("./Patient");

describe("Patient Klasse", () => {

  test("Patient wird korrekt erstellt", () => {

    const arrivalTime = new Date();
    const patient = new Patient("Max Mustermann", arrivalTime);

    expect(patient.name).toBe("Max Mustermann");
    expect(patient.arrivalTime).toBe(arrivalTime);
    expect(patient.status).toBe("Warten");

  });


  test("arrivalTime ist ein Date Objekt", () => {

    const patient = new Patient("Anna Schmidt", new Date());

    expect(patient.arrivalTime).toBeInstanceOf(Date);

  });


  test("Status kann mit setStatus geändert werden", () => {

    const patient = new Patient("Paul Becker", new Date());

    patient.setStatus("In Behandlung");

    expect(patient.status).toBe("In Behandlung");

  });

});