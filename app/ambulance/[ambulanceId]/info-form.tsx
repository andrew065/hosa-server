'use client'

import { Button, Card, TextInput, Title } from "@tremor/react";
import { CosmosClient } from "@azure/cosmos";
import { useEffect, useState } from "react";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

interface ambulanceItem {
    id: string
    status: string
    patientId: string
    unit: string
    lat: number
    long: number
}

const all_status = ['en route', 'with patient', 'returning']
const all_units = ['neuro', 'cardiac', 'emerg', 'trauma', 'burn', 'MUCC', 'surgery']

async function addItem(client: CosmosClient, item: ambulanceItem) {
    const container = await client.database(databaseId).container(containerId)
    const add = await container.items.create<ambulanceItem>(item)
    console.log('item added', add)
}

async function updateItem(client: CosmosClient, item: ambulanceItem) {
    const container = await client.database(databaseId).container(containerId)
    const update = await container.item(item.id, item.id).replace<ambulanceItem>(item) //todo: maybe change replace to patch
    console.log('item updated', update)
}

export default function InfoForm(ambulanceId: any) {
    const id = String(ambulanceId.ambulanceId)
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});

    const [status, setStatus] = useState(all_status[0])
    const [unit, setUnit] = useState('')
    const [patientId, setPatientId] = useState('')
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [statusPlaceholder, setStatusPlaceholder] = useState('Status') //todo: status placeholder form settings
    const [unitPlaceholder, setUnitPlaceholder] = useState('Anticipated Unit')

    const item: ambulanceItem = {
        id: id,
        status: status,
        patientId: patientId,
        unit: unit,
        lat: lat,
        long: long
    }

    useEffect(() => {
        addItem(client, item).catch(r => console.error(r))
    }, [])

    return(
        <div>
            <Card className="space-y-2 p-10">
                <Title className="pb-2">Patient Data</Title>




                {/*<TextInput // TODO: add error/invalid input*/}
                {/*    placeholder={statusPlaceholder}*/}
                {/*    value={status}*/}
                {/*    onChange={e => setStatus(e.target.value)}*/}
                {/*/>*/}
                {/*<TextInput // TODO: add error/invalid input*/}
                {/*    placeholder={unitPlaceholder}*/}
                {/*    value={unit}*/}
                {/*    onChange={e => setUnit(e.target.value)}*/}
                {/*/>*/}
                {/*<div className="pt-3">*/}
                {/*    <Button size="sm" onClick={() => console.log('button clicked')}>*/}
                {/*        Set Variables*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </Card>
        </div>
    )
}