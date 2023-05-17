const hospital = {
    MackenzieHealth: "12345",
    TorontoGeneral: "12345",
    ScarboroughGeneral: "12345"
}

const ambulance = {
    Ambulance1: "12345",
    Ambulance2: "12345",
    Ambulance3: "12345"
}

const verify = function (user, pass) {
    if (user in hospital) {
        if (hospital[user] === pass) {
            return 'hospital'
        }
        return 'hospital-pass'
    }
    else if (user in ambulance) {
        if (ambulance[user] === pass) {
            return 'ambulance'
        }
        return 'ambulance-pass'
    }
    return 'false'
}

module.exports = verify