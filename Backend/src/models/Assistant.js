class Assistant{
    
    registerPatient(name){
        const Patient = require("./Patient");
        const patient = new Patient(name,new Date());
        return patient;
    }

    assignNextPatientToRoom(waitingList, room) {
        if(!room.isAvailable()){
            return;
        }
        const patient = waitingList.popNextPatient();

        if (patient){
            room.currentPatient = patient;
            patient.setStatus("im Raum");
        }
    }

    finishTreatment(room) {
        if (room.currentPatient) {
                room.currentPatient.setStatus("Fertig");
                room.currentPatient = null;
            }
    }

}

module.exports = Assistant;