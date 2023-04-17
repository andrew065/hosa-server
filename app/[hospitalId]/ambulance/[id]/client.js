const Client = require('azure-iot-device').Client
const Protocol = require('azure-iot-device-mqtt').Mqtt

const deviceConnectionString = "HostName=hosa-iot-hub.azure-devices.net;DeviceId=web-client;SharedAccessKey=wuq7EU5/Kq7GPn52qLFSVlSAQPFDZf3XXcnOZ+n5hTU="

const initClient = function (onMessage) {
    const client = Client.fromConnectionString(deviceConnectionString, Protocol);
    client.on('connect', function () {
        console.log('Client connected.')
    })

    client.on('message', function (msg) {
        onMessage(msg)
    });

    client.open().catch((e) => console.error(e));
}


module.exports = initClient