import React from "react";
import "./WaitingList.css";

function WaitingList({ patients }) {
  return (
    <div className="waiting-list">
      <div className="section-header">
        <h2>Warteliste</h2>
        <span>{patients.length} wartend</span>
      </div>

      {patients.length === 0 ? (
        <p className="empty-state">Keine wartenden Patienten vorhanden.</p>
      ) : (
        <table className="waiting-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Ankunft</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>
                  <span className="status-badge waiting">{patient.status}</span>
                </td>
                <td>{new Date(patient.createdAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WaitingList;