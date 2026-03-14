import React, { useEffect, useState } from "react";
import "./App.css";

import PatientForm from "./components/PatientForm";
import WaitingList from "./components/WaitingList";
import RoomOverview from "./components/RoomOverview";
import FinishTreatmentPanel from "./components/FinishTreatmentPanel";

import {
  getWaitingList,
  getRooms,
  createPatient,
  assignNextPatient,
  finishTreatment,
} from "./services/api";

function App() {
  const [waitingList, setWaitingList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

async function loadData() {
  try {
    const waitingPatients = await getWaitingList();
    const roomData = await getRooms();

    setWaitingList(Array.isArray(waitingPatients) ? waitingPatients : []);
    setRooms(Array.isArray(roomData) ? roomData : []);

    setErrorMessage("");
  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
    setWaitingList([]);
    setRooms([]);
    setErrorMessage("Die Daten konnten nicht geladen werden.");
  }
}

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreatePatient(name) {
    try {
      await createPatient(name);
      await loadData();
    } catch (error) {
      console.error("Fehler beim Erstellen des Patienten:", error);
      setErrorMessage("Patient konnte nicht erstellt werden.");
    }
  }

  async function handleAssignNextPatient() {
    try {
      const result = await assignNextPatient();

      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      await loadData();
    } catch (error) {
      console.error("Fehler beim Zuweisen des Patienten:", error);
      setErrorMessage("Patient konnte nicht zugewiesen werden.");
    }
  }

  async function handleFinishTreatment(roomId) {
    try {
      const result = await finishTreatment(roomId);

      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      await loadData();
    } catch (error) {
      console.error("Fehler beim Beenden der Behandlung:", error);
      setErrorMessage("Behandlung konnte nicht beendet werden.");
    }
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <h1>Patientenverwaltung</h1>
          <p className="subtitle">Digitales Wartezimmer für die Arztpraxis</p>
        </header>

        <section className="top-panel">
          <PatientForm onCreatePatient={handleCreatePatient} />
        </section>

        <div className="action-bar">
          <button className="primary-action-button" onClick={handleAssignNextPatient}>
            Nächsten Patienten zuweisen
          </button>
        </div>

        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        <main className="dashboard-grid">
          <section className="dashboard-card">
            <WaitingList patients={waitingList} />
          </section>

          <section className="dashboard-card">
            <RoomOverview rooms={rooms} />
          </section>

          <section className="dashboard-card finish-card">
            <FinishTreatmentPanel rooms={rooms} onFinishTreatment={handleFinishTreatment} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;