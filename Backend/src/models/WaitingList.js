class WaitingList{

    constructor(){
        this.waitingPatients = [];
    }

    addPatient(patient) {
        this.waitingPatients.push(patient);
    }

    popNextPatient(){
        return this.waitingPatients.shift();
    }
}

module.exports = WaitingList;