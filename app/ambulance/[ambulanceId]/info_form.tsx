'use client'

import { Button, Card, TextInput, Title } from "@tremor/react";
import { CosmosClient } from "@azure/cosmos";
import { useState } from "react";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

export default function InfoForm() {
    const [status, setStatus] = useState('Patient Status')
    const [unit, setUnit] = useState('Anticipated Unit')

    const createItem = async() => {
        const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
        const { database} = await client.databases.createIfNotExists({id: databaseId})
        const { container } = await database.containers.createIfNotExists({id: containerId})
        await container.items.create({id: 'ambulance5', status: status, unit: unit})
        console.log(container)

    }

    return(
        <div>
            <Card className="space-y-2 p-10">
                <Title className="pb-2">Patient Data</Title>
                <TextInput // TODO: add error/invalid input
                    placeholder={status}
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                />
                <TextInput // TODO: add error/invalid input
                    placeholder={unit}
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                />
                <div className="pt-3">
                    <Button size="sm" onClick={() => {
                        console.log(status, unit)
                        createItem().then(r => console.log(r))
                    }}>
                        Set Variables
                    </Button>
                </div>
            </Card>
        </div>
    )
}