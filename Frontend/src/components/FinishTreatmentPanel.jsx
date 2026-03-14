import React from "react";
import "./FinishTreatmentPanel.css";

function FinishTreatmentPanel({ rooms = [], onFinishTreatment }) {
  const occupiedRooms = rooms.filter((room) => room.currentPatient);

  return (
    <div className="finish-panel">
      <div className="section-header">
        <h2>Behandlung beenden</h2>
        <span>{occupiedRooms.length} aktiv</span>
      </div>

      {occupiedRooms.length === 0 ? (
        <p className="empty-state">Aktuell ist kein Raum belegt.</p>
      ) : (
        <div className="finish-list">
          {occupiedRooms.map((room) => (
            <div className="finish-card-item" key={room.id}>
              <div>
                <strong>Raum {room.roomNumber}</strong>
                <p>{room.currentPatient.name}</p>
              </div>

              <button onClick={() => onFinishTreatment(room.id)}>
                Beenden
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FinishTreatmentPanel;