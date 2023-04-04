'use client'

import { Button, Card, TextInput, Title } from "@tremor/react";
import { CosmosClient } from "@azure/cosmos";
import { useState } from "react";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

export default function InfoForm(ambulanceId: any) {
    const id = String(ambulanceId.ambulanceId)

    const [status, setStatus] = useState('')
    const [unit, setUnit] = useState('')
    const [statusPlaceholder, setStatusPlaceholder] = useState('Status')
    const [unitPlaceholder, setUnitPlaceholder] = useState('Anticipated Unit')

    const createItem = async() => {
        const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
        const items = client.database(databaseId).container(containerId).items
        return await items.create<object>({id: id, status: status, unit: unit})
            .catch(r => console.error(r))
    }

    return(
        <div>
            <Card className="space-y-2 p-10">
                <Title className="pb-2">Patient Data</Title>
                <TextInput // TODO: add error/invalid input
                    placeholder={statusPlaceholder}
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                />
                <TextInput // TODO: add error/invalid input
                    placeholder={unitPlaceholder}
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                />
                <div className="pt-3">
                    <Button size="sm" onClick={() => {
                        createItem().then(r => console.log(r))
                    }}>
                        Set Variables
                    </Button>
                </div>
            </Card>
        </div>
    )
}