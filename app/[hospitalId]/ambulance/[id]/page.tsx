'use client'

import {Card, AreaChart, Title, Text} from "@tremor/react";
import MenuBar from "@/app/menubar";
import {CosmosClient} from "@azure/cosmos";
import {useState} from "react";
import {useRouter} from "next/router";

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

export default function HospitalPage({ params }: any) {
    let ambulance = params.id

    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const [items, setItems] = useState<any[]>([])
    const [showLoading, setShowLoading] = useState(true)

    console.log(params)

    return (

        <main >
            <div>
                <MenuBar header={ambulance}/>
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-3 gap-x-1 gap-y-1">
                    <Card>
                        <Text>placeholder</Text>
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
        </main>
    )
}