const API_URL = "http://localhost:5000";

export async function getPatients() {
  const response = await fetch(`${API_URL}/patients`);
  return response.json();
}

export async function createPatient(name) {
  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return response.json();
}

export async function getWaitingList() {
  const response = await fetch(`${API_URL}/waitinglist`);
  return response.json();
}

export async function getRooms() {
  const response = await fetch(`${API_URL}/rooms`);
  return response.json();
}

export async function assignNextPatient() {
  const response = await fetch(`${API_URL}/rooms/assign-next`, {
    method: "POST",
  });

  return response.json();
}

export async function finishTreatment(roomId) {
  const response = await fetch(`${API_URL}/rooms/${roomId}/finish`, {
    method: "POST",
  });

  return response.json();
}