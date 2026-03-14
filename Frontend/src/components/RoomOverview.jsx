import React from "react";
import "./RoomOverview.css";

function RoomOverview({ rooms = [] }) {
  return (
    <div className="room-overview">
      <div className="section-header">
        <h2>Untersuchungsräume</h2>
        <span>{rooms.length} Räume</span>
      </div>

      <div className="room-grid">
        {rooms.map((room) => (
          <div className="room-card" key={room.id}>
            <h3>Raum {room.roomNumber}</h3>

            {room.currentPatient ? (
              <>
                <p className="room-status occupied">Belegt</p>
                <div className="room-patient-box">
                  <strong>{room.currentPatient.name}</strong>
                  <span>{room.currentPatient.status}</span>
                </div>
              </>
            ) : (
              <>
                <p className="room-status free">Frei</p>
                <div className="room-empty-box">Kein Patient im Raum</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomOverview;