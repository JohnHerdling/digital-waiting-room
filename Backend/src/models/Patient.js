class Patient {
    constructor(name, arrivalTime) {
        this.name=name;
        this.arrivalTime=arrivalTime;
        this.status= "Warten"; 
    }

    setStatus(status) {
        this.status=status;
    }
}

module.exports = Patient;