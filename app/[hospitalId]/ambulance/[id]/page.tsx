'use client'

import {AreaChart, Card, Metric, Text, Title} from "@tremor/react";
import MenuBar from "@/app/menubar";
import {CosmosClient} from "@azure/cosmos";
import {useEffect, useState} from "react";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

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

    useEffect(() => {
        const interval = setInterval( async () => {
            const item = await getItem(client, ambulance)
            setShowLoading(false)
            setItem(item)
        }, 5000);
        return () => clearInterval(interval);
    }, [client, setItem])

    console.log(params)

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
                        <Title>ECG Graph</Title>
                        <AreaChart
                            data={performance}
                            index="seconds"
                            categories={["voltage"]}
                            colors={["blue"]}
                            showLegend={false}
                            valueFormatter={numberFormatter}
                            yAxisWidth={56}
                            className="h-96 mt-8"
                        />
                    </Card>
                </div>
            </div> }
        </main>
    )
}