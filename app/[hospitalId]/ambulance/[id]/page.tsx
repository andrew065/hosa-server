'use client'

import {AreaChart, Card, Metric, Tab, TabList, Text, Title} from "@tremor/react";
import MenuBar from "@/app/menubar";
import { CosmosClient } from "@azure/cosmos";
import { useEffect, useState } from "react";
import { Client } from "azure-iot-device";
import { Mqtt as Protocol } from "azure-iot-device-mqtt";
import { EventHubConsumerClient } from "@azure/event-hubs";
import {Message} from "azure-iot-common";
import {MapIcon, UserIcon} from "@heroicons/react/24/solid";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'
const deviceConnectionString = "HostName=hosa-iot-hub.azure-devices.net;DeviceId=web-client;SharedAccessKey=wuq7EU5/Kq7GPn52qLFSVlSAQPFDZf3XXcnOZ+n5hTU="


const performance = [
    {
        seconds: "1",
        voltage: '600'
    },
    {
        seconds: "2",
        voltage: '600'
    },
    {
        seconds: "3",
        voltage: '600'
    },
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

function initClient() {
    const endpoint = ""
}

async function getItem(client: CosmosClient, itemId: string) {
    const container = client.database(databaseId).container(containerId)
    const item = await container.item(itemId, itemId).read()
    return item['resource']
}

export default function HospitalPage({ params }: any) {
    let ambulance = params.id

    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const [item, setItem] = useState<any>()
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

        }, 5000);
        return () => clearInterval(interval);
    }, [client, setItem])

    // initHub()

    return (
        <main>
            <div>
                <MenuBar header={ambulance}/>
            </div>
            {showLoading ? <Title className="text-center pt-3">Loading Ambulance Data...</Title>:
            <div>
                <div className="p-4 md:p-10 mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 pb-3">
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
                    <Card>
                        <>
                            <TabList
                                defaultValue="1"
                                onValueChange={(value) => setShowCard(value === "1")}
                                className="mt-6"
                            >
                                <Tab value="1" text="Patient Data" icon={UserIcon} />
                                <Tab value="2" text="Google Maps" icon={MapIcon} />
                            </TabList>
                        </>
                        {showCard ? (
                            <div>
                                <Title>ECG Graph</Title>
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
                            <div>

                            </div>
                        )}
                    </Card>


                    <Card>


                    </Card>
                </div>
            </div> }
        </main>
    )
}