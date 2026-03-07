class Room {
    constructor(roomNumber, currentPatient){
        this.roomNumber = roomNumber;
        this.currentPatient = null;
    }

    isAvailable(){
        return this.currentPatient === null
    }
}

module.exports = Room