'use client'

import {AreaChart, Card, Metric, Tab, TabList, Text, Title} from "@tremor/react";
import MenuBar from "@/app/menubar";
import { CosmosClient } from "@azure/cosmos";
import {useEffect, useMemo, useRef, useState} from "react";
import { Client } from "azure-iot-device";
import { Mqtt as Protocol } from "azure-iot-device-mqtt";
import { Chart } from "chart.js/auto"
import {MapIcon, UserIcon} from "@heroicons/react/24/solid";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import Script from "next/script";

const endpoint = 'https://hosacosmosdb.documents.azure.com:443/' //URI
const primaryKey = 'GuPc608dwFFwQaL44TSnHtiWEQWdovRjgYcEplMuCqM1pil0ZYGokw9ZyOe6uGyY7bY99d6tfc96ACDb8vTXRw=='
const databaseId = 'testdb'
const containerId = 'AmbulanceData'
const deviceConnectionString = "HostName=hosa-iot-hub.azure-devices.net;DeviceId=web-client;SharedAccessKey=wuq7EU5/Kq7GPn52qLFSVlSAQPFDZf3XXcnOZ+n5hTU="
const mapsAPIKey = "AIzaSyDSfYcESw60ZYNkHFOx5X9jrCmL4oWiDFw"

interface ambulanceItem {
    id: string
    hospital: string
    status: string
    patientId: string
    patientAge: string
    unit: string
    lat: number
    long: number
    connected: boolean
}

const performance = [
    {}
];

const numberFormatter = (value: number) =>
    `${Intl.NumberFormat("us").format(value).toString()}`;

function printResultFor(op: any) {
    return function printResult(err: any, res: any) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

function initHub() {
    const iotClient = Client.fromConnectionString(deviceConnectionString, Protocol)
    const connectCallback = function (err: any) {
        if (err) {
            console.error('Could not connect: ' + err.message);
        } else {
            console.log('Client connected');
            iotClient.on('message', function (msg: any) {
                console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
                iotClient.complete(msg, printResultFor('completed'));
            });
        }
    }

    iotClient.open(connectCallback)
}

// function initClient() {
//     const connectionString = "Endpoint=sb://ihsuproddmres005dednamespace.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=62cyzu9CC+sjoXQiDtnOqs7izFXj8h0aZC7WaaD2r9Y=;EntityPath=iothub-ehub-hosa-iot-h-24798124-b51daa76f5"
//     const iotHub = new EventHubConsumerClient("$Default", connectionString)
//     iotHub.subscribe({
//         processEvents: (messages) => {
//             for (const message of messages) {
//                 console.log("Telementry received: ")
//                 console.log(JSON.stringify(message.body))
//                 console.log("Properties (set by device): ")
//                 console.log(JSON.stringify(message.properties))
//             }
//         },
//         processError: (err) => {console.log(err.message)}
//     })
// }


async function getItem(client: CosmosClient, itemId: string) {
    const container = client.database(databaseId).container(containerId)
    const item = await container.item(itemId, itemId).read()
    return item['resource']
}

export default function HospitalPage({ params }: any) {
    let ambulance = params.id

    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const [item, setItem] = useState<ambulanceItem>({
        id: ambulance,
        hospital: '',
        status: '',
        patientId: '',
        patientAge: '',
        unit: '',
        lat: 0,
        long: 0,
        connected: true
    })
    const [showLoading, setShowLoading] = useState(true)
    const [array, setArray] = useState(performance)

    const [showCard, setShowCard] = useState(true)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const interval = setInterval( async () => {
            const item = await getItem(client, ambulance)
            setShowLoading(false)
            setItem(item)
            // performance.push({seconds: counter.toString(), voltage: '600'})
            // setCounter(counter + 1)
            // setArray(performance)

        }, 1000);
        return () => clearInterval(interval);
    }, [client, setItem])

    const position = useMemo(()  => ({lat: item.lat, lng: item.long}), [item])
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: mapsAPIKey
    });

    const mapRef = useRef()

    // initHub()
    // initClient()

    return (
        <main>
            <div>
                <MenuBar header={ambulance}/>
            </div>
            {showLoading ? <Title className="text-center pt-3">Loading Ambulance Data...</Title>:
                <div className="p-4 md:p-10 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3 pb-3">
                        <Card>
                            <Text>Patient Id:</Text>
                            <Metric>{item.patientId}</Metric>
                        </Card>
                        <Card>
                            <Text>Patient Age:</Text>
                            <Metric>{item.patientAge}</Metric>
                        </Card>
                        <Card>
                            <Text>Status:</Text>
                            <Metric>{item.status}</Metric>
                        </Card>
                        <Card>
                            <Text>Anticipated Unit:</Text>
                            <Metric>{item.unit}</Metric>
                        </Card>
                    </div>
                    <Card className="md:space-y-2 md:pt-2 pl-3 px-3 md:px-10 md:pl-10">
                        <>
                            <TabList
                                defaultValue="1"
                                onValueChange={(value) => setShowCard(value === "1")}
                                className="mt-6"
                            >
                                <Tab value="1" text="Patient ECG Graph" icon={UserIcon} />
                                <Tab value="2" text="Ambulance Map" icon={MapIcon} />
                            </TabList>
                        </>
                        {showCard ? (
                            <div>
                                <Title className="pt-3">ECG Graph</Title>
                                <AreaChart
                                    data={array}
                                    index="seconds"
                                    categories={["voltage"]}
                                    colors={["blue"]}
                                    showLegend={false}
                                    valueFormatter={numberFormatter}
                                    yAxisWidth={56}
                                    className="h-96 mt-8"
                                />
                            </div> ): (
                            <div className="pt-3">
                                {/*<GoogleMap*/}
                                {/*    zoom={15}*/}
                                {/*    center={position}*/}
                                {/*    mapContainerClassName={"map-container"}*/}
                                {/*>*/}
                                {/*    <Marker position={position}></Marker>*/}
                                {/*</GoogleMap>*/}
                                <Script
                                    id="map"
                                    src="https://maps.googleapis.com/maps/api/js?"
                                    // onReady={() => {
                                    //     new google.maps.Map(mapRef.current, {
                                    //         center: {lat: -34.397, lng: 150.644},
                                    //         zoom: 15,
                                    //         // mapId: '734417b49ef297d3'
                                    //     })
                                    // }}
                                />
                            </div>
                        )}
                    </Card>
                </div>}
        </main>
    )
}