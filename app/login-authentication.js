const hospital = {
    Hospital1: "12345",
    Hospital2: "13245",
    Hospital3: "53421"
}

const ambulance = {
    Ambulance1: "abcdef",
    Ambulance2: "qwerty",
    Ambulance3: "asdfg"
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