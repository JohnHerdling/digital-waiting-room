import React, { useState } from "react";
import "./PatientForm.css";

function PatientForm({ onCreatePatient, errorMessage }) {
  const [name, setName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    await onCreatePatient(name);
    setName("");
  }

  return (
  <div className="patient-form-wrapper">
    <h2>Patient registrieren</h2>

    <form className="patient-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Patientenname"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Patient registrieren</button>
    </form>

    {errorMessage && <p>{errorMessage}</p>}
  </div>
);
}

export default PatientForm;